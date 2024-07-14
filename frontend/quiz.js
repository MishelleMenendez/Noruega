document.getElementById('quiz-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;

  // Recolectar las respuestas de los campos del cuestionario
  const answers = [];
  for (let i = 1; i <= 10; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (answer) {
      answers.push(answer.value);
    } else {
      answers.push(''); // Si no hay respuesta seleccionada, agregar un string vacío
    }
  }

  // Calcular el puntaje
  const correctAnswers = [
    'Oslo', 'Una entrada de mar', 'Øya Festival', 'Reno', 'Esquí', 
    'Aurora Boreal', 'Una entrada de mar entre montañas', 'Oso Polar', 
    'Son esculpidos por glaciares', 'Regiones septentrionales del Ártico'
  ];
  
  let score = 0;

  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 1; // Sumar 1 punto por cada respuesta correcta
    }
  });

  try {
    const response = await fetch('http://localhost:3000/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, answers, score }),
    });

    if (response.ok) {
      const message = await response.text();
      document.getElementById('result').innerText = `Tu puntaje es: ${score} de 10. ${message}`;
    } else {
      document.getElementById('result').innerText = 'Error al enviar los datos';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'Error al enviar los datos';
  }
});
