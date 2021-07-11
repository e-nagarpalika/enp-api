# N4-E-Nagarpalika-Backend

`e-NagarPalika` app is created with the sole intention of helping people log, track and resolve their grievances effectively. For a detailed overview of our project please find the required artifacts in the [google drive](https://drive.google.com/drive/folders/1m65N-1Ti4YkbAydtNGISgpeh_c-oXefx).

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node(14 and above)
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

    $ npm --version

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


---

## Install

    $ git clone https://github.com/USERNAME/n4-e-nagarpalika-backend
    $ cd n4-e-nagarpalika-backend
    $ npm install

## Configure app

Create a `.env` file in the project root directory then  add the required params which you can get from `.env.sample`  file in the root diectory.

Create a data directory and add the firebase serviceAccount.json there

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