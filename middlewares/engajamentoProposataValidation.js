// engajamentoPropostasValidation.js
const Joi = require('joi');

// Definindo o esquema de validação
const engajamentoPropostaSchema = Joi.object({
    proposta_id: Joi.number().integer().required(), // ID da proposta é obrigatório e deve ser um número inteiro
    ip: Joi.string().ip().required(), // IP é obrigatório e deve ser um endereço IP válido (IPv4 ou IPv6)
    voto: Joi.string().valid('afavor', 'contra').allow(null).optional(), // Voto deve ser 'afavor', 'contra' ou NULL
});

// Função para validar os dados
const validateEngajamentoProposta = (data) => {
    return engajamentoPropostaSchema.validate(data);
};

module.exports = validateEngajamentoProposta;
