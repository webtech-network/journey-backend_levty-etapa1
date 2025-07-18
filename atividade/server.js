const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    if (!nome || !ingredientes) {
        return res.status(400).send('Preencha todos os campos.');
    }

    res.send(`
        <h1>Obrigado pela sugestão, ${nome}!</h1>
        <p>Você sugeriu um lanche com os seguintes ingredientes: ${ingredientes}</p>
        <a href="/">Voltar para o início</a>
    `);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    res.set('Content-Type', 'text/html');
    res.status(200).send(`
        <h1>Contato recebido! Obrigado, ${nome}!</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
        <a href="/">Voltar para o início</a>
    `);
});

app.get('/api/lanches', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'public/data/lanches.json'), 'utf-8');
    res.json(JSON.parse(data));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});