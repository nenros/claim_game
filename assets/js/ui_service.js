export const ui_service = {
  move: function({x, y}) {
    for(var i = 0; i < 300000000; ++i) {}
    console.log(x + ' ' + y);
  }
};
