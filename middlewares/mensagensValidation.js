// mensagensValidation.js
const Joi = require('joi');

// Definindo o esquema de validação
const mensagemSchema = Joi.object({
    proposta_id: Joi.number().integer().required(), // ID da proposta é obrigatório e deve ser um número inteiro
    ip: Joi.string().ip().required(), // IP é obrigatório e deve ser um endereço IP válido (IPv4 ou IPv6)
    mensagem: Joi.string().max(2000).required(), // Mensagem é obrigatória e deve ter no máximo 2000 caracteres
    elogio: Joi.boolean().required(), // Elogio é obrigatório e deve ser um valor booleano
});

// Função para validar os dados
const validateMensagem = (data) => {
    return mensagemSchema.validate(data);
};

module.exports = validateMensagem;
