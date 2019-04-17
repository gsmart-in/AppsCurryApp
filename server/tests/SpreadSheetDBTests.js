import {make_match_formula} from '../src/classes/SpreadSheetDb.js';
const chai = require("chai");
const expect = chai.expect;

describe("SpreadSheetDB tests", function() 
{
  it("makes match formula", function() 
  {
  	let formula = make_match_formula('552425', 'A', 'Sheet1');
  	
    expect(formula).to.equal('MATCH("552425", \'Sheet1\'!A:A, 0)');
  });

  
});