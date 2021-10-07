LoadStaffInfo();


async function LoadStaffInfo() {
  console.log("fine")
    try {
      let url = '/userInfo/all';
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
        let url = '/userInfo/whole';
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
                colContent.innerHTML = data[i][col[j]];
            }

            var ShiftText = secondTr.insertCell(-1);
            ShiftText.innerHTML = "Shift 2";
            for (var k = 4; k < 7; k++) {
                var colContent = secondTr.insertCell(-1);
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

function GetCellLocation()
{
    // Track onclicks on all td elements
    var table = document.getElementsByTagName("table")[0];
    // Get all the rows in the table
    var rows = table.getElementsByTagName("tr");
    console.log("col")
    for (var i = 1; i < rows.length; i++) {
        //Get the cells in the given row
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            // if(j == 5)
            //     continue;
            // Cell Object

            var cell = cells[j];
            cell.rowIndex = i;
            cell.positionIndex = j;
            cell.totalCells = cells.length;
            cell.totalRows = rows.length;
            // Track with onclick
            //console.log(cell);

            cell.onclick = function () {
                console.log(this.rowIndex)
                console.log(this.positionIndex)
                console.log(table.rows[this.rowIndex].cells[this.positionIndex].innerText)
                //Get Selected Cell postion & It`s name inside
            };
        }
    }
}