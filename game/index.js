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
      const test = board.getIn([i, j]);
      console.log(test);
      if (test === '_') return null;
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

export default function reducer(state = {}, action) {
  if (action.type === 'MOVE') {
    const nextBoard = boardReducer(state.board, action);
    const winnerState = winner(nextBoard);
    console.log('GGGGGG', winnerState);
    return {
      board: nextBoard,
      turn: turnReducer(state.turn, action),
      winner: winnerState,
    };
  } else if (action.type === 'START') {
    const newBoard = refresh();
    return { board: newBoard, winner: null, turn: 'X' };
  }
}

function turnReducer(turn = 'X', action) {
  if (action.type === 'MOVE') {
    return turn === 'X' ? 'O' : 'X';
  }
  return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === MOVE) return board.setIn(action.coord, action.player);
  return board;
}

export { move, start, winner };
