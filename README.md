# Asclepia web app

## The project

As part of our advanced web development course (L3 Efrei Paris) we had to build a web application which subject was left free. The technical stack imposed was VueJs for the front and ExpressJs for the back end, all powered by NodeJs. 

We chose to recode in the form of web applications a management application for hospitals that we had developed the previous year as part of a cross-functional project. The application was initially in the form of a thick client (c++/qt) with a sqlite3 database. 

For this project the database has been redesigned and the functioning of the site rethought. 

## Install

To install the application and host it locally follow the steps below:

1. Open a terminal and git clone this project.

### Database

2. The database used is postgresql. The database export is in the folder exportBDD/ (.backup file). Just use the restore function of Postgres. 

3. Put your password and the name of the database. Make sure that the other database configuration settings in api.js match yours. 

### Server

4. This project requires a number of NodeJs modules. To install them you must have NodeJs and the npm utility.

5. Place yourself (with the terminal) at the root of the project. Use the `npm install` command to install all necessary modules.

The application is now ready to be used. The parameters related to the server and notably the port, protocol, etc. are in the executable node www. 

## Run

To start the application you just need to run the command `npm start` at the root of the project. 