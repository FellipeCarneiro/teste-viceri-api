const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
    await request(app).post('/register').send({
        name: 'User',
        email: 'user@test.com',
        password: '123456'
    });

    const login = await request(app).post('/login').send({
        email: 'user@test.com',
        password: '123456'
    });

    token = login.body.token;
});

describe('Tasks', () => {

    it('deve criar uma tarefa', async () => {
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: 'Estudar testes',
                priority: 'Alta'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.description).toBe('Estudar testes');
    });

    it('deve listar tarefas pendentes', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('não deve criar tarefa sem token', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                description: 'Tarefa sem token',
                priority: 'Alta'
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Token não informado');
    });

    it('não deve criar tarefa sem descrição', async () => {
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority: 'Alta'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Descrição e prioridade são obrigatórias');
    });

    it('não deve acessar tarefas com token inválido', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', 'Bearer token_invalido');

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Token inválido ou expirado');
    });


});


