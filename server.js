const express = require('express');
const bodyParser = require('body-parser');
const setupSwagger = require('./swagger'); // Importe a configuração do Swagger
const pool = require('./database/connection'); // Conexão com o banco de dados
const politicosRoutes = require('./routes/politicos'); // Rotas dos políticos
const propostasRoutes = require('./routes/propostas'); // Rotas dos propostas
const mensagensRoutes = require('./routes/mensagens'); // Rotas dos mensagens
const engajamentoPropostasRoutes = require('./routes/engajamentoPropostas'); // Rotas dos mensagens
const likeMensagens = require('./routes/likeMensagens'); // Rotas dos mensagens
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Chame a função de configuração do Swagger
setupSwagger(app);

// Middleware para processar JSON
app.use(bodyParser.json());

// Usar as rotas de políticos
app.use('/api/politicos', politicosRoutes);
app.use('/api/propostas', propostasRoutes);
app.use('/api/mensagens', mensagensRoutes);
app.use('/api/engajamento', engajamentoPropostasRoutes);
app.use('/api/mensagensengajamento', likeMensagens);


app.use(cors({
    origin: 'http://localhost:5173', // Permite apenas a origem do seu app
}));

app.get('/api/propostas', (req, res) => {
    res.json({ message: 'Dados de propostas' });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});