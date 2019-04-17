
class HiddenSheet
{
	constructor(spreadsheet, name)
	{
		this.create(spreadsheet, name);
	}
	create(spreadsheet, name)
	{
		this.sheet = spreadsheet.getSheetByName(name);
		if(!this.sheet)
		{
			this.sheet = spreadsheet.insertSheet();
			this.sheet.setName(name);
		}
		this.sheet.hideSheet();	
		return this;
	}
	runFormula(formula, cell_addr)
	{
		this.sheet.getRange(cell_addr).setFormula('='+formula);
		
		return this.sheet.getRange(cell_addr).getValue();
	}
	runQuery(formula,cell_addr)
	{
		this.sheet.getRange(cell_addr).setFormula('='+formula);
		return this.sheet.getDataRange().getValues();	
	}
}

export function createHiddenSheet(spreadsheet, name)
{
	let hsheet = new HiddenSheet(spreadsheet, name);
	return hsheet;
}

export default HiddenSheet;