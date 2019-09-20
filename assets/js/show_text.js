import {get_command} from "../js/logic.js";

export function cmd_show_text(state) {
  const cmd = get_command(state)
  return {
    'start': create_show_text('Welcome', 'Welcome to the Claim Game! The experience you will never forget!<br>Today you will become a modern Robin Hood, a highly skilled archer and swordsman (aka. AirHelp agent) who <em>helps Air Passengers</em>.<br>Your goal is to collect compensation from the airline and give it to the Passenger. It’s easy, just collect necessary documents, send a claim to the airline, win the case in the court and pay the money to the customer. Don’t be afraid, your Marry Man will help you: Aga, Mega Thorn, Ada, Gustav, Lara, Dora and MAMA.<br><br>Let’s start! <em>AGA</em> accepted the claim but left you the note to verify reports. Pick up the claim (<em>roll the dice</em>) and have fun!')
  }[cmd] || null
}

export function create_show_text(title, text) {
  return {cmd: 'show_text', title, text}
}
