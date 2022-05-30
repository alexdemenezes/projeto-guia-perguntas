const express = require('express');

const app = express();

const PORT = 3000;


// estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/question', (req, res) => {
  res.render('question');
});
app.listen(PORT, () => console.log(`servidor está escutando na porta: ${PORT}`))
