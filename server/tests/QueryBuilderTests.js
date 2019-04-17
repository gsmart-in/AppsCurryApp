import QueryBuilder from '../src/classes/QueryBuilder.js';
import ColumnNames from '../src/classes/ColumnNames.js';
const chai = require("chai");
const expect = chai.expect;

describe("QueryBuilder tests", function() 
{
  it("makes simple where formula", function() 
  {
  	 let options = {
  	 		column_names: new ColumnNames(['id','name','email'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 qbuilder.where('name','Jake');
  	 
  	 expect(qbuilder.getWhereClause()).to.equal("WHERE B='Jake'");
  });

 it("makes where formula with AND", function() 
  {
  	 let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 qbuilder.where('name','Jake').where('id', 111).where('age','<',30);
  	 
  	 expect(qbuilder.getWhereClause()).to.equal("WHERE B='Jake' AND A=111 AND D<30");
  });

it("makes where formula with OR", function() 
  {
  	 let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 qbuilder.where('name','Jake').orWhere('id', 111).orWhere('age','<',30);
  	 
  	 expect(qbuilder.getWhereClause()).to.equal("WHERE B='Jake' OR A=111 OR D<30");
  });
	
  it("makes a simple select clause", function() 
  {
  		let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 qbuilder.select('name');

  	 expect(qbuilder.getSelectClause()).to.equal("SELECT B");
  });

  it("makes a select clause with multiple arguments", function() 
  {
  		let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 qbuilder.select('name', 'id', 'email');

  	 expect(qbuilder.getSelectClause()).to.equal("SELECT B,A,C");
  });

  it("makes an empty select clause", function() 
  {
  	let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);

  	 expect(qbuilder.getSelectClause()).to.equal("SELECT *");
  });

  it("makes full query with simple where", function() 
  {
  	let options = {
  	 		column_names: new ColumnNames(['id','name','email','age'])
  	 };
  	 let qbuilder  = new QueryBuilder(options);
  	 qbuilder.where('name','Jake');
  	 expect(qbuilder.getQuery()).to.equal("SELECT * WHERE B='Jake'");
  });
  
});