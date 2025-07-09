const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = 3000;

app.use(morgan('common'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/site', express.static('public'));

app.use((req, res) => {
    res.status(404).send('Page not found');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});