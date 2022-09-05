const User = require('../models/user');

const getUser = async (req, res) => {
    try {
        const id = "63163c61f2af1d6c87e82265";
        const user = await User.findById(id);
        if (user) {
            return res.json({ getUser: user });
        }
        return res.json({ getUser: 'Пользователя с таким ID не существует' });

    } catch(err) {
        res.json({ getUser: err })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = "63163c61f2af1d6c87e82265";
        const { email, name } = req.body;
        const user = await User.findByIdAndUpdate(id, { email, name }, { new: true });
        if (user) {
            return res.json({ getUser: user });
        }
        return res.json({ getUser: 'Пользователя с таким ID не существует' });

    } catch(err) {
        res.json({ updateUser: err })
    }
}

module.exports = { getUser, updateUser };
