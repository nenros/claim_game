import {positions, init_state, next_state} from "../js/logic.js";
import {ui_service} from "../js/ui_service.js";

export function handle_state(state) {
  const default_callback = (() => {})
  const new_state = next_state(state)


  const run = new_state.commands.reverse().reduce((callback_acc, command) => {
    return () => run_command(command, callback_acc)
  }, default_callback)

  run()
  return new_state
}

function run_command(command, callback) {
  switch (command.cmd) {
    case 'move':
      return ui_service.move(command, callback)

    case 'roll_dice':
      return ui_service.roll_dice(command, callback)

    case 'show_card':
      return ui_service.show_card(command, callback)

    case 'show_text':
      return ui_service.show_text(command, callback)

    default:
      return console.log("Unknown command", command, callback)
  }
}
