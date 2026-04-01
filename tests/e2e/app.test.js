const request = require('supertest');
const { app, server } = require('../../app/index');

afterAll(() => server.close());

describe('E2E Tests', () => {
  test('App is reachable - GET / responds 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('Health endpoint is available and healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('API info endpoint returns correct data', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ app: 'netwatch', version: '1.0.0' });
  });
});
