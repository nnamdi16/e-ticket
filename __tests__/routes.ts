import request from 'supertest';
import path from 'path';
import app from '../src/app';

describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, { message: { hello: 'Hello World' } });
  });

  
});
