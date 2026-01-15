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

exports.listPending = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                UserId: req.userId,
                completed: false
            }
        });

        return res.json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao listar tarefas' });
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
