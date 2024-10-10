// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Políticos',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento de políticos',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL do seu servidor
            },
        ],
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos onde estão as anotações
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
