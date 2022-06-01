const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/connection');
const Question = require('./database/models/Question');
const Answer = require('./database/models/Answer');


const PORT = 3000;


// estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({ raw: true, order: [
      ['id', 'DESC']
    ]});
    return res.render('index', {
      questions
    });
  } catch (e) {
    return res.staus(500).json({message: 'internal error'});
  }
});

app.get('/question', (req, res) => {
  try {
    return res.render('createQuestion');
  } catch (e) {
    return res.staus(500).json({message: 'internal error'});
  }
});

app.post('/savequestion', async (req, res) => {
  try {
    const { title, description } = req.body;
    await Question.create({ title,description });
    return res.redirect('/');
  } catch (e) {
    return res.staus(500).json({message: 'internal error'});
  }
});

app.post('/answer', async (req, res) => {
  try {
    const { body, questionId } = req.body;
    await Answer.create({
      body,
      questionId
    });
    res.redirect(`/question/${questionId}`);
  } catch (e) {
    return res.staus(500).json({message: 'internal error'});
  }
});

app.get('/question/:id', async (req, res) => {
try {
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
} catch (e) {
  return res.staus(500).json({message: 'internal error'});
}
});





app.listen(PORT, () => console.log(`servidor está escutando na porta: ${PORT}`))
