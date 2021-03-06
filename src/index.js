/**
 * The main script file of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.0.0
 */

import './components/bart-board/'

// TODO: Use this file to experiment with the bart-board.
document.querySelector('#bb1').addEventListener('filled', (event) => {
    event.target.clear()
  })
  
const bartBoard = document.createElement("bart-board")
bartBoard.setAttribute("id", "bartBoard")
document.body.appendChild(bartBoard)