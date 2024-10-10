const pool = require('../database/connection'); //chama a conecção com o BD
const validateEngajamentoMensagem = require('../middlewares/likeMensagemValidation'); // Importando a validação


// Criar um novo engajamento para a mensagem
const createEngajamentoMensagem = async (req, res) => {
    const { mensagem_id, ip, voto } = req.body;
    const id = await generateUniqueId();

    // Valida os dados do engajamento da mensagem
    const { error } = validateEngajamentoMensagem(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Resposta com erro de validação
    }

    try {
        const result = await pool.query(
            'INSERT INTO EngajamentoMensagens (id, mensagem_id, ip, voto) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, mensagem_id, ip, voto]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todos os engajamentos de mensagens
const getEngajamentoMensagens = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM EngajamentoMensagens');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um engajamento de mensagem pelo ID
const getEngajamentoMensagemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM EngajamentoMensagens WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento de mensagem não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um engajamento de mensagem (ID obtido da URL)
const updateEngajamentoMensagem = async (req, res) => {
    const { id } = req.params; // ID obtido da URL
    const { mensagem_id, ip, voto } = req.body;
    try {
        const result = await pool.query(
            'UPDATE EngajamentoMensagens SET mensagem_id = $1, ip = $2, voto = $3 WHERE id = $4 RETURNING *',
            [mensagem_id, ip, voto, id] // ID sendo usado somente no WHERE
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento de mensagem não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um engajamento de mensagem
const deleteEngajamentoMensagem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM EngajamentoMensagens WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento de mensagem não encontrado' });
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
        newId = Math.floor(Math.random() * 90000) + 10000;

        // Verifica se o ID já existe no banco de dados
        const result = await pool.query('SELECT COUNT(*) FROM Politicos WHERE id = $1', [newId]);
        idExists = result.rows[0].count > 0;
    }

    return newId;
};

module.exports = {
    createEngajamentoMensagem,
    getEngajamentoMensagens,
    getEngajamentoMensagemById,
    updateEngajamentoMensagem,
    deleteEngajamentoMensagem,
};
