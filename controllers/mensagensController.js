const pool = require('../database/connection');
const validateMensagem = require('../middlewares/mensagensValidation'); // Importando a validação


// Criar uma nova mensagem (com ID manual)
const createMensagem = async (req, res) => {
    const { proposta_id, ip, mensagem, elogio } = req.body;
    const id = await generateUniqueId();

    // Valida os dados da mensagem
    const { error } = validateMensagem(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Resposta com erro de validação
    }

    try {
        const result = await pool.query(
            'INSERT INTO Mensagens (id, proposta_id, ip, mensagem, elogio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, proposta_id, ip, mensagem, elogio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todas as mensagens
const getMensagens = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Mensagens');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter uma mensagem pelo ID
const getMensagemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Mensagens WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Mensagem não encontrada' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma mensagem (ID obtido da URL)
const updateMensagem = async (req, res) => {
    const { id } = req.params;
    const { proposta_id, ip, mensagem, elogio } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Mensagens SET proposta_id = $1, ip = $2, mensagem = $3, elogio = $4 WHERE id = $5 RETURNING *',
            [proposta_id, ip, mensagem, elogio, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Mensagem não encontrada' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar uma mensagem
const deleteMensagem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Mensagens WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Mensagem não encontrada' });
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
        newId = Math.floor(Math.random() * 9000) + 1000;

        // Verifica se o ID já existe no banco de dados
        const result = await pool.query('SELECT COUNT(*) FROM Politicos WHERE id = $1', [newId]);
        idExists = result.rows[0].count > 0;
    }

    return newId;
};

module.exports = {
    createMensagem,
    getMensagens,
    getMensagemById,
    updateMensagem,
    deleteMensagem,
};
