import { positions } from './positions.js'

const default_state = {
  path: 0,
  step: 0,
  commands: [
    {cmd: 'roll_dice', result: 6},
    {cmd: 'move', x:0, y:0},
    {cmd: 'show_card', resource_name: 'gustav'},
    {cmd: 'show_text', title: 'e-ticket', text: 'You got eticket'}
  ]
}

window.positions = positions

export function init_state() {
  const state = Object.assign({}, default_state)
  state.commands = [
    cmd_move(state)
  ]
  return state
}


function get_command(state) {
  return positions[state.path][state.step].cmd || 'none'
}

function cmd_move(state) {
  const [x, y] = positions[state.path][state.step].xy
  return {cmd: 'move', x: x, y: y}
}

function cmd_roll_dice(state) {
  return {cmd: 'roll_dice', result: random(1, 6)}
}

function cmd_show_card(state) {
  const card_idx = random(0, 4)
  const mega_cards = ['document_eticket', 'document_boarding_pass', 'document_id', 'document_proof_of_delay', 'document_other']
  const mega_card = mega_cards[card_idx]

  return {
    get_document_eticket: create_show_card('document_eticket'),
    get_document_boarding_pass: create_show_card('document_boarding_pass'),
    get_document_id: create_show_card('document_id'),
    get_document_proof_of_delay: create_show_card('document_proof_of_delay'),
    get_document_other: create_show_card('document_other'),
    mega_stop: create_show_card(mega_card),
    submission_gustav: create_show_card('gustav'),
    submission_webform: create_show_card('webform'),
    submission_other: create_show_card('other'),
  }[get_command(state)] || null
}

function cmd_show_text(state) {
  const cmd = get_command(state)
  return {
    'submission_gustav': create_show_text('Gustav', "You've got gustav card"),
    'start': create_show_text('Welcome', "Welcome on claim game")
  }[cmd] || null
}

function create_show_card(name) { 
  return {cmd: 'show_card', resource_name: name}
}

function create_show_text(title, text) {
  return {cmd: 'show_text', title, text} 
}

export function next_state(state) {
  const new_state = Object.assign({}, state)

  const dice = cmd_roll_dice(new_state)

  if (positions[state.path][state.step+1]) {
    new_state.step += 1
  } else if(positions[state.path+1] && positions[state.path+1][0]) {
    new_state.path += 1
    new_state.step = 0
  } else {
    new_state.path = 0
    new_state.step = 0
  }

  new_state.commands = [
    cmd_roll_dice(new_state),
    cmd_move(new_state),
    cmd_show_card(new_state),
    cmd_show_text(new_state)
  ].filter(Boolean)
  
  return new_state
}


function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}