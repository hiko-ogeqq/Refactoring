const assert = require('assert');
const js = require("../statement.js");
describe("印字テスト", () => {
  let invoices = require("../invoices.json");
  let plays = require("../plays.json");
  
  it("it", () => {
    var expectedResult = "Statement for BigCo\n"
                      + "  Hamlet: $650.00 (55 seats)\n"
                      + "  As You Like It: $580.00 (35 seats)\n"
                      + "  Othello: $500.00 (40 seats)\n"
                      + "Amount owned is $1,730.00\n"
                      + "You earned 47 credits\n";
    
    assert.equal(js.statement(invoices[0], plays), expectedResult);
  });
});
