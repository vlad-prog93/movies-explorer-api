module.exports = {

  // db
  MONGO_URL_AND_PORT: process.env.MONGO_URL_AND_PORT || '127.0.0.1:27017/moviesdb',

  // message error
  PAGE_NOT_FOUND: 'Страница не найдена',
  ERROR_DEFAULT: 'Ошибка по-умолчанию',
  SEND_NOT_VALID_DATA: 'Переданы некорректные данные',
  FILM_NOT_FOUND: 'Фильм по указанному id не найден',
  NOT_ALLOWED_DELETE_FILM: 'Нельзя удалать чужой фильм',
  USER_ALREADY_EXIST: 'Пользователь уже существует',
  WRONG_LOGIN_OR_PASSWORD: 'Неправильные логин или пароль',
  USER_NOT_FOUND: 'Фильм по указанному id не найден',
  WRONG_ID: 'Введен некорректный id',
  UNAUTHORIZED: 'Необходима авторизация',

  // type error
  CAST_ERROR: 'CastError',
  VALIDATION_ERROR: 'ValidationError',

  // utils
  DUBLICATE_MONGOOSE_ERROR_CODE: 11000,
  SOLT_ROUND: 10,
};
