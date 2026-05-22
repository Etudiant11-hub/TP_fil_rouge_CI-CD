const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur TaskFlow SaaS ! Version déployée via CI/CD.');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`TaskFlow app en écoute sur le port ${port}`);
  });
}

module.exports = app;
