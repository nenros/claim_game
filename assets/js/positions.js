const start_positions = [
  // top-left
  {xy: [467, 390], cmd: "start"},
  // top-right
  {xy: [586, 390], cmd: "start"},
  // bottom-left
  {xy: [467, 505], cmd: "start"},
  // bottom-right
  {xy: [586, 505], cmd: "start"},
]

const start_to_mega = [
  {xy: [1240, 417], cmd: 'go_to_start'},
  {xy: [1411, 417], cmd: 'go_to_start'},
  {xy: [1573, 417], cmd: 'none'},
  {xy: [1742, 417], cmd: 'none'},
  {xy: [1907, 417], cmd: 'none'},
  {xy: [2080, 417], cmd: 'none'},
  {xy: [2247, 417], cmd: 'get_document_eticket'},
  {xy: [2416, 417], cmd: 'get_document_boarding_pass'},
  {xy: [2586, 417], cmd: 'get_document_id'},
  {xy: [2753, 417], cmd: 'get_document_proof_of_delay'},
  {xy: [2920, 417], cmd: 'get_document_other'},
  {xy: [3112, 417], cmd: 'mega_stop'},
]

const mega_to_submission_blue = [
  // arrow
  {xy: [3040, 573], cmd: 'none'},
  {xy: [3037, 838], cmd: 'none'},
  {xy: [2870, 838], cmd: 'none'},
  {xy: [2706, 838], cmd: 'none'},
  {xy: [2539, 838], cmd: 'none'},
  {xy: [2373, 838], cmd: 'none'},
  {xy: [2207, 838], cmd: 'none'},
  {xy: [2040, 838], cmd: 'none'},
  {xy: [1836, 873], cmd: 'submission_stop'}
]

const mega_to_submission_red = [
  // arrow
  {xy: [3176, 571], cmd: 'ada'},
  {xy: [1836, 873], cmd: 'submission_stop'}
]

const submission_gustav = [
  {xy: [1632, 875], cmd: 'gustav'},
  {xy: [604, 1169], cmd: 'lara_stop'}
]

const submission_webform = [
  {xy: [1633, 1058], cmd: 'none'},
  {xy: [1478, 1058], cmd: 'none'},
  {xy: [1309, 1058], cmd: 'none'},
  {xy: [1142, 1058], cmd: 'none'},
  {xy: [971, 1058], cmd: 'none'},
  {xy: [802, 1058], cmd: 'none'},
  // Lara
  {xy: [604, 1169], cmd: 'lara_stop'}
]

const submission_other = [
  {xy: [1638, 1244], cmd: 'none'},
  {xy: [1479, 1244], cmd: 'none'},
  {xy: [1310, 1244], cmd: 'none'},
  {xy: [1141, 1244], cmd: 'none'},
  {xy: [973, 1244], cmd: 'none'},
  {xy: [802, 1244], cmd: 'none'},
  // Lara
  {xy: [604, 1169], cmd: 'lara_stop'}
]

const viable_on_hold = [
  // arrow
  {xy: [309, 1332], cmd: 'none'},
  {xy: [303, 1489], cmd: 'none'},
  {xy: [303, 1657], cmd: 'none'},
  {xy: [303, 1827], cmd: 'none'},
  {xy: [303, 1997], cmd: 'none'},
  {xy: [303, 2158], cmd: 'none'},
  {xy: [467, 2158], cmd: 'none'},
  {xy: [631, 2158], cmd: 'none'},
  {xy: [798, 2158], cmd: 'none'},
  {xy: [970, 2158], cmd: 'none'},
  {xy: [970, 1997], cmd: 'none'},
  {xy: [970, 1827], cmd: 'none'},
  {xy: [1137, 1827], cmd: 'none'},
  {xy: [1304, 1837], cmd: 'none'},
  // MAMA STOP
  {xy: [1684, 1656], cmd: 'mama_stop'}
]

const ready_for_legal_assessment = [
  // arrow
  {xy: [468, 1330], cmd: 'none'},
  {xy: [465, 1485], cmd: 'none'},
  {xy: [465, 1657], cmd: 'none'},
  {xy: [465, 1827], cmd: 'none'},
  {xy: [465, 1997], cmd: 'none'},
  {xy: [631, 1997], cmd: 'none'},
  {xy: [798, 1997], cmd: 'none'},
  {xy: [798, 1827], cmd: 'none'},
  {xy: [798, 1657], cmd: 'none'},
  {xy: [970, 1657], cmd: 'none'},
  {xy: [1137, 1657], cmd: 'none'},
  {xy: [1301, 1656], cmd: 'none'},
  // MAMA STOP
  {xy: [1684, 1656], cmd: 'mama_stop'}
]

const viable = [
  // arrow
  {xy: [608, 1334], cmd: 'none'},
  {xy: [606, 1485], cmd: 'none'},
  {xy: [798, 1485], cmd: 'none'},
  {xy: [970, 1485], cmd: 'none'},
  {xy: [1137, 1485], cmd: 'none'},
  {xy: [1301, 1485], cmd: 'none'},
  // MAMA STOP
  {xy: [1684, 1656], cmd: 'mama_stop'}
]

const payout_blue = [
  // arrow
  {xy: [1859, 1567], cmd: 'none'},
  {xy: [2014, 1567], cmd: 'none'},
  {xy: [2189, 1567], cmd: 'none'},
  {xy: [2360, 1567], cmd: 'none'},
  {xy: [2528, 1567], cmd: 'none'},
  {xy: [2694, 1567], cmd: 'none'},
  {xy: [2864, 1567], cmd: 'none'},
  {xy: [2864, 1752], cmd: 'none'},
  {xy: [2611, 1766], cmd: 'payout_stop'},
]

const payout_green = [
  // arrow
  {xy: [1859, 1751], cmd: 'none'},
  {xy: [2014, 1751], cmd: 'none'},
  {xy: [2189, 1751], cmd: 'none'},
  {xy: [2360, 1751], cmd: 'none'},
  {xy: [2611, 1766], cmd: 'payout_stop'}
]

const palm_tree = [
  {xy: [3392, 2094], cmd: 'palm_tree'}
]


export const positions = {
  0: start_positions,
  1: start_to_mega,
  2: mega_to_submission_blue,
  3: mega_to_submission_red,
  4: submission_gustav,
  5: submission_webform,
  6: submission_other,
  7: viable_on_hold,
  8: ready_for_legal_assessment,
  9: viable,
  10: payout_blue,
  11: payout_green,
  12: palm_tree
}