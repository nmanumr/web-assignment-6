const express = require('express');
const PORT = process.env.PORT || 5000;

express()
    .use(express.json())
    .use('/api/wallets', require('./routes/wallets'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
