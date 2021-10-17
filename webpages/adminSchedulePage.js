isTableValid = true;

LoadScheduleInfo();
let CurrentJsonData = undefined
async function LoadScheduleInfo() {
    try {
        let url = '/data/schedule';
         const response = await fetch(url);
        if (!response.ok)
          throw response;
        scheduleTable = document.getElementById("scheduleTable");
        scheduleTable.innerHTML = "";
        data = await response.json();
        console.log(data)
        CurrentJsonData = data;
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
        //console.log(col)
      
        rowHeader = scheduleTable.insertRow();
        cellHeader1 = rowHeader.insertCell();
        cellHeader1.innerHTML = "Week Days\Shift & Departments";
        cellHeader2 = rowHeader.insertCell();
        cellHeader2.innerHTML = "Shifts";
        cellHeader3 = rowHeader.insertCell();
        cellHeader3.innerHTML = "FB";
        cellHeader3.colSpan = 2;
        cellHeader4 = rowHeader.insertCell();
        cellHeader4.innerHTML = "AC";


        for (var i = 0; i < data.length; i++) {

            firstTr = scheduleTable.insertRow()     
            secondTr = scheduleTable.insertRow()

            //console.log(data[i][col[3]])
            var ColHeader = firstTr.insertCell(-1);
            ColHeader.innerHTML = data[i][col[0]];
            ColHeader.rowSpan=2;

            var ShiftText = firstTr.insertCell(-1);
            ShiftText.innerHTML = "1";
            for (var j = 1; j < 4; j++) {
                var colContent = firstTr.insertCell(-1);
                if(data[i][col[j]] == "Empty")
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
            ShiftText.innerHTML = "2";
            for (var k = 4; k < 7; k++) {
                var colContent = secondTr.insertCell(-1);
                if(data[i][col[k]] == "Empty")
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
                if(isSelectedCellValid(this.rowIndex, this.positionIndex))
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
        return false;   
    else if(rowIndex % 2 != 0 && colIndex == 1)
        return false;
    else
        return true;
    
}

function highlightSelectedCellColor(currentSelectedCell)
{
    if(currentSelectedCell != SelectedCell)
    {
        if(SelectedCell != undefined)
        {
            if(SelectedCell.innerText == "Empty")
                SelectedCell.style.backgroundColor = "orange";
            else
                SelectedCell.style.backgroundColor = "gainsboro";
        }
        currentSelectedCell.style.backgroundColor = "chartreuse";
    }
}

SelectedDay = undefined;
SelectedDepartment = undefined;
JsonPosition = undefined;
//Wrapper function since the some cells has colspan/rowspan
function getRowHeaderAndColHeaderText(table, rowIndex, colIndex)
{
    var dayLabel = document.getElementById("selectedDayLabel");
    var departmentLabel = document.getElementById("selectedDepartmentLabel");
    var shiftLabel = document.getElementById("selectedShiftLabel");
    /*
    Table Structure
    Row 1 => 0 1 2 3 4
    Row 2 =>   0 1 2 3
    */
    //For Row 2 in the same day
    if(rowIndex % 2 == 0)
    {
        SelectedDay = table.rows[rowIndex - 1].cells[0].innerText;
        //console.log(table.rows[rowIndex - 1].cells[0].innerText);
        dayLabel.innerHTML = SelectedDay;
        shiftLabel.innerHTML = "2";
        if(colIndex == 1)
        {
            console.log(colIndex)
            console.log(table.rows[0].cells[colIndex + 1].innerText);
            departmentLabel.innerHTML = table.rows[0].cells[colIndex + 1].innerText;
            SelectedDepartment = departmentLabel.innerHTML
        }
        else
        {
            //console.log(table.rows[0].cells[colIndex].innerText);
            departmentLabel.innerHTML = table.rows[0].cells[colIndex].innerText;
            SelectedDepartment = departmentLabel.innerHTML
        }

        if(SelectedDepartment == "AC")
        {
            JsonPosition = `${SelectedDepartment}2P1`
        }
        else 
        {
            JsonPosition = `${SelectedDepartment}2P${colIndex}`
        }
    }
    //For Row 1 in the same day
    else
    {
        SelectedDay = table.rows[rowIndex].cells[0].innerText;
        dayLabel.innerHTML = SelectedDay;
        shiftLabel.innerHTML = "1";
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

        if(SelectedDepartment == "AC")
        {
            JsonPosition = `${SelectedDepartment}1P1`
        }
        else 
        {
            JsonPosition = `${SelectedDepartment}1P${colIndex - 1}`
        }
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
     //console.log(data)
     // console.log(SelectedDepartment)
      availableNameDictionary= {}
      for (let i in data){
        
        if(data[i].Skill != SelectedDepartment && data[i].Skill != "GAS")
            continue;

        availableNameDictionary[data[i].UserName] = data[i].Skill;
        
      }
      console.log(availableNameDictionary)

      for(let name in availableNameDictionary)
      {
        if(IsUserWorkedTooLong(name, availableNameDictionary[name]))
            continue;
        
        let newUser = new Option(`${name}-${availableNameDictionary[name]}`);
    //     //console.log(newUser)
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

let JsonColIndex = undefined;
async function selectOnChangeEvent()
{
    userList = document.getElementById("userName");
    selectedUser = userList.options[userList.selectedIndex].text.split("-")[0];

    let colIndex = undefined;

    switch (JsonPosition)
    {
        case "FB1P1":
            colIndex = 1;
            break;
        case "FB1P2":
            colIndex = 2;
            break;        
        case "AC1P1":
            colIndex = 3;
            break;
        case "FB2P1":
            colIndex = 4;
            break;
        case "FB2P2":
            colIndex = 5;
            break;
        case "AC2P1":
            colIndex = 6;
            break;
    }
    console.log(JsonPosition)
    console.log(colIndex)
    JsonColIndex = colIndex;
    try
    {
        let url = `/data/updateSchedule?day=${SelectedDay}&position=${colIndex}&name=${selectedUser}`
        const response = await fetch(url);
        console.log("SelectedDay")
        if (!response.ok) 
          throw response;
        else
        {
            console.log("SelectedDay")
            LoadScheduleInfo();
        }
    }
    catch (e) {
        console.log(e);
    }

    console.log(SelectedDay)
    console.log(JsonPosition);
}


//Some bugs here since we only check 1 up and 1 down for weekdays, means there is 
//a risk 1 1 0 1 and code cannot detect the 2 days infront, need to improve the logic
function IsUserWorkedTooLong(name, skill)
{
    var col = [];
    for (var i = 1; i < CurrentJsonData.length; i++) {
        for (var key in CurrentJsonData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    for (var i = 0; i < CurrentJsonData.length; i++){
        //Step 1. Do Search in Current Day first
        if(CurrentJsonData[i].Day == SelectedDay){
            for(var j = 0; j < col.length; j++)
            {
                if(CurrentJsonData[i][col[j]] == name)
                {
                    return true;
                }
            }
        }

        //Step 2. If Current Day does not have the same name, proceed to neighbor days
        //Monday Case
        if(SelectedDay == "Monday" && CurrentJsonData[i].Day == SelectedDay)
        {
            let nameCount = 0
            for(var j = 0; j < col.length; j++)
            {        
                //Finding Tuesday
                if(CurrentJsonData[i + 1][col[j]] == name)
                {
                    nameCount++;
                }
                //Finding Wednesday
                if(CurrentJsonData[i + 2][col[j]] == name)
                {
                    nameCount++;
                } 
            }

            if(nameCount > 1)
                return true;

            return false;
        }

        //Sunday Case
        if(SelectedDay == "Sunday" && CurrentJsonData[i].Day == SelectedDay)
        {
            console.log(CurrentJsonData[i])
            let nameCount = 0
            for(var j = 0; j < col.length; j++)
            {        
                //Finding Sat
                if(CurrentJsonData[i - 1][col[j]] == name)
                {
                    nameCount++;
                }
                //Finding Fri
                if(CurrentJsonData[i - 2][col[j]] == name)
                {
                    nameCount++;
                } 
            }

            if(nameCount > 1)
                return true;

            return false;
        }

        //Step 3. Normal Cases
        if(CurrentJsonData[i].Day == SelectedDay)
        {
            console.log(CurrentJsonData[i])
            let nameCount = 0
            for(var j = 0; j < col.length; j++)
            {        
                //Finding Sat
                if(CurrentJsonData[i + 1][col[j]] == name)
                {
                    nameCount++;
                }
                //Finding Fri
                if(CurrentJsonData[i - 1][col[j]] == name)
                {
                    nameCount++;
                } 
            }

            if(nameCount > 1)
                return true;

            return false;
        }

        //Step 4. Check if working day exceed 5 days

    }
}