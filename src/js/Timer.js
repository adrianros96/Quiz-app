/**
 * Module for timer
 * This module containts methods for a timer
 *
 * @module js/Timer
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Timer
 */
export default class Timer {
  /**
   * Creates an instance of Timer.
   * The constructor contains 3 properties that checks the total time for the player
   * start time for every round
   *
   * @memberof Timer
   */
  constructor () {
    this.intervalID = null
    this.totalSeconds = 20
    this.counter = 0
  }

  /**
   *  Calculates the seconds and displays it for the player.
   *  If the player reach the time 0 the game will stop.
   *
   * @returns The timer in as a text in the class timerH1
   * @memberof Timer
   */
  timer () {
    const display = document.querySelector('.timerH1')
    this.totalSeconds--
    const minutes = parseInt(this.totalSeconds / 60)
    const seconds = parseInt(this.totalSeconds - (minutes * 60), 10)

    display.textContent = seconds + ' ' + '/seconds'
    if (this.totalSeconds === 0) {
      document.querySelector('.quizHead').innerText = 'You ran out of time!'
      const quizForm = document.querySelector('#quizForm')

      while (quizForm.firstChild) {
        quizForm.removeChild(quizForm.firstChild)
        this.stopTimer()
      }
    }
    return display
  }

  /**
   * This method starts the timer and adds the seconds to the total time
   *
   * @memberof Timer
   */
  startTimer () {
    this.intervalID = setInterval(() => {
      this.timer()
      this.counter++
    }, 1000)
  }

  /**
   * This method stops the timer and resets the time to 20 seconds
   *
   * @memberof Timer
   */
  stopTimer () {
    clearInterval(this.intervalID)
    this.totalSeconds = 20
  }
}
