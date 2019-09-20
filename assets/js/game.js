import {positions, init_state, next_state} from "../js/logic.js";

export function loop() {
  let state = init_state();
  const ui_service = {move: console.log};
  while (true) {
    const pawns = 1;
    state = next_state(state);
    for (const command of state.commands) {
      execute_command(command, state, ui_service)
    }
  }
}

function execute_command(command, state, ui_service) {
  switch (command) {
    case 'move':
      const {x, y} = state.position
      return ui_service.move({x, y})
    default:
      return console.log('unknown command', command, state, ui_service)
  }
}

