const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = 3000;


// estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/question', (req, res) => {
  res.render('question');
});

app.post('/savequestion', (req, res) => {
  const { title } = req.body;
  const { description } = req.body
  res.send(`titulo: ${title}, descricao: ${description}`);
});



app.listen(PORT, () => console.log(`servidor está escutando na porta: ${PORT}`))
