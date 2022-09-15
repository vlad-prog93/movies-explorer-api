/* const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('ТЕСТ: путь GET /users/me', () => {
  describe('Нет доступа не авторизованным пользователям', () => {
    test('Должен вернуть 401 статус код', async () => {
      const response = await request.get('/users/me');
      expect(response.statusCode).toBe(401);
    });

    test('Должен вернуть json формат', async () => {
      const response = await request.get('/users/me');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('ТЕСТ: пусть PATCH /users/me', () => {
  describe('Нет доступа не авторизованным пользователям', () => {
    test('Должен вернуть 401 статус код', async () => {
      const response = await request.patch('/users/me');
      expect(response.statusCode).toBe(401);
    });

    test('Должен вернуть json формат', async () => {
      const response = await request.patch('/users/me');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('ТЕСТ: пусть GET /movies', () => {
  describe('Нет доступа не авторизованным пользователям', () => {
    test('Должен вернуть 401 статус код', async () => {
      const response = await request.get('/movies');
      expect(response.statusCode).toBe(401);
    });

    test('Должен вернуть json формат', async () => {
      const response = await request.get('/movies');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('ТЕСТ: пусть POST /movies', () => {
  describe('Нет доступа не авторизованным пользователям', () => {
    test('Должен вернуть 401 статус код', async () => {
      const response = await request.post('/movies');
      expect(response.statusCode).toBe(401);
    });

    test('Должен вернуть json формат', async () => {
      const response = await request.post('/movies');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('ТЕСТ: пусть DELETE /movies', () => {
  describe('Нет доступа не авторизованным пользователям', () => {
    test('Должен вернуть 401 статус код', async () => {
      const response = await request.delete('/movies');
      expect(response.statusCode).toBe(401);
    });

    test('Должен вернуть json формат', async () => {
      const response = await request.delete('/movies');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('ТЕСТ: пусть POST /signup', () => {
  const randomNumber = Math.floor(Math.random() * (100 - 1) + 1);

  describe('Попытка авторизоваться', () => {
    describe('Правильно заполненная форма', () => {
      test('Должен вернуть 200 статус код', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.statusCode).toBe(200);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });

    describe('Правильно заполненная форма, но с таким же email', () => {
      test('Должен вернуть 409 статус код', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.statusCode).toBe(409);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });

    describe('Не заполнен email у формы', () => {
      test('Должен вернуть 400 статус код', async () => {
        const response = await request.post('/signup').send({
          email: '',
          password: 'email',
          name: 'email',
        });
        expect(response.statusCode).toBe(400);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: '',
          password: 'email',
          name: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });

    describe('Не заполнен password у формы', () => {
      test('Должен вернуть 400 статус код', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: '',
          name: 'email',
        });
        expect(response.statusCode).toBe(400);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: '',
          name: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });

    describe('Не заполнен name у формы', () => {
      test('Должен вернуть 400 статус код', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: '',
        });
        expect(response.statusCode).toBe(400);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: '',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });
  });
});

describe('ТЕСТ: пусть POST /signin', () => {
  const randomNumber = Math.floor(Math.random() * (100 - 1) + 1);

  describe('Попытка авторизоваться', () => {
    describe('Правильно заполненная форма', () => {
      test('Должен вернуть 200 статус код', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.statusCode).toBe(200);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signup').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
          name: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });

    describe('Правильно заполненная форма', () => {
      test('Должен вернуть 200 статус код', async () => {
        const response = await request.post('/signin').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
        });
        expect(response.statusCode).toBe(200);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signin').send({
          email: `ema${randomNumber}il@bk.ru`,
          password: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        console.log(response.body);
      });
    });

    describe('Пользователя с таким email нет', () => {
      test('Должен вернуть 401 статус код', async () => {
        const response = await request.post('/signin').send({
          email: 'ema.ru',
          password: 'email',
        });
        expect(response.statusCode).toBe(401);
      });

      test('Должен вернуть json формат', async () => {
        const response = await request.post('/signin').send({
          email: 'ema.ru',
          password: 'email',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        console.log(response.body);
      });
    });
  });
});
*/
