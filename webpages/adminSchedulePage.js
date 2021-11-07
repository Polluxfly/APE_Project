isTableValid = true;
userDictionary = {};
pastWeekSchedulesList = {};
let isPreviousVersionNow = false;

let CurrentJsonData = undefined
InitializeSchedule()
async function InitializeSchedule()
{

    LoadUserName(true);
    try {
        let url = '/data/parseSchedule?fileName=schedule.json';
         const response = await fetch(url);
        if (!response.ok)
          throw response;
        data = await response.json();
        console.log(data)
        CurrentJsonData = data;
        let msg = new Option("Please select a Cell first");
        userGroup = document.getElementById("userName");
        cleanDropDownList(userGroup);
        userGroup.options.add(msg);

        if(isPreviousVersionNow)
        {
            isPreviousVersionNow = false;
            console.log("really");
        }

        LoadScheduleInfo(data)
    }
    catch (e) {
        console.log(e);
    }
}


function LoadScheduleInfo(data) {  
    isTableValid = true;
    console.log(isPreviousVersionNow)
    if(isPreviousVersionNow)
    {
        document.getElementById("functionDiv1").style.display="none";
        document.getElementById("functionDiv2").style.display="none";
    }

    try {
        scheduleTable = document.getElementById("scheduleTable");
        scheduleTable.innerHTML = "";
        console.log(data)

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
                    colContent.style.backgroundColor="gainsboro";
                    isTableValid = false;
                }
                else if(userDictionary[data[i][col[j]]] == "FB")
                {
                    colContent.style.backgroundColor="skyblue";
                }
                else if(userDictionary[data[i][col[j]]] == "AC")
                {
                    colContent.style.backgroundColor="orange";
                }
                else if(userDictionary[data[i][col[j]]] == "GAS")
                {
                    colContent.style.backgroundColor="greenyellow";
                }

                colContent.innerHTML = data[i][col[j]];
            }

            var ShiftText = secondTr.insertCell(-1);
            ShiftText.innerHTML = "2";
            for (var k = 4; k < 7; k++) {
                var colContent = secondTr.insertCell(-1);
                if(data[i][col[k]] == "Empty")
                {
                    colContent.style.backgroundColor="gainsboro";
                    isTableValid = false;
                }
                else if(userDictionary[data[i][col[k]]] == "FB")
                {
                    colContent.style.backgroundColor="skyblue";
                }
                else if(userDictionary[data[i][col[k]]] == "AC")
                {
                    colContent.style.backgroundColor="orange";
                }
                else if(userDictionary[data[i][col[k]]] == "GAS")
                {
                    colContent.style.backgroundColor="greenyellow";
                }      

                colContent.innerHTML = data[i][col[k]];
            }
        }
    } 
    catch (e) {
        console.log(e);
    }
}

getPastWeekSchedules()
async function getPastWeekSchedules(){
    try
    {
        let url = '/data/pastSchedules';
        const response = await fetch(url);
        if (!response.ok)
            throw response;
        selectedWeek = document.getElementById("selectedWeek");
        cleanDropDownList(selectedWeek)
        let msg = new Option("Please select from below")
        selectedWeek.options.add(msg)
        data = await response.json();
        console.log(data)

        for(let i in data)
        {
            fileName = data[i].split('.')[0]
            newOption = new Option(fileName)
            selectedWeek.options.add(newOption)
        }

    }
    catch (e) {
        console.log(e);
    }
}

getVerionSchedules()
async function getVerionSchedules(){
    try
    {
        let url = '/data/versionSchedules';
        const response = await fetch(url);
        if (!response.ok)
            throw response;
        versionSelection = document.getElementById("versionSelection");
        cleanDropDownList(versionSelection)
        let msg = new Option("Please select from below")
        versionSelection.options.add(msg)
        data = await response.json();
        console.log(data)

        for(let i in data)
        {
            fileName = data[i].split('.')[0]
            newOption = new Option(fileName)
            versionSelection.options.add(newOption)
        }

    }
    catch (e) {
        console.log(e);
    }
}


let SelectedCell = undefined;

