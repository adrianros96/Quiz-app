import Quiz from './Quiz.js'

/**
 * The starting point of the application
 * Enter the Nickname
 * @module js/app
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @param {@listens} event
 */
function submit (event) {
  if (event.which === 13 || event.keyCode === 13 || event.type === 'click') {
    event.preventDefault()
    const textInput = document.querySelector('#nickname').value

    let startGame
    if (textInput.length > 1) {
      startGame = new Quiz(textInput)
      startGame.run()
    }
  }
}

const form = document.querySelector('#quizForm')
const button = document.querySelector('#submit')

button.addEventListener('click', submit, true)
form.addEventListener('keypress', submit, true)
