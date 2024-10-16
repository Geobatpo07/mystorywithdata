const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir des fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

// Route vers le blog
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/blog.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
