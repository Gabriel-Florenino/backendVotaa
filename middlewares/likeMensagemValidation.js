// engajamentoMensagensValidation.js
const Joi = require('joi');

// Definindo o esquema de validação
const engajamentoMensagemSchema = Joi.object({
    mensagem_id: Joi.number().integer().required(), // ID da mensagem é obrigatório e deve ser um número inteiro
    ip: Joi.string().ip().required(), // IP é obrigatório e deve ser um endereço IP válido (IPv4 ou IPv6)
    voto: Joi.string().valid('like', 'dislike').allow(null).optional(), // Voto deve ser 'like', 'dislike' ou NULL
});

// Função para validar os dados
const validateEngajamentoMensagem = (data) => {
    return engajamentoMensagemSchema.validate(data);
};

module.exports = validateEngajamentoMensagem;
