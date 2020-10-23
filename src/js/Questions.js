/**
 * This module will generate the templates depending what type of question it is
 *
 * @module js/Questions
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Questions
 */
export default class Questions {
  /**
   * This function creates the text questions div
   *
   * @memberof Questions
   */
  displayTextQuestions () {
    const templateNode = document.querySelector('#quizTemp')
    const body = document.querySelector('body')
    const templateDiv = document.importNode(templateNode.content, true)
    body.appendChild(templateDiv)
  }

  /**
   * This function creates the alternative question div
   * and also creates the radio buttons with a for of loop
   *
   * @param {{data}} data the object from the server
   * @memberof Questions
   */
  displayAltQuestions (data) {
    const templateNode = document.querySelector('#temp-Alt')
    const body = document.querySelector('body')
    const templateDiv = document.importNode(templateNode.content, true)
    body.appendChild(templateDiv)
    document.querySelector('.quizHead').textContent = `Question: ${data.question}`
    const form = body.querySelector('.divInput')

    for (const key in data.alternatives) {
      const input = document.createElement('input')
      const label = document.createElement('label')

      input.setAttribute('type', 'radio')
      input.setAttribute('name', 'alt')
      input.setAttribute('class', 'text')
      input.setAttribute('value', key)
      label.textContent = `${data.alternatives[key]}:`
      label.appendChild(input)
      form.insertBefore(label, form.firstChild)
    }
  }
}
