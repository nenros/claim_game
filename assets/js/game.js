import {positions, init_state, next_state} from "../js/logic.js";
import {ui_service} from "../js/ui_service.js";

export function loop() {
  let state = init_state();
  while (true) {
    const pawns = 1;
    state = next_state(state);
    for (const command of state.commands) {
      execute_command(command, state, ui_service)
    }
  }
}

export function handle_state(state) {
  const new_state = next_state(state);
  for (const command of state.commands) {
    execute_command(command, state, ui_service)
  }
  return new_state;
}

function execute_command(command, state) {
  switch (command.cmd) {
    case 'move':
      const {x, y} = state.position
      return ui_service.move({x, y})
    default:
      return console.log('unknown command', command, state, ui_service)
  }
}
