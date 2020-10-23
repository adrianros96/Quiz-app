/**
 * Module for highscore
 * This module is used to display the highscore of the players
 *
 * @module js/Highscore
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Highscore
 */
export default class Highscore {
  /**
   * Creates the highscore template and also adds the players scores to the
   * highscorelist
   *
   * @memberof Highscore
   */
  displayHighscore () {
    const templateNode = document.querySelector('#highScore')
    const body = document.querySelector('body')
    const templateDiv = document.importNode(templateNode.content, true)
    body.appendChild(templateDiv)
    const list = document.querySelector('#highscoreList')
    let savedScores = window.localStorage.getItem('highscore')
    savedScores = JSON.parse(savedScores)

    savedScores.forEach(entry => {
      const listItem = document.createElement('li')
      listItem.textContent = `${entry.userName}: ${entry.score} Seconds`
      list.appendChild(listItem)
    })
  }
}
