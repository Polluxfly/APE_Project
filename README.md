# APE_Project
 Pu Tian`s APE Project

 Contacts:
 1. Phone: 82242734
 2. Email: polluxfly@outlook.com

This project has been developed and tested with Visual Studio Code.

Steps to test all functionalities for this project:
# 1. Initialization of this project
1. Downloaded Zip/Clone Project from Github, open folder in Visual Studio Code.
2. Open Terminal from Top bar, type in "npm install" to install all necessary packages.
3. After finished installation of packages, type in "npm start" to start local server.
4. Open Chrome browser, type in "http://localhost:8080/" to go to the entry point of this project - Login Page.

# 2. Login Page
1. The User Name dropdown list`s data is parsed from userInfo.json.
2. Prevent user did not select anything: click Submit Button while you did not select any user, you will see an alert to remind you to select a valid user.
3. Login as Admin user: Select "Admin" from dropdown list and click Submit button.
4. Login as Normal users: Select any user names other than "Admin" from dropdown list and click. Submit button

# 3. Main Page - Normal User
1. Users are able to Logout from current page by clicking Logout Button. - (Go back to #2)
2. Users are able to READ schedule table(data from publishedSchedule.json) & user list.
3. If schedule has been published by Admin, users will able to see their names been hightlighted on tables to help to locate which day/shift they are supposed to be working.
4. Welcome label are able to show user`s name based on selection from Login Page.

# 4. Main Page - Admin
1. Admin is able to add new users by clicking Manage users Button. - (Go to #5 Admin User Mgr Page)
2. Admin is able to modify/published table by clicking Arrange schedule Button.
3. Admin is able to Logout from current page by clicking Logout Button. - (Go back to #2)
4. Admin is able to READ schedule table(data from publishedSchedule.json) & user list.

# 5. Admin User Mgr Page
1. Admin is able to browse the user list. (from userInfo.json)
2. Prevent admin add new user without entering a name: an alert will be show up to remind admin.
3. Add new user:
    3. 1. Go to the bottom part of this page
    3. 2. Follow the steps indicated here:  Step 1. Please input Staff Name & Step 2. Please select trained Skill.
    3. 3. Click Add New Staff button
    3. 4. Page will be immediately refreshed and data stored into json file
4. Admin is able to back to main page by clicking Return to main page Button. - (Go back to #4)

# 6. Admin User Mgr Page
1. The schedule is pre-filled to convenient for those users who would like to test this project.
2. Admin is able to Reset whole shedule to empty table by clicking Reset Schedule Button.
# 6.1 
