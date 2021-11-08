# APE_Project
 Pu Tian`s APE Project
 Github url: https://github.com/Polluxfly/APE_Project

 Contacts:
 1. Phone: 82242734
 2. Email: polluxfly@outlook.com

-----------------------------------SPLIT---------LINE-----------------------------------------------
# Unfinshed Features 
1. Display block-out columns in schedule due to Covid Situation: This is becauseat initial i did not notice that I should add those columns to the table as well. When i realized it, I have finished function to parse data from json and fill up to each cell inside table, also due to I used colspan & rowspan in html, it will be extremly hard for me to add them back.

# Future planning
1. Auto fillup schedule: I would like to develop a function to pre-fill the schedules and allow admin to view & modify, this will greatly save the time for admin to start from a new blank schedule.

2. CRUD operations on user management system: For now admin only able to add new users but not able to modfiy/delete a user, if I have more time i would like to add this feature.

3. Login System: It is super risky for now to just let user select user name then login, i would like to design a system to require user input password and do verification to avoid possible security risk.

4. Better UI: This is the first time i write a whole web project! I wish i can have more modern UI design but i have no time to make it becomes true :( 

-----------------------------------SPLIT---------LINE-----------------------------------------------

This project has been developed and tested with Visual Studio Code.
# 0. Structure of the project
This APE project`s structure as following
- data folder
    - emptySchedule.json -> json file containing empty data to reset schedules

    - publishedSchedule.json -> json file used to store schedule data, all users can read the data but only Admin can modify it.

    - schedule.json -> json file used by admin to save the temporary schedule, after admin fill up all the data field, admin can perform "Publish" operation to transfer data to publishedSchedule.json, this file already pre-filled to convenient users who want to test it.

    - userInfo.json -> contains pre-filled user information data. All users can read the data from it but only admin can perform "Add new user" operation.

    - week_1 & _2.json -> Past week schedules for admin to read it.

    - version_<fileId>.json -> This file only visible to admin users, it will be generated with schedule.json`s data when Admin perform "Save Version" action, fileId will be increased if Admin saved multiple versions. It will be deleted after admin Published a schedule.

- webpages folder
    - adminSchedulePage.html/js -> contains the html & js code for the Admin to perform CRUD operations to following Schedule data files:
        1. schedule.json - Read, Update & Delete
        2. version_<fileId>.json - Create & Read & Delete
        3. week_1 & _2.json - Read
        4. publishedSchedule.json - Update
        5. userInfo.json - Read

    - adminUserMgrPage.html/js -> contains the html & js code for the Admin to perform add New user operation to userInfo.json .

    - loginPage.html/js -> contains the code for user to select their user name to login.

    - mainPage.html/js -> contains the code for users to read the schedule & user list, log out and admin functionalities for admin users.

    - mainStyle.css -> css file used by all html pages.

    - utils.js -> router js to communicate & perform CRUD operations between js and json data.

-----------------------------------SPLIT---------LINE-----------------------------------------------

Steps to test all functionalities for this project:
# 1. Preparation & Initialization of this project
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
3. If schedule has been published by Admin, users will able to see their names been highlighted on tables to help to locate which day/shift they are supposed to be working. - Indivisual time table
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
    3. 2. Follow the steps indicated here:  "Step 1. Please input Staff Name & Step 2. Please select trained Skill".
    3. 3. Click Add New Staff button
    3. 4. Page will be immediately refreshed and data stored into json file
4. Admin is able to back to main page by clicking Return to main page Button. - (Go back to #4)

# 6. Admin Schedule Page
1. The schedule.json is pre-filled to convenient for those users who would like to test this project.
2. Admin is able to back to Main Page by clicking "Return to Main Page" button.

# 6.1 Admin Schedule Page - Modify Schedule
1. Select any cells under FB & AC columns (Only the cells under these columns consider valid cells), you will see the cell selected has been highlighted.
2. Go to the bottom of the web page, you will see the data under "Step 1. Please Select Cell in table above" is changing with your selection of valid cells.
3. Select drop down list from "Step 2. Please Select User in dropdown list to replace Cell" to expand it.
4. The Name & Department show up in dropdown list already been filtered & fulfilled with rules below indicated in assignment:
    a. Employees cannot work on both shift in the same day.
    b. Employees who worked for 2 consequent days within a week must have a rest day after that.
    c. Employees may work less than 5 days in a week.
    d. Only skill matched employees can be assigned to the corresponding group.
5. Select Name from dropdown list, the table will be immediately refresh will the updated data, also the data has been sent to json file(schedule.json)
6. If the dropdown list only left Empty, means there is no available employees to deploy, admin might need to re-arrange the employees from recent days.
7. Admin is able to click "Reset Schedule" button to clean all the data in Schedule.json
8. Admin is able to according to the Reference Table at bottom to identify the color of department in table.

# 6.2 Admin Schedule Page - Allow the planner a “view only” option for older versions of work copies
1. Select the dropdown list after Label "Select Previous Week to review:"
2. Select week_1 or week_2, you will see the schedule table`s content has changed based on selection.
3. After selection of older version work copies, table is not allow to edit anymore.
4. Click "Main Version" button to go back to the current schedule that you are editing.

# 6.3 Admin Schedule Page - Save the work copy with version control
1. Admin is able to save the version copy by clicking Save "Current Version" button.
2. After clicked button, browser will pop up an alert to remind user the version file has been successfully created & saved.
3. Modify some cells in schedule to differentiate with version files.
4. Select the dropdown list after Label "Select Saved Version to continue".
5. In the dropdown list you will see the version_<fileId>, click it to load the version schedule.
6. Click "Main Version" button to go back to current schedule.

# 6.4 Admin Schedule Page - Publish Schedule to all users
1. If Admin did not fill up all the cells then click "Publish Schedule" button, browser will popup an alert to remind user to fill up all cells first.
2. After Admin filled up all cells and click "Publish Schedule" button, browser will popup an confirm to remind Admin the publish operation will do following:
    a. Publish data from schedule.json to publishedSchedule.json
    b. Clean all data in schedule.json
    c. Remove all version_<fileId>.json
3. After Admin clicked "OK" button, an alert will popup to remind admin the schedule has been published, and back to the Main Page.
4. The Schedule in main page has been udpated with published schedule.
