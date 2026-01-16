const Task = require('../database/models/Task');

exports.create = async (req, res) => {
    try {
        const { description, priority } = req.body;

        if (!description || !priority) {
            return res.status(400).json({ error: 'Descrição e prioridade são obrigatórias' });
        }

        const task = await Task.create({
            description,
            priority,
            UserId: req.userId
        });

        return res.status(201).json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};

exports.complete = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Task.update(
            { completed: true },
            { where: { id, UserId: req.userId } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao concluir tarefa' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Task.destroy({
            where: {
                id,
                UserId: req.userId
            }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, priority } = req.body;

        if (!description || !priority) {
            return res.status(400).json({
                error: 'Descrição e prioridade são obrigatórias'
            });
        }

        const updated = await Task.update(
            { description, priority },
            {
                where: {
                    id,
                    UserId: req.userId
                }
            }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};

exports.list = async (req, res) => {
    try {
        const { status } = req.query;

        const where = {
            UserId: req.userId
        };

        if (status === 'pending') {
            where.completed = false;
        }

        if (status === 'completed') {
            where.completed = true;
        }

        const tasks = await Task.findAll({ where });

        return res.json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
};







