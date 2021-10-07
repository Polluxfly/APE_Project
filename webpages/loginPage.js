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

function SubmitUserInfo()
{
  res
  console.log("hitted");
}

