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
        it('entrega o index.html', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('text/html');
        });
    });

    describe('GET /rank', () => {
        it('retorna o ranking completo', async () => {
            const mockData = [{ nome: 'Player1', maior_pontuacao: 100 }];
            mockQuery.mockResolvedValueOnce([mockData]);

            const response = await request(app).get('/rank');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('retorna um erro com status 500 quando o banco de dados falhar', async () => {
            mockQuery.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/rank');

            expect(response.status).toBe(500);
            expect(response.body.message).toContain('erro na consulta');
        });
    });

    describe('GET /rank/:nomeJogador', () => {
        it('retorna o recorde de um jogador', async () => {
            const mockData = [{ maior_pontuacao: 50 }];
            mockQuery.mockResolvedValueOnce([]).mockResolvedValueOnce([mockData]);

            const response = await request(app).get('/rank/Player1');

            expect(response.status).toBe(200);
            expect(response.text).toBe('50');
            expect(response.headers['content-type']).toMatch(/plain\/text/);
        });

        it('retorna um erro com status 500 quando o banco de dados falhar', async () => {
            mockQuery.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/rank/Player1');

            expect(response.status).toBe(500);
            expect(response.body.message).toContain('erro na consulta');
        });
    });

    describe('PATCH /rank', () => {
        it('atualiza recordes com sucesso', async () => {
            const mockResult = { affectedRows: 1 };
            mockQuery.mockResolvedValueOnce([mockResult]);

            const response = await request(app)
                .patch('/rank')
                .send({ nomeJogador: 'Player1', novoRecorde: 200 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResult);
        });

        it('retorna RECORDE_NAO_INT para novoRecorde com tipo diferente de inteiro', async () => {
            const response = await request(app)
                .patch('/rank')
                .send({ nomeJogador: 'Player1', novoRecorde: 'notanumber' });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('RECORDE_NAO_INT');
        });

        it('retorna CORPO_INVALIDO para requisições com corpo ausente', async () => {
            const response = await request(app).patch('/rank');

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('CORPO_INVALIDO');
        });

        it('retorna NOME_INVALIDO para requisições com nomeJogador ausente', async () => {
            const response = await request(app).patch('/rank').send({
                novoRecorde: '100',
            });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('NOME_INVALIDO');
        });
    });

    describe('Rotas estáticas', () => {
        it('pode-se obter arquivos estaticos por meio de /styles', async () => {
            const response = await request(app).get('/styles/style.css');
            expect(response.status).toBe(200);
        });
    });
});
