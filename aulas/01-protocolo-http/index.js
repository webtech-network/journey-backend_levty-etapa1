const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ mensagem: 'Bem-vindo à API' });
});

app.post('/login', (req, res) => {
    if (!req.header('x-auth-token')) {
        return res.status(401).send({ erro: 'Não autorizado' });
    }

    if (req.header('x-auth-token') !== 'secret-token') {
        return res.status(403).send({ erro: 'Proibido' });
    }

    res.send({ mensagem: 'Login realizado com sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});