# N4-E-Nagarpalika-Backend

A nice project with a nice description

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


---

## Install

    $ git clone https://github.com/USERNAME/n4-e-nagarpalika-backend
    $ cd n4-e-nagarpalika-backend
    $ npm install

## Configure app

Create a `.env` file in the project then  add the required params. You will need:

- AUTH_SECRET= 
- MONGODB_URI=
- NODE_ENV=
- PORT=
- WEB_URI=

create a data directory and add the firebase serviceAccount.json there

## Running the project on dev for better debug

    $ npm run dev

## Running the project on prod

    $ npm start

## Simple build for production

    $ npm build
---
###
### Authentication 
For better Authentication we are using both server jwt tokens and Firebase JWT tokens effectively.

---

##Tech Stack
We are using the below tech stack.
- Mongo For Database
- Express for routing
- GitHub Actions for CI/CD
- Google cloud run for backend Deployment
- Firebase for user Identity authentication and Serverside JWT token for authorization.
---