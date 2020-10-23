import Timer from './Timer.js'
import Questions from './Questions.js'
import Highscore from './Highscore.js'

/**
 * Module for the Quiz
 * This is where the questions are formed and changes the page dynamically
 *
 * @module js/Quiz
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Quiz
 */
export default class Quiz {
  constructor (nickname) {
    this.nickname = nickname
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
    this.url = 'http://vhost3.lnu.se:20080/answer/1'
    this.quizHead = document.querySelector('.quizHead')
    this.timer = new Timer()
    this.questions = new Questions()
    this.highscore = new Highscore()
  }

  /**
   * GET the URL from the server
  *  Sends get request to the server
  *
  * @returns
  * @memberof Quiz
  */
  async getQuestions () {
    const response = await window.fetch(this.nextURL)
    const data = await response.json()
    document.querySelector('.quizHead').textContent = `Question: ${data.question}`
    this.url = data.nextURL
    return data
  }

  /**
   * POST the answer object in JSON FORMAT to the server and recieve the nextURL
   *
   * @param {{object}} obj to send answer object in JSDOC format
   * @returns object containing the data object
   * @memberof Quiz
   */
  async sendQuestions (obj) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
    const request = await window.fetch(this.url, options)
    const data = await request.json()

    // When sending the question check if the question is correct/wrong if not,
    // the game is over and present the highscore
    if (data.nextURL && data.message === 'Correct answer!') {
      document.querySelector('.quizHead').innerText = `${data.message}`
      this.nextURL = data.nextURL
      this.removeForm()
      this.refresh()
      this.timer.stopTimer()
    } else if (data.message === 'Wrong answer! :(') {
      document.querySelector('.quizHead').innerText = `${data.message}`
      this.removeForm()
      this.timer.stopTimer()
    } else {
      this.gameOver()
    }

    return data
  }

  /**
   * The method checks if the input value is from an radiobutton or text input
   * and sends it to the sendQuestions method as an object when submitting the answer
   *
   * @memberof Quiz
   */
  submitAnswer () {
    const button = document.querySelector('.btnAnswer')
    const answer = document.querySelector('.text')

    button.addEventListener('click', event => {
      event.preventDefault()
      const radio = document.querySelector('input[name="alt"]:checked')

      let value
      if (radio) {
        value = document.querySelector('input[name="alt"]:checked').value
        console.log(value)
      } else {
        value = answer.value
      }
      const obj = {
        answer: value
      }
      this.sendQuestions(obj)
    })
  }

  /**
   * This method stores the players name and total time in localStorage
   *
   * @memberof Quiz
   */
  saveHighscore () {
    const result = {
      userName: this.nickname,
      score: this.timer.counter
    }

    let savedScores = window.localStorage.getItem('highscore') // get the score, or the initial value if empty

    if (savedScores) {
      savedScores = JSON.parse(savedScores)
    } else {
      savedScores = []
    }

    const highscores = [...savedScores, result] // add the result
      .sort((a, b) => a.score - b.score) // sort descending
      .slice(0, 5) // take highest 5

    window.localStorage.setItem('highscore', JSON.stringify(highscores)) // store the scoress
  }

  /**
   * Displays the players name and appends it to the question template
   *
   * @memberof Quiz
   */
  displayName () {
    const nameDiv = document.querySelector('.name')
    const h2 = document.createElement('h2')
    h2.innerText = `Nickname: ${this.nickname}`
    nameDiv.appendChild(h2)
  }

  /**
   * Everytime the correct answer is submitted check if the next question contains a
   * alternatative object and refresh the site and display they new question
   *
   * @memberof Quiz
   */
  refresh () {
    setTimeout(async () => {
      const data = await this.getQuestions()
      this.clearQuestionDiv()
      if (data.alternatives) {
        console.log(this.timer.counter)
        this.questions.displayAltQuestions(data)
        this.displayName()
        this.submitAnswer()
      } else {
        console.log(this.timer.counter)
        this.questions.displayTextQuestions()
        this.submitAnswer()
        this.displayName()
        document.querySelector('.quizHead').textContent = `Question: ${data.question}`
      }
      this.timer.startTimer()
    }, 1500)
  }

  /**
   * Removes the start page div when initiating the quiz
   *
   * @memberof Quiz
   */
  clearStartDiv () {
    const element = document.querySelector('#container')
    element.remove()
  }

  /**
   * Removes the question div for the next question
   * @memberof Quiz
   */
  clearQuestionDiv () {
    const element = document.querySelector('#container2')
    element.remove()
  }

  /**
   * Removes the quiz form when the question is answered
   *
   * @memberof Quiz
   */
  removeForm () {
    const quizForm = document.querySelector('#quizForm')
    while (quizForm.firstChild) {
      quizForm.removeChild(quizForm.firstChild)
    }
  }

  /**
 * Initiates the quiz
 *
 * @memberof Quiz
 */
  run () {
    this.clearStartDiv()
    this.questions.displayTextQuestions()
    this.getQuestions()
    this.timer.startTimer()
    this.submitAnswer()
    this.displayName()
  }

  /**
   * When there are no question, show the highscore board
   * and let the player decide if he/she want to play again
   *
   * @memberof Quiz
   */
  gameOver () {
    this.clearQuestionDiv()
    this.saveHighscore()
    this.highscore.displayHighscore()
    this.timer.stopTimer()
    this.playAgain()
  }

  /**
   * Play again button will take you to the startpage
   *
   * @memberof Quiz
   */
  playAgain () {
    const button = document.querySelector('.btnAnswer')
    button.addEventListener('click', event => {
      event.target = window.location.reload()
    })
  }
}
