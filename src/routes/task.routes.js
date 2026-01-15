const express = require('express');
const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/tasks', authMiddleware, TaskController.create);
router.get('/tasks', authMiddleware, TaskController.listPending);
router.put('/tasks/:id/complete', authMiddleware, TaskController.complete);

module.exports = router;

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - priority
 *             properties:
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Alta, Média, Baixa]
 *     responses:
 *       201:
 *         description: Tarefa criada
 */
router.post('/tasks', authMiddleware, TaskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar tarefas pendentes
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/tasks', authMiddleware, TaskController.listPending);

/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Concluir tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa concluída
 */
router.put('/tasks/:id/complete', authMiddleware, TaskController.complete);
