CREATE TABLE IF NOT EXISTS Politicos (
    id INT PRIMARY KEY,  -- O ID será fornecido por você
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(512),
    cpf VARCHAR(11) UNIQUE NOT NULL,  -- CPF deve ser único
    selo VARCHAR(10) CHECK (selo IN ('bronze', 'prata', 'ouro', 'sem selo')) NOT NULL,  -- Campo para o selo
    destaque BOOLEAN DEFAULT FALSE  -- Campo para indicar se está em destaque
);


CREATE TABLE IF NOT EXISTS Propostas (
    id INT PRIMARY KEY,  -- O ID será fornecido por você
    politico_id INT NOT NULL,  -- Relacionamento com a tabela Politicos
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT,  -- Campo para a descrição da proposta
    FOREIGN KEY (politico_id) REFERENCES Politicos(id) ON DELETE CASCADE  -- Chave estrangeira com comportamento de exclusão em cascata
);


CREATE TABLE IF NOT EXISTS Mensagens (
    id INT PRIMARY KEY,  -- O ID será fornecido por você
    proposta_id INT NOT NULL,  -- Relacionamento com a tabela Propostas
    ip VARCHAR(45) NOT NULL,  -- Campo para o IP do usuário (suportando IPv4 e IPv6)
    mensagem TEXT NOT NULL,  -- Campo para a mensagem
    elogio BOOLEAN NOT NULL,  -- Campo booleano para indicar se é elogio (TRUE) ou crítica (FALSE)
    FOREIGN KEY (proposta_id) REFERENCES Propostas(id) ON DELETE CASCADE  -- Chave estrangeira com comportamento de exclusão em cascata
);


CREATE TABLE IF NOT EXISTS EngajamentoPropostas (
    id INT PRIMARY KEY,  -- O ID será fornecido por você
    proposta_id INT NOT NULL,  -- Relacionamento com a tabela Propostas
    ip VARCHAR(45) NOT NULL,  -- Campo para o IP do usuário (suportando IPv4 e IPv6)
    voto VARCHAR(10) DEFAULT NULL,  -- Campo para indicar 'afavor' ou 'contra', padrão é NULL
    FOREIGN KEY (proposta_id) REFERENCES Propostas(id) ON DELETE CASCADE,  -- Chave estrangeira com comportamento de exclusão em cascata
    UNIQUE (ip, proposta_id)  -- Restrições únicas para garantir que cada IP vote apenas uma vez por proposta
);


CREATE TABLE IF NOT EXISTS EngajamentoMensagens (
    id INT PRIMARY KEY,  -- O ID será fornecido por você
    mensagem_id INT NOT NULL,  -- Relacionamento com a tabela Mensagens
    ip VARCHAR(45) NOT NULL,  -- Campo para o IP do usuário (suportando IPv4 e IPv6)
    voto VARCHAR(10) DEFAULT NULL,  -- Campo para indicar 'like' ou 'dislike', padrão é NULL
    FOREIGN KEY (mensagem_id) REFERENCES Mensagens(id) ON DELETE CASCADE  -- Chave estrangeira com comportamento de exclusão em cascata
);

SELECT * FROM EngajamentoMensagens;