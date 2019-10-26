const express = require('express');

const app = express();

app.get('*', (_, res) => {
    return res.send('Hey!');
});

app.listen(3000);
