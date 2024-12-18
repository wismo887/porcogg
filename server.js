const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Abilita CORS
app.use(cors());

// Imposta una cartella statica per il file index.html
app.use(express.static(path.join(__dirname)));

// Endpoint per recuperare il file di configurazione
app.get("/config", (req, res) => {
    const configPath = path.join(__dirname, "config.json");
    fs.readFile(configPath, "utf8", (err, data) => {
        if (err) {
            console.error("Errore durante la lettura del file di configurazione:", err);
            res.status(500).send("Errore interno del server");
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
