LoadUserName();

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

function SubmitUserInfo()
{
  userNameList = document.getElementById("userName");
  if (userNameList.selectedIndex==0){
    alert("Invalid Selection")
    return;
  }
  
  selectedUserName = userNameList.options[userNameList.selectedIndex].text;

  window.location = `/mainPage.html#${selectedUserName}`;
  console.log(selectedUserName);
}
