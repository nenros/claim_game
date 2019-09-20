import { positions } from './positions.js'
import { cmd_show_text } from './show_text.js'

const default_state = {
  path: 0,
  step: 0,
  commands: [
    {cmd: 'roll_dice', result: 6},
    {cmd: 'move', x:0, y:0},
    {cmd: 'show_card', resource_name: 'gustav'},
    {cmd: 'show_text', title: 'e-ticket', text: 'You got eticket'}
  ],
  documents: []
}

window.positions = positions

export function init_state() {
  const state = Object.assign({}, default_state)
  state.commands = [
    cmd_move(state),
    cmd_show_text(state)
  ]
  return state
}

export function get_command(state) {
  return positions[state.path][state.step].cmd || 'none'
}

function cmd_move(state) {
  return create_move(state.path, state.step)
}

function create_move(path, step) {
  const [x, y] = positions[path][step].xy
  return {cmd: 'move', x: x, y: y}
}

function cmd_roll_dice(state) {
  return {cmd: 'roll_dice', result: random(1, 6)}
}

function cmd_show_card(state) {
  const card_idx = random(0, 4)
  const mega_cards = ['document_eticket', 'document_boarding_pass', 'document_id', 'document_proof_of_delay', 'document_other']
  const mega_card = mega_cards[card_idx]

  const command = {
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

  if (command && command.resource_name) {
    state.documents = [...state.documents, command && command.resource_name]
    console.log('documents', state.documents)
  }
  return command;
}

function create_show_card(name) {
  return {cmd: 'show_card', resource_name: name}
}

function move_up_to_end(state, add) {
  const new_step = state.step + add - 1
  if (new_step < positions[state.path].length) {
    return new_step
  } else {
    return positions[state.path].length - 1
  }
}

function is_on_last(state) {
  return state.step == positions[state.path].length - 1
}

function is_all_docs(state) {
  "e_ticket", "id"
  return true
}

export function next_state(old_state) {
  const state = Object.assign({}, old_state)
  const dice = cmd_roll_dice(state)
  state.commands = [dice]

  switch (state.path) {
    // start_positions
    case 0:
      state.step = 0

    // start_to_mega
    case 1:
      state.path = 1;
      state.step = move_up_to_end(state, dice.result)
      if (state.step == 0 || state.step == 1) {
        state.path = 0
        state.step = 0
        state.commands = [
          ...state.commands,
          cmd_move(state),
          cmd_show_text(state),
          create_move(0, 0)
        ]
      } else {
        state.commands = [...state.commands, cmd_move(state)]
      }
      state.commands = [...state.commands, cmd_show_card(state)]

      if (is_on_last(state)) {
        // check documents
        if (is_all_docs(state)) {
          state.path = random(2, 3)
          state.step = 0
          state.commands = [
            ...state.commands,
            cmd_move(state),
            cmd_show_text(state)
          ]
        }
      }
      break;

    // mega_to_submission_blue
    case 2:
    // mega_to_submission_red
    case 3:
      state.step = move_up_to_end(state, dice.result)
      state.commands = [...state.commands, cmd_move(state)]
      if (is_on_last(state)) {
        state.path = random(4, 6)
        state.step = 0
        state.commands = [
          ...state.commands,
          cmd_move(state),
          cmd_show_text(state)
        ]
      }
      break;

    // submission_gustav
    case 4:
    // submission_webform
    case 5:
    // submission_other
    case 6:
      state.step = move_up_to_end(state, dice.result)
      state.commands = [...state.commands, cmd_move(state)]
      if (is_on_last(state)) {
        state.path = 9
        state.step = 0
        state.commands = [
          ...state.commands,
          cmd_move(state),
          cmd_show_text(state)
        ]
      }
      break;

    // viable_on_hold
    case 7:
    
    // ready_for_legal_assessment
    case 8:
  
    // viable
    case 9:
      state.step = move_up_to_end(state, dice.result)
      state.commands = [...state.commands, cmd_move(state)]
      state.step = move_up_to_end(state, dice.result)
      state.commands = [...state.commands, cmd_move(state)]
      if (is_on_last(state)) {
        state.path = 11
        state.step = 0
      }
      break;

    // payout_blue
    case 10:

    // payout_green
    case 11:
      state.step = move_up_to_end(state, dice.result)
      state.commands = [...state.commands, cmd_move(state)]
      if (is_on_last(state)) {
        state.path = 12
        state.step = 0
      }
      break;

    // palm_tre
    default:
      state.path = 12
      state.step = 0
      state.commands = [cmd_move(state)]
      break;
  }

  if (positions[state.path][state.step+1]) {
    state.step += 1
  } else if(positions[state.path+1] && positions[state.path+1][0]) {
    state.path += 1
    state.step = 0
  } else {
    state.path = 0
    state.step = 0
  }

  // state.commands = [
  //   dice,
  //   cmd_move(state),
  //   cmd_show_card(state),
  //   cmd_show_text(state)
  // ].filter(Boolean)
  state.commands = state.commands.filter(Boolean)

  return state
}


function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}
