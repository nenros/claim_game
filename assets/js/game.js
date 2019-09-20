import {positions, init_state, next_state} from "../js/logic.js";
import {ui_service} from "../js/ui_service.js";

export function handle_state(state) {
  const new_state = next_state(state)
  run_state(new_state)
  return new_state
}

export function run_state(state) {
  const default_callback = (() => {})
  const run = state.commands.reverse().reduce((callback_acc, command) => {
    return () => run_command(command, callback_acc)
  }, default_callback)
  run()
}

function run_command(command, callback) {
  switch (command.cmd) {
    case 'move':
      console.log('move', command, callback)
      return ui_service.move(command, callback)

    case 'roll_dice':
      console.log('roll_dice', command, callback)
      return ui_service.roll_dice(command, callback)

    case 'show_card':
      console.log('show_card', command, callback)
      return ui_service.show_card(command, callback)

    case 'show_text':
      console.log('show_text', command, callback)
      return ui_service.show_text(command, callback)

    default:
      return console.log("Unknown command", command, callback)
  }
}
