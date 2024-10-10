const express = require('express');
const router = express.Router();
const {
    createEngajamentoMensagem,
    getEngajamentoMensagens,
    getEngajamentoMensagemById,
    updateEngajamentoMensagem,
    deleteEngajamentoMensagem,
} = require('../controllers/likeMensagensController');


/**
 * @swagger
 * /engajamento-mensagens:
 *   post:
 *     summary: Criar um novo engajamento para mensagem
 *     tags: [EngajamentoMensagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensagem_id:
 *                 type: integer
 *                 example: 1000
 *               ip:
 *                 type: string
 *                 example: "192.168.1.1"
 *               voto:
 *                 type: string
 *                 enum: [like, dislike]
 *                 example: "like"
 *     responses:
 *       201:
 *         description: Engajamento criado com sucesso
 *       500:
 *         description: Erro ao criar engajamento
 */


// Definindo as rotas
router.post('/', createEngajamentoMensagem);

/**
 * @swagger
 * /engajamento-mensagens:
 *   get:
 *     summary: Obter todas as engajamentos de mensagens
 *     tags: [EngajamentoMensagens]
 *     responses:
 *       200:
 *         description: Lista de engajamentos de mensagens
 *       500:
 *         description: Erro ao obter engajamentos
 */
router.get('/', getEngajamentoMensagens);

/**
 * @swagger
 * /engajamento-mensagens/{id}:
 *   get:
 *     summary: Obter um engajamento por ID
 *     tags: [EngajamentoMensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Engajamento encontrado
 *       404:
 *         description: Engajamento não encontrado
 *       500:
 *         description: Erro ao obter engajamento
 */
router.get('/:id', getEngajamentoMensagemById);

/**
 * @swagger
 * /engajamento-mensagens/{id}:
 *   put:
 *     summary: Atualizar um engajamento de mensagem
 *     tags: [EngajamentoMensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensagem_id:
 *                 type: integer
 *                 example: 1
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               engajamento:
 *                 type: string
 *                 example: "dislike"
 *     responses:
 *       200:
 *         description: Engajamento atualizado com sucesso
 *       404:
 *         description: Engajamento não encontrado
 *       500:
 *         description: Erro ao atualizar engajamento
 */
router.put('/:id', updateEngajamentoMensagem);

/**
 * @swagger
 * /engajamento-mensagens/{id}:
 *   delete:
 *     summary: Deletar um engajamento
 *     tags: [EngajamentoMensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Engajamento deletado com sucesso
 *       404:
 *         description: Engajamento não encontrado
 *       500:
 *         description: Erro ao deletar engajamento
 */
router.delete('/:id', deleteEngajamentoMensagem);

module.exports = router;