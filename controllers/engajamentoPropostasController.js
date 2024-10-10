const pool = require('../database/connection'); //chama a conecção com o BD
const validateEngajamentoProposta = require('../middlewares/engajamentoProposataValidation'); // Importando a validação


// Criar um novo engajamento (com ID da função geradora de ID)
const createEngajamento = async (req, res) => {
    const { proposta_id, ip, voto } = req.body;
    const id = await generateUniqueId();

    // Valida os dados do engajamento da proposta
    const { error } = validateEngajamentoProposta(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Resposta com erro de validação
    }

    try {
        const result = await pool.query(
            'INSERT INTO EngajamentoPropostas (id, proposta_id, ip, voto) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, proposta_id, ip, voto]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Código de erro para violação de restrição UNIQUE
            res.status(400).json({ error: 'Este IP já votou nesta proposta.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Obter todos os engajamentos
const getEngajamentos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM EngajamentoPropostas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter engajamento pelo ID
const getEngajamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM EngajamentoPropostas WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar engajamento (ID obtido da URL)
const updateEngajamento = async (req, res) => {
    const { id } = req.params;
    const { proposta_id, ip, voto } = req.body;
    try {
        const result = await pool.query(
            'UPDATE EngajamentoPropostas SET proposta_id = $1, ip = $2, voto = $3 WHERE id = $4 RETURNING *',
            [proposta_id, ip, voto, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Código de erro para violação de restrição UNIQUE
            res.status(400).json({ error: 'Este IP já votou nesta proposta.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Deletar um engajamento
const deleteEngajamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM EngajamentoPropostas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Engajamento não encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Função que gera ID que vão de 10.000 a 99.999 sendo aleatorio
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
    createEngajamento,
    getEngajamentos,
    getEngajamentoById,
    updateEngajamento,
    deleteEngajamento,
};
