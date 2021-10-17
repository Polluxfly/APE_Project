let currentUser = undefined;
UpdateHeaderText()
function UpdateHeaderText()
{
    var name = window.location.href.split("#")[1];
    if (name == undefined || name == "")
    {
        window.location = "/loginPage.html"
        alert("Please select an user to login");
    }

    currentUser = name;
    headerText = document.getElementById("headerText");
    headerText.innerHTML = `Good Day ${name}! Please view the schedule below`
}

CheckAdminAccess()
function CheckAdminAccess()
{
    if (currentUser != "Admin")
    {
        scheduleBtn = document.getElementById("scheduleBtn");
        manageBtn = document.getElementById("manageBtn");

        scheduleBtn.style.display = "none";
        manageBtn.style.display = "none";
    }
}

LoadStaffInfo();
async function LoadStaffInfo() {
  console.log("fine")
    try {
      let url = '/data/userinfo';
       const response = await fetch(url);
      if (!response.ok)
        throw response;
      staffTable = document.getElementById("staffTable");
      data = await response.json();
      console.log(data)
      let msg = new Option("Please select one ...");

    var col = [];
    for (var i = 1; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    console.log(col)

    for (var i = 1; i < data.length; i++) {

        tr = staffTable.insertRow(-1)
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    } catch (e) {
      console.log(e);
    }
}

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
        let msg = new Option("Please select one ...");
  
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
                if(currentUser == data[i][col[j]])
                {
                    colContent.style.backgroundColor="yellow";
                }
                else
                {
                    colContent.style.backgroundColor="grey";
                }

                colContent.innerHTML = data[i][col[j]];
            }

            var ShiftText = secondTr.insertCell(-1);
            ShiftText.innerHTML = "Shift 2";
            for (var k = 4; k < 7; k++) {
                var colContent = secondTr.insertCell(-1);
                if(currentUser == data[i][col[k]])
                {
                    colContent.style.backgroundColor="yellow";
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

function IsTableValid()
{
    // Track onclicks on all td elements
    var table = document.getElementsByTagName("table")[0];
    // Get all the rows in the table
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        //Get the cells in the given row
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            // Cell Object
            var cell = cells[j];
            cell.rowIndex = i;
            cell.positionIndex = j;
            cell.totalCells = cells.length;
            cell.totalRows = rows.length;
            // Track with onclick
            //console.log(cell);

            cell.onclick = function () {
                console.log(table.rows[this.rowIndex].cells[this.positionIndex].innerText)
                //Get Selected Cell postion & It`s name inside
            };
        }
    }
}



let currentSelectedCell = undefined;
let currentSelectedCellColor = undefined;

function TableOnClickHighlighter(selectedCell)
{
    selectedCell.style.backgroundColor = "yellow"
    if(selectedCell != currentSelectedCell)
    {
        currentSelectedCell.style.backgroundColor = currentSelectedCellColor;
    }
    if (selectedCell.style.backgroundColor != "yellow")
    {
        selectedCell.style.backgroundColor == "yellow"
    }
    
}
