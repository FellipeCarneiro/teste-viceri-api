const express = require('express');
const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *         description: Filtrar por status da tarefa
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/tasks', authMiddleware, TaskController.list);

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
 * /tasks/{id}/complete:
 *   patch:
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
router.patch('/tasks/:id/complete', authMiddleware, TaskController.complete);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Editar tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       204:
 *         description: Tarefa atualizada
 */
router.put('/tasks/:id', authMiddleware, TaskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Excluir tarefa
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
 *         description: Tarefa excluída
 */
router.delete('/tasks/:id', authMiddleware, TaskController.delete);

module.exports = router;
