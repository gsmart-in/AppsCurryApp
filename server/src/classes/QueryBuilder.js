'use strict';

import {createHiddenSheet} from './HiddenSheet.js';
import ColumnNames from './ColumnNames.js';

class QueryBuilder
{
	constructor(options, spreadsheet, sheet)
	{
		this.spreadsheet = spreadsheet;
		this.sheet = sheet;
		this.options = options;
		this.select_clause='';
		this.where_clause='';
	}
	select()
	{
		for (let i = 0; i < arguments.length; i++) 
		{
			this.select_clause += this._col_label(arguments[i])+',';
		}
		return this;
	}
	where(col_name,cmp, value)
	{
		if(typeof value === 'undefined')
		{
			value = cmp;
			cmp ='=';
		}
		this._append_where(col_name,cmp, value,'AND');
		
		return this;
	}
	orWhere(col_name,cmp, value)
	{
		if(typeof value === 'undefined')
		{
			value = cmp;
			cmp ='=';
		}
		this._append_where(col_name,cmp, value,'OR');
		return this;
	}
	_append_where(col_name,cmp, value, combine)
	{
		if(this.where_clause.length > 0)
		{
			this.where_clause += ' '+combine+' ';
		}
		this.where_clause +=  this._col_label(col_name) + cmp + make_value(value);
	}
	_col_label(col_name)
	{
		return this.options.column_names.getColLabel(col_name);
	}
	getSelectClause()
	{
		if(!this.select_clause || this.select_clause.length <= 0)
		{
			return('SELECT *');
		}

		this.select_clause = this.select_clause.replace(/[\,\s]+$/, '');//trim extra , or spaces

		return 'SELECT '+this.select_clause;
	}
	getWhereClause()
	{
		return 'WHERE '+ this.where_clause;
	}
	getQuery()
	{
		return this.getSelectClause()+' '+this.getWhereClause();
	}
	runQuery()
	{
		let qry = this.getQuery();
		console.log('runQuery qry',qry);
		let hidden_sheet = createHiddenSheet(this.spreadsheet, '_query_sheet');
		
		let last_col_label = this.options.column_names.getLastColLabel();

		console.log('runQuery last_col_label',last_col_label);
		
		let colref = "'"+this.sheet.getName()+"'!"+'A'+':'+last_col_label;

		console.log('runQuery colref',colref);

		let formula = `QUERY(${colref},${JSON.stringify(qry)}, 0)`; 

		console.log('runQuery formula',formula);

		let rows = hidden_sheet.runQuery(formula, 'A1');

		return rows;
	}
	getResultsJson()
	{
		return this.options.column_names.makeJson(this.runQuery());
	}

};

function make_value(val)
{
	if (typeof val === 'string' || val instanceof String)
	{
		return("'"+val+"'");
	}
	return val;
}


export default QueryBuilder;