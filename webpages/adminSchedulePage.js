isTableValid = true;

LoadScheduleInfo();
async function LoadScheduleInfo() {
    try {
        let url = '/data/schedule';
         const response = await fetch(url);
        if (!response.ok)
          throw response;
        scheduleTable = document.getElementById("scheduleTable");
        data = await response.json();
        console.log(data)
        let msg = new Option("Please select a Cell first");
        userGroup = document.getElementById("userName");
        userGroup.options.add(msg);
        var col = [];
        for (var i = 1; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        console.log(col)
      
        for (var i = 0; i < data.length; i++) {

            firstTr = scheduleTable.insertRow()     
            secondTr = scheduleTable.insertRow()

            console.log(data[i][col[0]])
            var ColHeader = firstTr.insertCell(-1);
            ColHeader.innerHTML = data[i][col[0]];
            ColHeader.rowSpan=2;

            var ShiftText = firstTr.insertCell(-1);
            ShiftText.innerHTML = "Shift 1";
            for (var j = 1; j < 4; j++) {
                var colContent = firstTr.insertCell(-1);
                if(data[i][col[j]] == "Null")
                {
                    colContent.style.backgroundColor="orange";
                    isTableValid = false;
                }
                else
                {
                    colContent.style.backgroundColor="gainsboro";
                }

                colContent.innerHTML = data[i][col[j]];
            }

            var ShiftText = secondTr.insertCell(-1);
            ShiftText.innerHTML = "Shift 2";
            for (var k = 4; k < 7; k++) {
                var colContent = secondTr.insertCell(-1);
                if(data[i][col[k]] == "Null")
                {
                    colContent.style.backgroundColor="orange";
                    isTableValid = false;
                }
                else
                {
                    colContent.style.backgroundColor="gainsboro";
                }        

                colContent.innerHTML = data[i][col[k]];
            }
        }
    } 
    catch (e) {
        console.log(e);
    }
}

async function LoadUserName() {
    try {
      let url = '/data/userinfo';
       const response = await fetch(url);
      if (!response.ok)
        throw response;
      userGroup = document.getElementById("userName");
      data = await response.json();
      console.log(data)
      let msg = new Option("Please select one ...");
      userGroup.options.add(msg)
      for (let i in data){
        let newUser = new Option(data[i].UserName);
        userGroup.options.add(newUser)
      }
    } catch (e) {
      console.log(e);
    }
}

let isCurrentSelectedCellValid = true;
let SelectedCell = undefined;

function GetCellLocation()
{
    // Track onclicks on all td elements
    var table = document.getElementsByTagName("table")[0];

    // Get all the rows in the table
    var rows = table.getElementsByTagName("tr");
    console.log("col")
    for (var i = 0; i < rows.length; i++) {
        //Get the cells in the given row
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            cell.rowIndex = i;
            cell.positionIndex = j;
            cell.totalCells = cells.length;
            cell.totalRows = rows.length;
            cell.onclick = function () {
                //  console.log(`Selected Row Index: ${this.rowIndex}`)
                //  console.log(`Selected Col Index: ${this.positionIndex}`)
                console.log(table.rows[this.rowIndex].cells[this.positionIndex].innerText)
                isSelectedCellValid(this.rowIndex, this.positionIndex);
                if(isCurrentSelectedCellValid)
                {
                    getRowHeaderAndColHeaderText(table, this.rowIndex, this.positionIndex)
                    highlightSelectedCellColor(table.rows[this.rowIndex].cells[this.positionIndex]);
                    LoadUserName()
                    SelectedCell = table.rows[this.rowIndex].cells[this.positionIndex];
                }
            }
        }
    }
}

function isSelectedCellValid(rowIndex, colIndex)
{
    if(rowIndex == 0 || colIndex == 0)
        isCurrentSelectedCellValid = false;   
    else if(rowIndex % 2 != 0 && colIndex == 1)
        isCurrentSelectedCellValid = false;
    else
        isCurrentSelectedCellValid = true;
    
}

function highlightSelectedCellColor(currentSelectedCell)
{
    if(currentSelectedCell != SelectedCell)
    {
        if(SelectedCell != undefined)
        {
            if(SelectedCell.innerText == "Null")
                SelectedCell.style.backgroundColor = "orange";
            else
                SelectedCell.style.backgroundColor = "gainsboro";
        }
        currentSelectedCell.style.backgroundColor = "chartreuse";
    }
}

SelectedDepartment = undefined;
//Wrapper function since the some cells has colspan/rowspan
function getRowHeaderAndColHeaderText(table, rowIndex, colIndex)
{
    var dayLabel = document.getElementById("selectedDayLabel");
    var departmentLabel = document.getElementById("selectedDepartmentLabel");
    var shiftLabel = document.getElementById("selectedShiftLabel");
    isPostionValid = false;
    /*
    Table Structure
    Row 1 => 0 1 2 3 4
    Row 2 =>   0 1 2 3
    */
    //For Row 2 in the same day
    if(rowIndex % 2 == 0)
    {
        //console.log(table.rows[rowIndex - 1].cells[0].innerText);
        dayLabel.innerHTML = table.rows[rowIndex - 1].cells[0].innerText;
        shiftLabel.innerHTML = "Shift 2";
        if(colIndex == 1 || colIndex == 0)
        {
            //console.log(table.rows[0].cells[colIndex + 1].innerText);
            departmentLabel.innerHTML = table.rows[0].cells[colIndex + 1].innerText;
            SelectedDepartment = departmentLabel.innerHTML
        }
        else
        {
            //console.log(table.rows[0].cells[colIndex].innerText);
            departmentLabel.innerHTML = table.rows[0].cells[colIndex].innerText;
            SelectedDepartment = departmentLabel.innerHTML
        }
    }
    //For Row 1 in the same day
    else
    {
        dayLabel.innerHTML = table.rows[rowIndex].cells[0].innerText;
        shiftLabel.innerHTML = "Shift 1";
        if(colIndex > 2)
        {
            departmentLabel.innerHTML = table.rows[0].cells[colIndex - 1].innerText
            SelectedDepartment = departmentLabel.innerHTML
        }
            //console.log(table.rows[0].cells[colIndex - 1].innerText);
        else
        {
            departmentLabel.innerHTML = table.rows[0].cells[colIndex].innerText
            SelectedDepartment = departmentLabel.innerHTML
        }
            //console.log(table.rows[0].cells[colIndex].innerText);
        //console.log(table.rows[rowIndex].cells[0].innerText);
    }

    // console.log(`Row Header: ${rowIndex}`)
    // console.log(`Col header: ${colIndex}`)
}

async function LoadUserName() {
    try {
      let url = '/data/userinfo';
       const response = await fetch(url);
      if (!response.ok)
        throw response;
      userGroup = document.getElementById("userName");
      cleanDropDownList(userGroup);
      let msg = new Option("Please select from below");
      userGroup.options.add(msg)
      data = await response.json();
      console.log(data)
      console.log(SelectedDepartment)
      for (let i in data){
        console.log(data[i].Skill)
        if(data[i].Skill != SelectedDepartment && data[i].Skill != "GAS")
            continue;

        let newUser = new Option(data[i].UserName);
        console.log(newUser)
        userGroup.options.add(newUser)
      }
    } catch (e) {
      console.log(e);
    }
}

function cleanDropDownList(userGroup)
{
    var i, L = userGroup.options.length - 1;
    for(i = L; i >= 0; i--) {
        userGroup.remove(i);
    }
}


function selectOnChangeEvent()
{
    console.log("changed")
}