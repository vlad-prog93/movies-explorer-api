const supertest = require('supertest');

const app = require('./app');

const request = supertest(app);

describe('Не авторизованные пользователи не имеют доступ к приложению', () => {
  it('Ожидаем - "нет доступа" по запросу к get "/users/me"', () => {
    return request.get('/users/me').then((response) => {
            expect(response.status).toBe(401)
            expect(response.text).toBe('{"message":"У вас нет доступа"}');
        });
  });

  it('Ожидаем - "нет доступа" по запросу к patch "/users/me"', () => {
    return request.patch('/users/me').then((response) => {
            expect(response.status).toBe(401);
            expect(response.text).toBe('{"message":"У вас нет доступа"}');
        });
  });

  it('Ожидаем - "нет доступа" по запросу к get "/movies"', () => {
    return request.get('/movies').then((response) => {
            expect(response.status).toBe(401);
            expect(response.text).toBe('{"message":"У вас нет доступа"}');
        });
  });

  it('Ожидаем - "нет доступа" по запросу к post запросу "/movies"', () => {
    return request.post('/movies').then((response) => {
            expect(response.status).toBe(401);
            expect(response.text).toBe('{"message":"У вас нет доступа"}');
        });
  });

  it('Ожидаем - "нет доступа" по запросу к delete запросу "/movies"', () => {
    return request.delete('/movies').then((response) => {
            expect(response.status).toBe(401);
            expect(response.text).toBe('{"message":"У вас нет доступа"}');
        });
  });
});