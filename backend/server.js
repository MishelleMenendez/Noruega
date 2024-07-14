const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/noruega', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Esquema de datos
const quizSchema = new mongoose.Schema({
  username: String,
  answers: [String],
  score: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el envío del cuestionario
app.post('/api/quiz', async (req, res) => {
  const { username, answers, score } = req.body;

  const newQuiz = new Quiz({ username, answers, score });

  try {
    await newQuiz.save();
    res.send('Datos guardados correctamente');
  } catch (error) {
    res.status(500).send('Error al guardar los datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
