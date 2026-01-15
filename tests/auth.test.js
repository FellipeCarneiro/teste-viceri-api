const request = require('supertest');
const app = require('../app');
const sequelize = require('../src/database');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Auth', () => {

    it('deve registrar um usuário', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Fellipe',
                email: 'fellipe@test.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe('fellipe@test.com');
    });

    it('deve fazer login e retornar token', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'fellipe@test.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

});
