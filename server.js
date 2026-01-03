const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// IMPORTANTE: Aceitar tanto HTTP quanto HTTPS
app.use(express.json());

// Middleware para aceitar HTTP
app.set('trust proxy', true);

app.post('/gateway', async (req, res) => {
  try {
    const data = req.body;
    const gatewayId = data.gateway || 'ilhaRasa_01';
    
    console.log('Dados recebidos:', data);
    
    const firebaseUrl = `https://pescador-3a3f9-default-rtdb.firebaseio.com/gateways/${gatewayId}.json?auth=Xqmc0F76pUOkZ2gN7MPVKzup7xWijdEOuOc3wQgx`;
    
    const response = await fetch(firebaseUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    
    const result = await response.text();
    console.log('Firebase resposta:', result);
    
    // Responder SEMPRE com sucesso (mesmo via HTTP)
    res.status(200).json({
      success: true, 
      gateway: gatewayId,
      firebase: 'saved'
    });
    
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({error: error.message});
  }
});

app.get('/', (req, res) => {
  res.send('Proxy Firebase - Pescador Seguro ATIVO');
});

app.get('/gateway', (req, res) => {
  res.send('Use POST para enviar dados');
});

app.listen(port, () => console.log(`Servidor porta ${port}`));
