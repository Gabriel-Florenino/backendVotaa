const Joi = require('joi');

// Definindo o esquema de validação
const politicoSchema = Joi.object({
    nome: Joi.string().max(100).required(), // Nome é obrigatório e deve ter no máximo 100 caracteres
    descricao: Joi.string().optional(), // Descrição é opcional
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(), // CPF deve ter 14 caracteres e conter apenas números
    selo: Joi.string().optional(), // Selo é opcional
    destaque: Joi.boolean().default(false), // Destaque é opcional e padrão é false
});

// Função para validar os dados
const validatePolitico = (data) => {
    return politicoSchema.validate(data);
};

module.exports = validatePolitico;
