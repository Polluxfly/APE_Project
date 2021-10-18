LoadStaffInfo();
async function LoadStaffInfo() {
  console.log("fine")
    try {
      let url = '/data/userinfo';
       const response = await fetch(url);
      if (!response.ok)
        throw response;
      staffTable = document.getElementById("staffTable");
      staffTable.innerHTML = "";
      data = await response.json();
      console.log(data)

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
              if(data[i][col[j]] == "FB")
              {
                tabCell.style.backgroundColor="skyblue";
              }
              else if(data[i][col[j]] == "AC")
              {
                tabCell.style.backgroundColor="orange";
              }
              else if(data[i][col[j]] == "GAS")
              {
                tabCell.style.backgroundColor="greenyellow";
              }      
          }
      }

    } catch (e) {
      console.log(e);
    }
}

async function AddNewUser()
{
    userName = document.getElementById("staffNameBox").value
    if(userName == undefined || userName == "")
    {
      alert("Please input valid user name");
      return;
    }
    skillList = document.getElementById("skillOption")
    selectedSkill =  skillList.options[skillList.selectedIndex].text;

    try{
      let url = `/data/addUser?name=${userName}&skill=${selectedSkill}`;
      const response = await fetch(url);
      if (!response.ok) 
        throw response;
      else
      {
        LoadStaffInfo();
      }
    }
    catch (e) {
      console.log(e);
    }
}

