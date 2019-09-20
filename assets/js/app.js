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

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

start_positions = [
  // top-left
  [467, 390],
  // top-right
  [586, 390],
  // bottom-left
  [467, 505],
  // bottom-right
  [586, 505],
]

start_to_mega = [
  [1240, 417],
  [1411, 417],
  [1573, 417],
  [1742, 417],
  [1907, 417],
  [2080, 417],
  [2247, 417],
  [2416, 417],
  [2586, 417],
  [2753, 417],
  [2920, 417]
  // Mega STOP
  [3112, 417]
]

mega_to_submission_blue = [
  // arrow
  [3040, 573],
  [3037, 838],
  [2870, 838],
  [2706, 838],
  [2539, 838],
  [2373, 838],
  [2207, 838],
  [2040, 838],
  // submission STOP
  [1836, 873]
]

mega_to_submission_red = [
  // arrow
  [3176, 571],
  [3170, 964]
  // submission STOP
  [1836, 873]
]

submission_gustav = [
  [1632, 875]
  // Lara
  [604, 1169]
]

submission_webform = [
  [1633, 1058],
  [1478, 1058],
  [1309, 1058],
  [1142, 1058],
  [971, 1058],
  [802, 1058],
  // Lara
  [604, 1169]
]

submission_other = [
  [1638, 1244],
  [1479, 1244],
  [1310, 1244],
  [1141, 1244],
  [973, 1244],
  [802, 1244],
  // Lara
  [604, 1169]
]

viable_on_hold = [
  // arrow
  [309, 1332],
  [303, 1489],
  [303, 1657],
  [303, 1827],
  [303, 1997],
  [303, 2158],
  [467, 2158],
  [631, 2158],
  [798, 2158],
  [970, 2158],
  [970, 1997],
  [970, 1827],
  [1137, 1827],
  // legal action
  [1304, 1837],
  // MAMA STOP
  [1684, 1656]
]

ready_for_legal_assessment = [
  // arrow
  [468, 1330],
  [465, 1485],
  [465, 1657],
  [465, 1827],
  [465, 1997],
  [631, 1997],
  [798, 1997],
  [798, 1827],
  [798, 1657],
  [970, 1657],
  [1137, 1657],
  // legal action
  [1301, 1656],
  // MAMA STOP
  [1684, 1656]
]

viable = [
  // arrow
  [608, 1334],
  [606, 1485],
  [798, 1485],
  [970, 1485],
  [1137, 1485],
  // legal action
  [1301, 1485],
  // MAMA STOP
  [1684, 1656]
]

payout_blue = [
  // arrow
  [1859, 1567],
  [2014, 1567],
  [2189, 1567],
  [2360, 1567],
  [2528, 1567],
  [2694, 1567],
  [2864, 1567],
  [2864, 1752],
  // PAYOUT STOP
  [2611, 1766],
  // PALM TREE
  [3392, 2094]
]

payout_green = [
  // arrow
  [1859, 1751],
  [2014, 1751],
  [2189, 1751],
  [2360, 1751],
  // PAYOUT STOP
  [2611, 1766],
  // PALM TREE
  [3392, 2094]
]
