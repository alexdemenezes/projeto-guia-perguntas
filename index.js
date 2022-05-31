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
  const questions = await Question.findAll({ raw: true, order: [
    ['id', 'DESC']
  ] });
  return res.render('index', {
    questions
  });
});

app.get('/question', (req, res) => {
  return res.render('createQuestion');
});

app.post('/savequestion', async (req, res) => {
  const { title, description } = req.body;
  await Question.create({ title,description });
  return res.redirect('/');
});

app.get('/question/:id', async (req, res) => {
  const { id } = req.params;

  const question = await Question.findOne({
    raw: true,
    where: { id: +id }
  });

  if (question) {
    return res.render('question', {
      question
    });
  }
  return res.redirect('/');

});





app.listen(PORT, () => console.log(`servidor está escutando na porta: ${PORT}`))
