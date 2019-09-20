// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import * as logic from "../js/logic.js";
import * as game from "../js/game.js";
import {positions, init_state, next_state} from "../js/logic.js";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"


console.log(game)
window.logic = logic
window.game = game


let state = logic.init_state();

window.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if (event.keyCode === 32) {
    state = game.handle_state(state)
  }
});


paper.view.onFrame((event) => {

})