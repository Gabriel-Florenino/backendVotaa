// politicosRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPolitico,
    getPoliticos,
    getPoliticoById,
    updatePolitico,
    deletePolitico,
} = require('../controllers/politicoController');

/**
 * @swagger
 * /politicos:
 *   post:
 *     summary: Criar um novo político
 *     tags: [Politicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               descricao:
 *                 type: string
 *                 example: "Politico atuante na área de saúde."
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               selo:
 *                 type: string
 *                 enum: [bronze, prata, ouro]
 *               destaque:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Político criado com sucesso
 *       500:
 *         description: Erro ao criar político
 */


// Definindo as rotas
router.post('/', createPolitico);
/**
 * @swagger
 * /politicos:
 *   get:
 *     summary: Obter todos os políticos
 *     tags: [Políticos]
 *     responses:
 *       200:
 *         description: Lista de políticos
 *       500:
 *         description: Erro ao obter políticos
 */
router.get('/', getPoliticos);

/**
 * @swagger
 * /politicos/{id}:
 *   get:
 *     summary: Obter um político por ID
 *     tags: [Políticos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do político
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Político encontrado
 *       404:
 *         description: Político não encontrado
 *       500:
 *         description: Erro ao obter político
 */
router.get('/:id', getPoliticoById);

/**
 * @swagger
 * /politicos/{id}:
 *   put:
 *     summary: Atualizar um político
 *     tags: [Políticos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do político
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               descricao:
 *                 type: string
 *                 example: "Político dedicado à educação."
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               selo:
 *                 type: string
 *                 example: "Selo de Transparência"
 *               destaque:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Político atualizado com sucesso
 *       404:
 *         description: Político não encontrado
 *       500:
 *         description: Erro ao atualizar político
 */
router.put('/:id', updatePolitico);

/**
 * @swagger
 * /politicos/{id}:
 *   delete:
 *     summary: Deletar um político
 *     tags: [Políticos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do político
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Político deletado com sucesso
 *       404:
 *         description: Político não encontrado
 *       500:
 *         description: Erro ao deletar político
 */
router.delete('/:id', deletePolitico);

module.exports = router;
