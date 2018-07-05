import { Map } from 'immutable';

let board = Map();

//Map

const refresh = () => {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      board = board.setIn([x, y], '_');
    }
  }
  return board;
};

function winner(board) {
  for (let j = 0; j < 3; j++) {
    switch (streak(board, j)) {
      case 'X':
        return 'X';
      case 'O':
        return 'O';
      default:
        return stillPlaying(board);
    }
  }
}

function streak(board, firstCoor) {
  if (
    board.getIn([firstCoor, 0]) === board.getIn([firstCoor, 1]) &&
    board.getIn([firstCoor, 0]) === board.getIn([firstCoor, 2])
  ) {
    console.log('Testing', board.getIn([firstCoor, 0]));
    return board.getIn([firstCoor, 0]);
  } else if (
    board.getIn([0, firstCoor]) === board.getIn([1, firstCoor]) &&
    board.getIn([0, firstCoor]) === board.getIn([2, firstCoor])
  ) {
    return board.getIn([0, firstCoor]);
  }
  ///
  else if (
    board.getIn([0, 0]) === board.getIn([1, 1]) &&
    board.getIn([2, 2]) === board.getIn([0, 0])
  ) {
    return board.getIn([0, 0]);
  } else if (
    board.getIn([2, 0]) === board.getIn([1, 1]) &&
    board.getIn([0, 2]) === board.getIn([2, 0])
  ) {
    return board.getIn([0, 2]);
  }
}

function stillPlaying(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board.getIn([i, j]) === '_') return null;
    }
  }
  return 'DRAW';
}

//Action Creators

const start = () => refresh;
const move = (player, coord) => ({
  type: MOVE,
  Player: player,
  Coordinate: coord,
});

//Action Types

const MOVE = 'MOVE';
const START = 'START';

export default function reducer(state = board, action) {
  // TODO
  // console.log("action :", action, action.type)
  // console.log("state :", state)
  switch (action.type) {
    case MOVE:
      const updatedBoard = state.board.setIn(action.Coordinate, action.Player);
      if (action.Player === 'X') action.Player = 'O';
      else action.Player = 'X';
      return { board: updatedBoard, turn: action.Player };
    // return {turn: "X"}
    case START:
      const newBoard = refresh();
      return { turn: 'O', board: newBoard };
    default:
      return state;
  }
}

export { move, start, winner };
