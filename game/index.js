import {Map} from 'immutable'

let board = Map()

//Map

  const refresh = () => {
    for(let x = 0; x<3; x++){
      for(let y = 0; y<3; y++){
        board = board.setIn([x,y], "_");
      }
    }
    return board;
  }

//Action Creators


const start = () => refresh
const move = (player, coord) => ({type: MOVE, Player: player, Coordinate: coord}) 

//Action Types

const MOVE = "MOVE"
const START = "START"


export default function reducer(state = board, action) {
  // TODO
  // console.log("action :", action, action.type)
  // console.log("state :", state)
  switch(action.type) {
    case MOVE:
      const updatedBoard = state.board.setIn(action.Coordinate, action.Player)
      if(action.Player === "X") action.Player = "O"
      else action.Player = "X"
      return {board: updatedBoard, turn: action.Player}
      // return {turn: "X"}
    case START:
      const newBoard = refresh()
      return { turn: "O", board: newBoard }
    default: 
      return state   

  }
}

export {move, start} 