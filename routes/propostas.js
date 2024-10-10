const express = require('express');
const router = express.Router();
const {
    createProposta,
    getPropostas,
    getPropostaById,
    updateProposta,
    deleteProposta,
} = require('../controllers/propostasController');

/**
 * @swagger
 * /propostas:
 *   post:
 *     summary: Criar uma nova proposta
 *     tags: [Propostas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               politico_id:
 *                 type: integer
 *                 example: 10
 *               titulo:
 *                 type: string
 *                 example: "Proposta de melhoria da saúde"
 *               categoria:
 *                 type: string
 *                 example: "Saúde"
 *               descricao:
 *                 type: string
 *                 example: "Melhorar as condições dos hospitais."
 *     responses:
 *       201:
 *         description: Proposta criada com sucesso
 *       500:
 *         description: Erro ao criar proposta
 */
router.post('/', createProposta);

/**
 * @swagger
 * /propostas:
 *   get:
 *     summary: Obter todas as propostas
 *     tags: [Propostas]
 *     responses:
 *       200:
 *         description: Lista de propostas
 *       500:
 *         description: Erro ao obter propostas
 */
router.get('/', getPropostas);

/**
 * @swagger
 * /propostas/{id}:
 *   get:
 *     summary: Obter uma proposta por ID
 *     tags: [Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da proposta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proposta encontrada
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao obter proposta
 */
router.get('/:id', getPropostaById);

/**
 * @swagger
 * /propostas/{id}:
 *   put:
 *     summary: Atualizar uma proposta
 *     tags: [Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da proposta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Proposta atualizada"
 *               categoria:
 *                 type: string
 *                 example: "Saúde"
 *               descricao:
 *                 type: string
 *                 example: "Descrição atualizada."
 *     responses:
 *       200:
 *         description: Proposta atualizada com sucesso
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao atualizar proposta
 */
router.put('/:id', updateProposta);

/**
 * @swagger
 * /propostas/{id}:
 *   delete:
 *     summary: Deletar uma proposta
 *     tags: [Propostas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da proposta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proposta deletada com sucesso
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao deletar proposta
 */
router.delete('/:id', deleteProposta);

module.exports = router;