const MONGO_URL_AND_PORT = process.env.MONGO_URL_AND_PORT || 'localhost:27017/bitfilmsdb';

const PAGE_NOT_FOUND = 'Страница не найдена';
const ERROR_DEFAULT = 'Ошибка по-умолчанию';
const SEND_NOT_VALID_DATA = 'Переданы некорректные данные';
const FILM_NOT_FOUND = 'Фильм по указанному id не найден';
const NOT_ALLOWED_DELETE_FILM = 'Нельзя удалать чужой фильм';
const USER_ALREADY_EXIST = 'Пользователь уже существует';
const WRONG_LOGIN_OR_PASSWORD = 'Неправильные логин или пароль';
const USER_NOT_FOUND = 'Фильм по указанному id не найден';
const WRONG_ID = 'Введен некорректный id';
const UNAUTHORIZED = 'У вас нет доступа';

module.exports = {
  PAGE_NOT_FOUND,
  MONGO_URL_AND_PORT,
  ERROR_DEFAULT,
  SEND_NOT_VALID_DATA,
  FILM_NOT_FOUND,
  NOT_ALLOWED_DELETE_FILM,
  USER_ALREADY_EXIST,
  WRONG_LOGIN_OR_PASSWORD,
  USER_NOT_FOUND,
  WRONG_ID,
  UNAUTHORIZED,
};
