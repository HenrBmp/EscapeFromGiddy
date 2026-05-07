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

describe('Security Tests - SQL Injection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET /rank/:nomeJogador - SQL Injection attempts', () => {
        it('should safely handle SQL injection in player name - UNION attack', async () => {
            const sqlInjection = "' UNION SELECT null, null -- ";
            const mockData = [{ maior_pontuacao: 0 }];
            mockQuery
                .mockResolvedValueOnce([]) // INSERT IGNORE
                .mockResolvedValueOnce([mockData]); // SELECT with proper structure

            const response = await request(app).get(`/rank/${encodeURIComponent(sqlInjection)}`);

            expect(response.status).toBe(200);
            // Query should have been called with parameterized query
            expect(mockQuery).toHaveBeenCalled();
            // The injected SQL should be treated as a string parameter, not executed
            const callArgs = mockQuery.mock.calls[1];
            expect(callArgs[1]).toContain(sqlInjection);
        });

        it('should safely handle SQL injection in player name - DROP TABLE attack', async () => {
            const sqlInjection = "'; DROP TABLE jogador; -- ";
            const mockData = [{ maior_pontuacao: 0 }];
            mockQuery.mockResolvedValueOnce([]).mockResolvedValueOnce([mockData]);

            const response = await request(app).get(`/rank/${encodeURIComponent(sqlInjection)}`);

            expect(response.status).toBe(200);
            // The malicious SQL should be treated as a literal string
            const callArgs = mockQuery.mock.calls[1];
            expect(callArgs[1]).toContain(sqlInjection);
        });

        it('should safely handle SQL injection in player name - SELECT attack', async () => {
            const sqlInjection = "' OR '1'='1";
            const mockData = [{ maior_pontuacao: 0 }];
            mockQuery.mockResolvedValueOnce([]).mockResolvedValueOnce([mockData]);

            const response = await request(app).get(`/rank/${encodeURIComponent(sqlInjection)}`);

            expect(response.status).toBe(200);
            const callArgs = mockQuery.mock.calls[1];
            expect(callArgs[1]).toContain(sqlInjection);
        });
    });

    describe('PATCH /rank - SQL Injection attempts', () => {
        it('should safely handle SQL injection in nomeJogador field', async () => {
            const sqlInjection = "'; DROP TABLE jogador; -- ";
            mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

            const response = await request(app).patch('/rank').send({
                nomeJogador: sqlInjection,
                novoRecorde: 100,
            });

            expect(response.status).toBe(200);
            // Verify parameterized query was used (second parameter should be an array)
            const callArgs = mockQuery.mock.calls[0];
            expect(Array.isArray(callArgs[1])).toBe(true);
            expect(callArgs[1]).toContain(sqlInjection);
        });

        it('should safely handle SQL injection in novoRecorde field', async () => {
            // Attempting to inject SQL via the numeric field
            const response = await request(app).patch('/rank').send({
                nomeJogador: 'Player1',
                novoRecorde: '100; DROP TABLE jogador; -- ',
            });

            // Should fail validation since novoRecorde must be an integer
            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('RECORDE_NAO_INT');
        });

        it('should safely handle SQL injection through comments', async () => {
            const sqlInjection = "admin' -- ";
            mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

            const response = await request(app).patch('/rank').send({
                nomeJogador: sqlInjection,
                novoRecorde: 500,
            });

            expect(response.status).toBe(200);
            const callArgs = mockQuery.mock.calls[0];
            expect(callArgs[1]).toContain(sqlInjection);
        });
    });

    describe('GET /rank - SQL Injection attempts', () => {
        it('should handle potentially malicious input in request body', async () => {
            const sqlInjection = "' OR 1=1 -- ";
            mockQuery.mockResolvedValueOnce([{ nome: 'Player1', maior_pontuacao: 100 }]);

            const response = await request(app).get('/rank').send({
                nomeJogador: sqlInjection,
            });

            // Since GET /rank no longer uses the body validation, it should still work
            expect(response.status).toBe(200);
        });
    });

    describe('Parameter binding verification', () => {
        it('should use parameterized queries for SELECT operations', async () => {
            const mockData = [{ maior_pontuacao: 50 }];
            mockQuery.mockResolvedValueOnce([]).mockResolvedValueOnce([mockData]);

            await request(app).get('/rank/TestPlayer');

            // Verify parameterized query pattern
            const insertCall = mockQuery.mock.calls[0];
            expect(insertCall[0]).toContain('?');

            const selectCall = mockQuery.mock.calls[1];
            expect(selectCall[0]).toContain('?');
        });

        it('should use parameterized queries for UPDATE operations', async () => {
            mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);

            await request(app).patch('/rank').send({
                nomeJogador: 'TestPlayer',
                novoRecorde: 100,
            });

            const updateCall = mockQuery.mock.calls[0];
            expect(updateCall[0]).toContain('?');
            expect(Array.isArray(updateCall[1])).toBe(true);
        });
    });
});
