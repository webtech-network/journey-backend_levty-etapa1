const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let ultimoContato = null;

app.get('/nao-encontrado', (req, res) => {
    res.status(404).send('<h1>Página não encontrada</h1>');
});

app.post('/contato', (req, res) => {
    ultimoContato = req.body;
    res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
    if (!ultimoContato) {
        return res.redirect('/nao-encontrado');
    }

    const { nome, email } = ultimoContato;

    res.send(`
            <h1>Contato recebido! Obrigado, ${nome}</h1>
            <p><strong>E-mail:</strong> ${email}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});