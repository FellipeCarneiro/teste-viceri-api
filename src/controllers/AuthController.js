const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ error: 'E-mail já cadastrado' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no login' });
    }
};
