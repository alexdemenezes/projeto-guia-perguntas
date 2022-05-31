const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/connection');
const Question = require('./database/models/Question');


const PORT = 3000;


// estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res) => {
  const questions = await Question.findAll({ raw: true });
  console.log(questions);
  res.render('index', {
    questions
  });
});

app.get('/question', (req, res) => {
  res.render('question');
});

app.post('/savequestion', async (req, res) => {
  const { title, description } = req.body;

  await Question.create({
    title,
    description
  });

  res.redirect('/');

});



app.listen(PORT, () => console.log(`servidor está escutando na porta: ${PORT}`))
