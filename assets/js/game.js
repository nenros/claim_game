import {positions, init_state, next_state} from "../js/logic.js";
import {ui_service} from "../js/ui_service.js";

export function handle_state(state) {
  let callback = (() => {})
  const new_state = next_state(state)
  for (const command of state.commands.reverse()) {
    callback = () => ui_service[command.cmd](command, callback)
  }
  callback()
  return new_state
}
