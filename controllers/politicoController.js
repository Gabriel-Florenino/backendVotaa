// politicosController.js
const pool = require('../database/connection');
const validatePolitico = require('../middlewares/politicoValidation'); // Importa a validação

// Criar um novo político (com ID manual)
const createPolitico = async (req, res) => {
    // 1. Receber os dados do corpo da requisição
    const { nome, descricao, cpf, selo, destaque } = req.body;

    // 2. Gerar um novo ID para o político
    const id = await generateUniqueId();

    // Validando os dados
    const { error } = validatePolitico(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // 3. Inserir o novo político no banco de dados
        const result = await pool.query(
            'INSERT INTO Politicos (id, nome, descricao, cpf, selo, destaque) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, nome, descricao, cpf, selo, destaque]
        );

        // 4. Retornar o político criado como resposta
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao criar político:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Obter todos os políticos
const getPoliticos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Politicos');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um político pelo ID
const getPoliticoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Politicos WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Político não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um político (ID obtido da URL)
const updatePolitico = async (req, res) => {
    const { id } = req.params; // ID obtido da URL
    const { nome, descricao, cpf, selo, destaque } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Politicos SET nome = $1, descricao = $2, cpf = $3, selo = $4, destaque = $5 WHERE id = $6 RETURNING *',
            [nome, descricao, cpf, selo, destaque, id] // ID sendo usado somente no WHERE
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Político não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um político
const deletePolitico = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Politicos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Político não encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const generateUniqueId = async () => {
    let newId;
    let idExists = true;

    while (idExists) {
        // Gera um ID aleatório entre 10 e 99
        newId = Math.floor(Math.random() * 90) + 10;

        // Verifica se o ID já existe no banco de dados
        const result = await pool.query('SELECT COUNT(*) FROM Politicos WHERE id = $1', [newId]);
        idExists = result.rows[0].count > 0;
    }

    return newId;
};
module.exports = {
    createPolitico,
    getPoliticos,
    getPoliticoById,
    updatePolitico,
    deletePolitico,
};
