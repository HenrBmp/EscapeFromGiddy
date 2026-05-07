import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';

const mockQuery = vi.fn();

vi.mock('../database.js', () => ({
    default: {
        query: mockQuery,
    },
}));

let app;

beforeAll(async () => {
    const { default: router } = await import('../routes.js');
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
});

describe('API Endpoints', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET /', () => {
        it('should serve the index.html file', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/text\/html/);
        });
    });

    describe('GET /rank', () => {
        it('should return the ranking list', async () => {
            const mockData = [{ nome: 'Player1', maior_pontuacao: 100 }];
            mockQuery.mockResolvedValueOnce([mockData]);

            const response = await request(app).get('/rank');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('should return 500 if the database query fails', async () => {
            mockQuery.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/rank');

            expect(response.status).toBe(500);
            expect(response.body.message).toContain('erro na consulta');
        });
    });

    describe('GET /rank/:nomeJogador', () => {
        it('should return player record', async () => {
            const mockData = [{ maior_pontuacao: 50 }];
            mockQuery.mockResolvedValueOnce([]).mockResolvedValueOnce([mockData]);

            const response = await request(app).get('/rank/Player1');

            expect(response.status).toBe(200);
            expect(response.text).toBe('50');
            expect(response.headers['content-type']).toMatch(/plain\/text/);
        });

        it('should return 500 when the database throws', async () => {
            mockQuery.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/rank/Player1');

            expect(response.status).toBe(500);
            expect(response.body.message).toContain('erro na consulta');
        });
    });

    describe('PATCH /rank', () => {
        it('should update record successfully', async () => {
            const mockResult = { affectedRows: 1 };
            mockQuery.mockResolvedValueOnce([mockResult]);

            const response = await request(app)
                .patch('/rank')
                .send({ nomeJogador: 'Player1', novoRecorde: 200 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResult);
        });

        it('should return 400 for invalid record type', async () => {
            const response = await request(app)
                .patch('/rank')
                .send({ nomeJogador: 'Player1', novoRecorde: 'notanumber' });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('RECORDE_NAO_INT');
        });
    });

    describe('Static routes', () => {
        it('should serve static CSS files from /styles', async () => {
            const response = await request(app).get('/styles/home.css');
            expect(response.status).toBe(200);
        });
    });
});
