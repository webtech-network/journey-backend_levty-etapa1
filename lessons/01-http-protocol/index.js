const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the API' });
});

app.post('/login', (req, res) => {
    if (!req.header('x-auth-token')) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    if (req.header('x-auth-token') !== 'secret-token') {
        return res.status(403).send({ error: 'Forbidden' });
    }

    res.send({ message: 'Login successful' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});