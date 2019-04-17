const chai = require("chai");
const expect = chai.expect;
import ColumnNames from '../src/classes/ColumnNames.js';
import {col_number_to_label} from '../src/classes/ColumnNames.js';

describe("ColumnNames tests", function() 
{
	it("converts column names to number",function()
	{
		let col_names = new ColumnNames(['id', 'name', 'Department', 'Role']);

		expect(col_names.getColNumber('id')).to.equal(1);

		expect(col_names.getColNumber('Department')).to.equal(3);

		expect(col_names.getColNumber('department')).to.equal(0);
	});
    it("converts Col Number to Label", function()
	  {
	  	let label = col_number_to_label(1);
	  	expect(label).to.equal("A");

	  	let label25 = col_number_to_label(25);
	  	expect(label25).to.equal("Y");

	  	let label26 = col_number_to_label(26);
	  	expect(label26).to.equal("Z");

		let label27 = col_number_to_label(27);
	  	expect(label27).to.equal("AA");

	  	let label28 = col_number_to_label(28);
	  	expect(label28).to.equal("AB");

	  	let label53 = col_number_to_label(53);
	  	expect(label53).to.equal("BA");

	  	let label54 = col_number_to_label(54);
	  	expect(label54).to.equal("BB");

	  	let label702 = col_number_to_label(702);
	  	expect(label702).to.equal("ZZ");

	  	let label703 = col_number_to_label(703);
	  	expect(label703).to.equal("AAA");

	  	let label704 = col_number_to_label(704);
	  	expect(label704).to.equal("AAB");
	  });

    it("makes JSON from a row", function()
	  {
	  	let col_names = new ColumnNames(['id', 'name', 'Department', 'Role']);

	    let row = [1123, 'Joseph Pilates', 'Pilates', 'HOD'];

	    expect(col_names.makeJsonOneRow(row)).to.deep.equal(
	    	{ id:1123, name:'Joseph Pilates', Department:'Pilates',Role:'HOD'   });

	  });
	it("creates row from JSON", function()
    {
		let col_names = new ColumnNames(['id', 'name', 'Department', 'Role']);

		let rec=
		{
			id:123,
			name:'Samuel Johnson',
			Department:'mydept',
			Role:'HOD'
		};

		expect(col_names.jsonToRow(rec)).to.deep.equal([123,'Samuel Johnson','mydept','HOD']);

    });

    it("creates row from JSON with empty values", function()
    {
		let col_names = new ColumnNames(['id', 'name', 'Department', 'Role']);

		let rec={
		Department:'mydept',
		Role:'HOD'
		};

		expect(col_names.jsonToRow(rec)).to.deep.equal(['','','mydept','HOD']);

    });

});