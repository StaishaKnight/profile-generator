const fs = require('fs');

// Profiles of teammembers //
const Engineer=require ("./lib/Engineer")
const Manager=require ("./lib/Manager")
const Intern=require ("./lib/Intern")

const inquirer=require ("inquirer")
const path=require ("path")
const pathtodist=path.resolve(__dirname,"dist")
const filetodist=path.join(pathtodist,"team.html")

const generateteamhtml=require("./src/generateHTML")
const teammemberarray=[] 


//  Prompts //
function startapp (){
function addmanager (){
  inquirer.prompt([
    { type: "input",
      name: "manager_name",
      message: "Please enter the managers name"
    },
    { type: "input",
      name: "manager_id",
      message: "Please enter the managers id"
    },
    { type: "input",
      name: "manager_officenumber",
      message: "Please enter the managers office number"
    },
    { type: "input",
    name: "manager_email",
    message: "Please enter the managers email"
  },

  ]) .then (
     function (response) {
       teammemberarray.push(new Manager(response.manager_name, response.manager_id, response.manager_officenumber, response.manager_email))

       console.log (teammemberarray)

       addteammembers ()
     } 
  )
}
addmanager ()

function addteammembers (){
  inquirer.prompt([
    {
      type: "list",
      name: "addmember",
      message: "Which team member would you like to add",
      choices: ["Intern", "Engineer", "Manager", "None of the above"]
    }
  ]) .then (function(response){
    if(response.addmember==="Intern"){
      addintern()
    }
    else if (response.addmember==="Engineer"){
      addengineer ()
    }
    else if (response.addmember==="Manager"){
      addmanager ()
    }
    else if (response.addmember==="None of the above"){
      buildteamcard ()
    }

    function addintern (){
      inquirer.prompt([
        { type: "input",
          name: "intern_name",
          message: "Please enter the Intern name"
        },
        { type: "input",
          name: "intern_id",
          message: "Please enter the Intern id"
        },
        { type: "input",
          name: "intern_officenumber",
          message: "Please enter the intern office number"
        },
        { type: "input",
        name: "intern_email",
        message: "Please enter the intern School"
      },
    
      ]) .then (
         function (response) {
           teammemberarray.push(new Intern(response.intern_name, response.intern_id, response.intern_officenumber, response.intern_email))
    
           console.log (teammemberarray)
    
           addteammembers ()
         } 
      )
    }
  
    function addengineer (){
      inquirer.prompt([
        { type: "input",
          name: "engineer_name",
          message: "Please enter the engineer name"
        },
        { type: "input",
          name: "engineer_id",
          message: "Please enter the engineer id"
        },
        { type: "input",
          name: "engineer_officenumber",
          message: "Please enter the engineer office number"
        },
        { type: "input",
        name: "engineer_email",
        message: "Please enter the engineer GitHub"
      },
    
      ]) .then (
         function (response) {
           teammemberarray.push(new Engineer(response.engineer_name, response.engineer_id, response.engineer_officenumber, response.engineer_email))
    
           console.log (teammemberarray)
    
           addteammembers ()
         } 
      )
    }

  })
}

function buildteamcard(){
  fs.writeFileSync(filetodist, generateteamhtml(teammemberarray), "UTF-8",err => {
    if (err) throw err;
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });  
}

}
startapp()




  