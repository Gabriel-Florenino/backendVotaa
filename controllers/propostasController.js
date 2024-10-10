// propostasController.js
const pool = require('../database/connection');
const validateProposta = require('../middlewares/propostasValidation'); // Importando a validação


// Criar uma nova proposta (com ID manual)
const createProposta = async (req, res) => {
    const { politico_id, titulo, categoria, descricao } = req.body;
    const id = await generateUniqueId();

    // Valida os dados da proposta
    const { error } = validateProposta(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Resposta com erro de validação
    }

    try {
        const result = await pool.query(
            'INSERT INTO Propostas (id, politico_id, titulo, categoria, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, politico_id, titulo, categoria, descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todas as propostas
const getPropostas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Propostas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter uma proposta pelo ID
const getPropostaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Propostas WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Proposta não encontrada' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma proposta (ID obtido da URL)
const updateProposta = async (req, res) => {
    const { id } = req.params; // ID obtido da URL
    const { politico_id, titulo, categoria, descricao } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Propostas SET politico_id = $1, titulo = $2, categoria = $3, descricao = $4 WHERE id = $5 RETURNING *',
            [politico_id, titulo, categoria, descricao, id] // ID sendo usado somente no WHERE
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Proposta não encontrada' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar uma proposta
const deleteProposta = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Propostas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Proposta não encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generateUniqueId = async () => {
    let newId;
    let idExists = true;

    while (idExists) {
        // Gera um ID aleatório entre 100 e 990
        newId = Math.floor(Math.random() * 900) + 100;

        // Verifica se o ID já existe no banco de dados
        const result = await pool.query('SELECT COUNT(*) FROM Politicos WHERE id = $1', [newId]);
        idExists = result.rows[0].count > 0;
    }

    return newId;
};

module.exports = {
    createProposta,
    getPropostas,
    getPropostaById,
    updateProposta,
    deleteProposta,
};
