const express = require('express');
const router = express.Router();
const {
    createEngajamento,
    getEngajamentos,
    getEngajamentoById,
    updateEngajamento,
    deleteEngajamento,
} = require('../controllers/engajamentoPropostasController');

/**
 * @swagger
 * /engajamento-propostas:
 *   post:
 *     summary: Criar um novo engajamento para proposta
 *     tags: [EngajamentoPropostas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proposta_id:
 *                 type: integer
 *                 example: 100
 *               ip:
 *                 type: string
 *                 example: "192.168.1.1"
 *               voto:
 *                 type: string
 *                 enum: [afavor, contra]
 *                 example: "afavor"
 *     responses:
 *       201:
 *         description: Engajamento criado com sucesso
 *       500:
 *         description: Erro ao criar engajamento
 */



// Definindo as rotas
router.post('/', createEngajamento);
/**
 * @swagger
 * /engajamentoPropostas:
 *   get:
 *     summary: Obter todos os engajamentos de propostas
 *     tags: [Engajamento Propostas]
 *     responses:
 *       200:
 *         description: Lista de engajamentos de propostas
 *       500:
 *         description: Erro ao obter engajamentos de propostas
 */
router.get('/', getEngajamentos);

/**
 * @swagger
 * /engajamentoPropostas/{id}:
 *   get:
 *     summary: Obter um engajamento de proposta por ID
 *     tags: [Engajamento Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento de proposta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Engajamento de proposta encontrado
 *       404:
 *         description: Engajamento de proposta não encontrado
 *       500:
 *         description: Erro ao obter engajamento de proposta
 */
router.get('/:id', getEngajamentoById);

/**
 * @swagger
 * /engajamentoPropostas/{id}:
 *   put:
 *     summary: Atualizar um engajamento de proposta
 *     tags: [Engajamento Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento de proposta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proposta_id:
 *                 type: integer
 *                 example: 1
 *               ip:
 *                 type: string
 *                 example: "192.168.1.1"
 *               voto:
 *                 type: string
 *                 enum: [favor, contra]
 *                 example: "contra"
 *     responses:
 *       200:
 *         description: Engajamento de proposta atualizado com sucesso
 *       404:
 *         description: Engajamento de proposta não encontrado
 *       500:
 *         description: Erro ao atualizar engajamento de proposta
 */
router.put('/:id', updateEngajamento);

/**
 * @swagger
 * /engajamentoPropostas/{id}:
 *   delete:
 *     summary: Deletar um engajamento de proposta
 *     tags: [Engajamento Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do engajamento de proposta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Engajamento de proposta deletado com sucesso
 *       404:
 *         description: Engajamento de proposta não encontrado
 *       500:
 *         description: Erro ao deletar engajamento de proposta
 */
router.delete('/:id', deleteEngajamento);

module.exports = router;