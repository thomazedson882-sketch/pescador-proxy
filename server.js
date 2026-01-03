const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/gateway', async (req, res) => {
  try {
    const data = req.body;
    const gatewayId = data.gateway || 'ilhaRasa_01';
    
    const firebaseUrl = `https://pescador-3a3f9-default-rtdb.firebaseio.com/gateways/${gatewayId}.json?auth=Xqmc0F76pUOkZ2gN7MPVKzup7xWijdEOuOc3wQgx`;
    
    const response = await fetch(firebaseUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    
    const result = await response.text();
    console.log('Firebase:', result);
    res.json({success: true, gateway: gatewayId});
    
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({error: error.message});
  }
});

app.get('/', (req, res) => {
  res.send('Proxy Firebase - Pescador Seguro ATIVO');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
