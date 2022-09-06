const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiErrors = require('../utils/apiErrors');
const User = require('../models/user');

const { SECRET_KEY, NODE_ENV } = process.env;
const DUBLICATE_MONGOOSE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json('Пользователь с таким email существует');
        }
        const hashPassword = bcrypt.hashSync(password, SOLT_ROUND);
        const user = new User({ email, password: hashPassword, name });
        await user.save();
        return res.json({ _id: user._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(ApiErrors.BadRequest('Переданы некорректные данные при создании пользователя.'));
        }
        if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
            return next(ApiErrors.Conflict('Пользователь уже существует'));
        }
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(ApiErrors.Unauthorized('Неправильные логин или пароль'));
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(ApiErrors.Unauthorized('Неправильные логин или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'TEST', { expiresIn: '7d' });
        return res.json({ token: token });

    } catch (err) {
        return next(ApiErrors.Internal('Ошибка по-умолчанию.'));
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if (!user) {
            return next(ApiErrors.NotFound('Пользователь по указанному id не найден.'));
        }
        return res.send(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return next(ApiErrors.BadRequest('Введен некорректный id'));
        }
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.user._id;
        const { email, name } = req.body;
        const user = await User.findByIdAndUpdate(id, { email, name }, { runValidators: true, new: true });
        return res.send(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return next(ApiErrors.BadRequest('Введен некорректный id'));
        }
        if (err.name === 'ValidationError') {
            return next(ApiErrors.BadRequest('Переданы некорректные данные при обновлении данных пользователя.'));
        }
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }
}

module.exports = { getUser, updateUser, createUser, login };
