const request = require('supertest');
const { app, server } = require('../../index');

afterAll(() => server.close());

describe('Unit Tests', () => {
  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });

  test('GET /api/info returns app info', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body.app).toBe('netwatch');
    expect(res.body.version).toBe('1.0.0');
  });

  test('GET / returns HTML page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('netwatch1');
  });
});
