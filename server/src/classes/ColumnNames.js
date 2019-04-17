'use strict';
class ColumnNames
{
	constructor(column_names)
	{
		this.column_names = column_names;
	}

	getColNumber(name)
	{
		for(let c = 0; c < this.column_names.length;c++)
		{
			if(this.column_names[c] == name)
			{
				return c+1;
			}
		}
		return 0;
	}
	makeJsonOneRow(row)
	{
		let rec = { };
		for(let col=0; col < row.length; col++ )
		{
			rec[this.column_names[col]] = row[col];
		}
		return rec;
	}
	makeJson(datamx,start=0)
	{
		let ret=[];
		for(let row = start; row < datamx.length; row++)
		{
			ret.push(this.makeJsonOneRow(datamx[row]) );
		}
		return ret;
	}
	
	getColLabel(name)
	{
		return col_number_to_label(this.getColNumber(name));
	}

	getLastColLabel()
	{
		return col_number_to_label(this.column_names.length);
	}
	jsonToRow(rec)
	{
		let row = []
		for(let c = 0; c < this.column_names.length;c++)
		{
			if(typeof rec[this.column_names[c]] !== 'undefined')
			{
				row.push(rec[this.column_names[c]] );
			}
			else
			{
				row.push('');	
			}
		}
		return row;
	}

};

export function col_number_to_label(num)
{
	var str='';
	//num--; //0 is not A; 1 is A
	while(num > 0)
	{
		let rem = (num-1) % 26;
		num = Math.floor((num-1)/26);
		str = String.fromCharCode(65+rem) + str;
	}
	return str;
}

export default ColumnNames;