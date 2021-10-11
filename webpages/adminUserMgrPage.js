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

function AddNewUser()
{
    console.log(2)
    userName = document.getElementById("staffNameBox").value
    console.log(userName)
    skillList = document.getElementById("skillOption")
    selectedSkill =  skillList.options[skillList.selectedIndex].text;
    console.log(`${userName} + ${selectedSkill}`)
}