function GetCellLocation()
{
    let isCellOnclicked = false;
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
                if(!isCellOnclicked && isSelectedCellValid(this.rowIndex, this.positionIndex))
                {
                    getRowHeaderAndColHeaderText(table, this.rowIndex, this.positionIndex)
                    highlightSelectedCellColor(table.rows[this.rowIndex].cells[this.positionIndex]);
                    LoadUserName(false)
                    SelectedCell = table.rows[this.rowIndex].cells[this.positionIndex];
                    isCellOnclicked = true;
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

let dumpColor = undefined
function highlightSelectedCellColor(currentSelectedCell)
{
    if(currentSelectedCell != SelectedCell)
    {
        if(SelectedCell != undefined)
        {
            if(SelectedCell.innerText == "Empty")
                SelectedCell.style.backgroundColor = "gainsboro";
            else
                SelectedCell.style.backgroundColor = dumpColor;
        }
        dumpColor = currentSelectedCell.style.backgroundColor
        console.log(dumpColor)
        currentSelectedCell.style.backgroundColor = "yellow";
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

async function LoadUserName(isFirstRefresh) {
    try {
      let url = '/data/userinfo';
       const response = await fetch(url);
      if (!response.ok)
        throw response;
      userGroup = document.getElementById("userName");
      cleanDropDownList(userGroup);
      let msg = new Option("Please select from below");
      let emptyUser = new Option("Empty");
      userGroup.options.add(msg)
      userGroup.options.add(emptyUser)
      data = await response.json();
    
      console.log(data)
      if(isFirstRefresh)
      {
        for (let i in data)
        {
            if(data[i].UserName == "Admin")
                continue;
            userDictionary[data[i].UserName] = data[i].Skill; 
        }
        return;
      }

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

async function CleanSchedule()
{
    if(confirm("Do you really want to RESET the whole shedule?"))
    {
        try{
            let url = `/data/restSchedules`
            const response = await fetch(url);
            if (!response.ok) 
              throw response;
            else
            {        
                data = await response.json();
                LoadScheduleInfo(data);
            }
        }
        catch (e) {
            console.log(e);
        }
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
            data = await response.json()
            CurrentJsonData = data
            LoadScheduleInfo(data);
        }
    }
    catch (e) {
        console.log(e);
    }

    console.log(SelectedDay)
    console.log(JsonPosition);
}

async function onRefreshSchedule(selection)
{
    console.log(selection)
    selectionList = document.getElementById(`${selection}`);
    if(selectionList.selectedIndex == 0)
    {
        return;
    }

    if(selection == "selectedWeek")
    {
        anotherSelectionList = document.getElementById('versionSelection');
        anotherSelectionList.selectedIndex = 0;
    }
    else
    {
        anotherSelectionList = document.getElementById('selectedWeek');
        anotherSelectionList.selectedIndex = 0;
    }

    isPreviousVersionNow = true;

    selectedItem = `${selectionList.options[selectionList.selectedIndex].text}.json`;
    try
    {
        let url = `/data/parseSchedule?fileName=${selectedItem}`
        const response = await fetch(url);
        if (!response.ok) 
          throw response;
          
        else
        {        
            data = await response.json();
            LoadScheduleInfo(data);
        }
    }
    catch (e) {
        console.log(e);
    }

}

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

    console.log(name) 
    for (var i = 0; i < CurrentJsonData.length; i++){
        //Step 1. Do Search in Current Day first
        if(CurrentJsonData[i].Day == SelectedDay){
            for(var j = 0; j < col.length; j++)
            {
                if(CurrentJsonData[i][col[j]] == name)
                {
                    console.log("Case 1") 
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
            console.log("Case 2") 
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
            console.log("Case 3") 
            if(nameCount > 1)
                return true;

            return false;
        }

        //Step 3. Normal Cases
        if(CurrentJsonData[i].Day == SelectedDay)
        {
            let beforeSelectedDay = 0
            let afterSelectedDay = 0
            let neighborBefore = false;
            let neighborAfter = false;
            for(var j = 0; j < col.length; j++)
            {        
               // console.log(CurrentJsonData[i + 1][col[j]])

                //Finding 1 day after 
                if(CurrentJsonData[i - 1][col[j]] == name)
                {
                    //console.log(`${name} 1 day before`)  
                    beforeSelectedDay++;
                    neighborBefore = true;
                }
                if(i - 2 >= 0 && CurrentJsonData[i - 2][col[j]] == name)
                {
                    //console.log(`${name} 2 day before`) 
                    beforeSelectedDay++;
                } 
    
                if(beforeSelectedDay > 1)
                {
                    //console.log(`${name} Case 4`)  
                    return true;
                }

                //Finding 1 day before
                if(CurrentJsonData[i + 1][col[j]] == name)
                {
                    //console.log(`${name} 1 day after`)  
                    afterSelectedDay++;
                    neighborAfter = true
                }
                if(i + 2 < col.length && CurrentJsonData[i + 2][col[j]] == name)
                {
                    //console.log(`${name} 2 day after`)  
                    afterSelectedDay++;
                }

                if(afterSelectedDay > 1)
                {
                    return true;
                }

                if(neighborAfter && neighborBefore)
                {
                    return true;
                }

            }
            //console.log(`${name} Case 7`) 
            return false;
        }
    }
}

function IsScheduleValid()
{
    if(isTableValid)
    {
        if(confirm("Are you sure you want to publish current table? \nOnce you submitted The current edited schedule will be cleaned"))
        {
            PublishSchedule();
            alert("Schedule Published!");
        }
    }
    else
        alert("Schedule has not been fully fill-up, please try again after you finished schedule!")
}

async function PublishSchedule()
{
    try
    {
        let url = `/data/publishSchedules`
        const response = await fetch(url);
        if (!response.ok) 
          throw response;
        else
        {        
            data = await response.json();
            document.location.reload(true)
        }
    }
    catch (e) {
        console.log(e);
    }

}

async function PublishVersionFile()
{
    try
    {
        let url = `/data/saveSchedules`
        const response = await fetch(url);
        if (!response.ok) 
          throw response;
        else
        {        
            data = await response.json();
            document.location.reload(true)
        }
    }
    catch (e) {
        console.log(e);
    }

}