import {get_command} from "../js/logic.js";

export function cmd_show_text(state) {
  const cmd = get_command(state)
  return {
    'start': create_show_text('Welcome', "Welcome on claim game")
  }[cmd] || null
}

export function create_show_text(title, text) {
  return {cmd: 'show_text', title, text} 
}