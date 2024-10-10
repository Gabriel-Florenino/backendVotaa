// propostasValidation.js
const Joi = require('joi');

// Definindo o esquema de validação
const propostaSchema = Joi.object({
    politico_id: Joi.number().integer().required(), // ID do político é obrigatório e deve ser um número inteiro
    titulo: Joi.string().max(255).required(), // Título é obrigatório e deve ter no máximo 255 caracteres
    categoria: Joi.string().max(100).required(), // Categoria é obrigatória e deve ter no máximo 100 caracteres
    descricao: Joi.string().max(2000).optional(), // Descrição é opcional, mas se fornecida, deve ter no máximo 2000 caracteres
});

// Função para validar os dados
const validateProposta = (data) => {
    return propostaSchema.validate(data);
};

module.exports = validateProposta;
