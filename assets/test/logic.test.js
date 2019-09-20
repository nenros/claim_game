import {expect} from "chai";
import {positions, init_state, next_state} from "../js/logic.js";


describe("logic", function() {
  it("first test", function() {
    expect(1).to.equal(1);
  });

  it("show postitions", function() {
    expect(positions).to.equal([]);
  });
  
  it("init_state", function() {
    expect(init_state()).to.equal({
      position: {x:467, y:390},
      path: 0,
      step: 0,
      cube: null
    })
  });

  it("next_state", function() {
    const state = init_state()
    const new_state = next_state(state)
    expect(new_state).to.equal({
      position: {x:467, y:390},
      path: 0,
      step: 0,
      cube: null
    })
  });
});