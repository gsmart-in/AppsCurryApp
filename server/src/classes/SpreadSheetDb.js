'use strict';

import {createHiddenSheet} from './HiddenSheet.js';
import ColumnNames from './ColumnNames.js';
import QueryBuilder from './QueryBuilder.js';

class SpreadsheetDB
{
	constructor(options)
	{
		this.spreadsheet =null;
		this.sheet=null;
		this.options={};
		this.defaults={
			header_row:1,
			column_names:null,
			source_url:null,
			id_column:'A'
		}	
		this.open(options);
	}

	open(options)
	{
		Object.assign(this.options, this.defaults, options);

		if(this.options.source_url)
		{
			this.spreadsheet = SpreadsheetApp.openByUrl(this.options.source_url);
			this.sheet = this.spreadsheet.getSheets()[0];
		}

		if(!this.options.column_names)
		{
			this.options.column_names = this.getHeaderRow();
		}

		this.options.column_names = new ColumnNames(this.options.column_names);

		this.query = new QueryBuilder(this.options, this.spreadsheet, this.sheet);
	}

	getLastColumn()
	{
		return this.sheet.getDataRange().getLastColumn();
	}

	getLastRow()
	{
		return this.sheet.getDataRange().getLastRow();
	}
	/* get the First Row with column headings */
	getHeaderRow()
	{
		return this.getRowValues(this.options.header_row);
	}
	getRowValues(row)
	{
		try
		{
			var range = this.sheet.getRange(row,1,1, this.getLastColumn());
			var rows = range.getValues();
			return rows[0];
		}
		catch(e)
		{
			return [];
		}
	}
	
	/*
	if @range is null, get the whole sheet of data in json format
	Note: this can be heavy if the sheet is large
	 */
	getDataJSON(range=null)
	{
		let datamx = [];
		let start=0;
		if(!range)
		{
			datamx = this.sheet.getDataRange().getValues();	
			start = this.options.header_row;
		}
		else
		{
			datamx = this.sheet.getRange(range).getValues();	
		}
		
		return(this.options.column_names.makeJson(datamx));
		/*let ret=[];
		for(let row= start; row<datamx.length; row++)
		{
			ret.push(this.options.column_names.makeJson(datamx[row]) );
		}
		return ret;*/
	}

	findRowById(id)
	{
		let column = this.options.id_column;
		 
		let formula = make_match_formula(id, column, this.sheet.getName());
		
		let hidden_sheet = createHiddenSheet(this.spreadsheet, '_search_sheet');
		let row = hidden_sheet.runFormula(formula, 'A1');
		return row;
	}

	getRowDataById(id)
	{
		let row = this.findRowById(id);
		
		let result = this.getDataJSON(row+':'+row);
		if(result && result.length)
		{
			if(result.length == 1)
			{
				return result[0];	
			}
		}
		return result;
	}
	
	update(id, col_name, col_value)
	{
		let row = this.findRowById(id);
		let col = this.options.column_names.getColNumber(col_name);

		if(row > 0 && col > 0)
		{
			this.sheet.getRange(row, col).setValue(col_value);
			return true;
		}
		return false;
	}
	insert(rec)
	{
		let row = this.options.column_names.jsonToRow(rec);
		this.sheet.appendRow(row);
		return true;
	}

}

export function make_match_formula(needle,col,sheet_name)
{
	let colref = "'"+sheet_name+"'!"+col+':'+col;
	let formula =`MATCH(${JSON.stringify(needle)}, ${colref}, 0)`; 

	return formula;
}

export default SpreadsheetDB;