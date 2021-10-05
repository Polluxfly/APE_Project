LoadUserName();

async function LoadUserName() {
  console.log("fine")
    try {
      let url = '/userInfo/all';
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
 
  
function GetCellLocation()
{
    // Track onclicks on all td elements
    var table = document.getElementsByTagName("table")[0];
    // Get all the rows in the table
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        //Get the cells in the given row
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 1; j < cells.length; j++) {
            if(j == 5)
                continue;
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


function SubmitUserInfo()
{

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