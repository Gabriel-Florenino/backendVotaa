const express = require('express');
const router = express.Router();
const {
    createMensagem,
    getMensagens,
    getMensagemById,
    updateMensagem,
    deleteMensagem,
} = require('../controllers/mensagensController');

/**
 * @swagger
 * /mensagens:
 *   post:
 *     summary: Criar uma nova mensagem
 *     tags: [Mensagens]
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
 *               mensagem:
 *                 type: string
 *                 example: "Esta proposta é excelente!"
 *               elogio:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
 *       500:
 *         description: Erro ao criar mensagem
 */


// Definindo as rotas
router.post('/', createMensagem);
/**
 * @swagger
 * /mensagens:
 *   get:
 *     summary: Obter todas as mensagens
 *     tags: [Mensagens]
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *       500:
 *         description: Erro ao obter mensagens
 */
router.get('/', getMensagens);

/**
 * @swagger
 * /mensagens/{id}:
 *   get:
 *     summary: Obter uma mensagem por ID
 *     tags: [Mensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensagem encontrada
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro ao obter mensagem
 */
router.get('/:id', getMensagemById);

/**
 * @swagger
 * /mensagens/{id}:
 *   put:
 *     summary: Atualizar uma mensagem
 *     tags: [Mensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensagem:
 *                 type: string
 *                 example: "Mensagem atualizada."
 *               elogio:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Mensagem atualizada com sucesso
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro ao atualizar mensagem
 */
router.put('/:id', updateMensagem);

/**
 * @swagger
 * /mensagens/{id}:
 *   delete:
 *     summary: Deletar uma mensagem
 *     tags: [Mensagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensagem deletada com sucesso
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro ao deletar mensagem
 */
router.delete('/:id', deleteMensagem);

module.exports = router;