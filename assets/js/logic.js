import { positions } from './positions.js'


function random() {

}

const default_state = {
  position: {x:0, y:0},
  path: 0,
  step: 0,
  cube: null,
  commands: [
    'move'
  ]
}

export {positions};

export function init_state() {
  const state = Object.assign({}, default_state)
  state.position = new_position(state)
  return state
}

function new_position(state) {
  const [x, y] = positions[state.path][state.step].xy
  return {x: x, y: y}
}

export function next_state(state) {
  const new_state = Object.assign({}, state)

  if (positions[state.path][state.step+1]) {
    new_state.step += 1
  } else if(positions[state.path+1][0]) {
    new_state.path += 1
    new_state.step = 0
  } else {
    new_state.path = 0
    new_state.step = 0
  }
  new_state.position = new_position(new_state)
  
  return new_state
}