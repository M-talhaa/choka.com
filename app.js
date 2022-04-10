//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const ejs = require("ejs");
const _= require("lodash");
const firebase = require("firebase");
const cookieParser = require('cookie-parser')
// import { FacebookAuthProvider } from "firebase/auth";
// require("firebase/firestore");
// import fire from "./fire";

const app = express();

const port = process.env.PORT || 3000

// allow the app to use cookieparser
// app.use(helmet());

// allow the app to use cookieparser
app.use(cookieParser());

app.set('view engine','ejs');

let global_user = ""

var firebaseConfig = {
    apiKey: "AIzaSyB5L-1mBbAzxi-bJwjvhCl_y4RyZ9LoZMk",
    authDomain: "choka-9acb9.firebaseapp.com",
    projectId: "choka-9acb9",
    storageBucket: "choka-9acb9.appspot.com",
    messagingSenderId: "243464704203",
    appId: "1:243464704203:web:c1fb5412fa39410e7b0b4e",
    measurementId: "G-RVRV9WH5CZ"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebase.firestore();
db.settings({timestampsInSnapshots:true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//////////Register user//////////

// app.use('/registrationRequest',(req, res, next)=>{
//     console.log("A new request received at " + Date.now());
//     console.log(req.query);
//     console.log(req.query["FirstName"])
//     if(req.query['Password']==req.query['ConfirmPassword']){
//         next();
//     }
//     else{
//         let str = "RegisterUser"
//         res.send("Passwords do not match");
//         //res.send("error")
        
//     }
    
//  });


//  app.post('/registrationRequest',(req, res, next)=>{
//     let request_object = req.body
//     console.log(request_object)
//     if(request_object["Email"] == ''){
//         res.send("Email cannot be empty");
//     }
//     if(request_object["FirstName"] == ''){
//         res.send("First name cannot be empty");
//     }

//     if(request_object["LastName"] == ''){
//         res.send("Last name cannot be empty");
//     }
//     if(request_object["PhoneNumber"] == ''){
//         res.send("Phone number cannot be empty");
//     }
//     if(request_object["Password"] == ''){
//         res.send("Password cannot be empty");
//     }

//     else{
//         console.log(request_object)

//         let new_user = {
//             "Name" : request_object["FirstName"] + " "+ request_object["LastName"],
//             "Email Address":request_object["Email"],
//             "Phone Number": request_object["PhoneNumber"],
//             "Password":request_object["Password"]


//         }
//         //res.send("Account Created")
//         if(request_object["type_account"]== 'student'){
//             let  usersRef = dbRef.child('Students');
//             res.render("home")
//             user_details = request_object
//             //push to db here
//             //set the varibale called document id as per what firebase assigns it

//         }
//         else{
//             let usersRef = dbRef.child('Teachers');
//             user_details = request_object
//             res.render("home")
//             //push to db here
//             //set the variable called document id as per what firebase assigns it
//         }
//     }
//  });





 app.post('/filter',(req,res)=>{


     res.render("filter")
 })

 app.post('/filterTutor',(req,res)=>{


    res.render("filterTutor")
})

app.get('/adminSearchProfile',(req,res)=>{


    // res.render("adminSearchProfile")
    let obj1 =  {'Name': 'Student1', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
    let obj2 =  {'Name': 'Student2', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
    let obj3 = {'Name': 'Student3', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
    let results_array = [
       obj1, obj2, obj3
       ]
   let ff = JSON.stringify(results_array)
   console.log(ff)
   let xx = {"bl":ff};
   //console.log(res)
   res.render("adminSearchProfile",xx)
})

app.get('/adminApproveProfile',(req,res)=>{


    // res.render("adminSearchProfile")
    let obj1 =  {'Name': 'Student1', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
    let obj2 =  {'Name': 'Student2', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
    let obj3 = {'Name': 'Student3', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
    let results_array = [
       obj1, obj2, obj3
       ]
   let ff = JSON.stringify(results_array)
   console.log(ff)
   let xx = {"bl":ff};
   //console.log(res)
   res.render("adminApproveProfile",xx)
})





app.post('/searchRequest',(req,res)=>{
     //when u get request to search for an object
     console.log("here")
     //u will have the search parameters stored in the body of the request
     ////search
     //3 results
     //then get all the relevnat details from firebase and get the search results in the form of an array
     let obj1 =  {'Name': 'Rose Dunhill', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
     let obj2 =  {'Name': 'William Jonas', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
     let obj3 = {'Name': 'Sherry', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
     let results_array = [
        obj1, obj2, obj3
        ]
    let ff = JSON.stringify(results_array)
    console.log(ff)
    let xx = {"bl":ff};
    //console.log(res)
    res.render("SearchResults",xx)

 })


 app.post('/searchRequestFromTutor',(req,res)=>{
    //when u get request to search for THE STUDENT IN THE STUDENTS' DB
    console.log("here")
    //u will have the search parameters stored in the body of the request
    ////search
    //3 results
    //then get all the relevnat details from firebase and get the search results in the form of an array
    let obj1 =  {'Name': 'Student1', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
    let obj2 =  {'Name': 'Student2', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
    let obj3 = {'Name': 'Student3', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
    let results_array = [
       obj1, obj2, obj3
       ]
   let ff = JSON.stringify(results_array)
   console.log(ff)
   let xx = {"bl":ff};
   //console.log(res)
   res.render("SearchResultsTutor",xx)

})





 app.post('/filterRequest',(req,res)=>{
     console.log(req.body)
    let obj1 =  {'Name': 'Rose Dunhill', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
    let obj2 =  {'Name': 'William Jonas', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
    let obj3 = {'Name': 'Sherry', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
    let results_array = [
       obj1, obj2, obj3
       ]
   let ff = JSON.stringify(results_array)
   console.log(ff)
   let xx = {"bl":ff};
   //console.log(res)
   res.render("SearchResults",xx)
     

 })

app.post('/filterFromTutor',(req,res)=>{
    let obj1 =  {'Name': 'Student1', 'Subject': 'Physics', 'Experience': '3', 'Rating':'4.0', 'Image': 'xx'}
    let obj2 =  {'Name': 'Student2', 'Subject': 'Sociology', 'Experience': '2', 'Rating':'1.0', 'Image': 'xx'}
    let obj3 = {'Name': 'Student3', 'Subject': 'English', 'Experience': '6', 'Rating':'4.0', 'Image': 'xx'}
    let results_array = [
       obj1, obj2, obj3
       ]
   let ff = JSON.stringify(results_array)
   console.log(ff)
   let xx = {"bl":ff};
   //console.log(res)
   res.render("SearchResultsTutor",xx)
     

})


////////////////////rendering login
app.post('/findTutors', (req,res)=>{
    //now u are supposed to get the top 3 tutors from database.
    //store the top 2 in top_2 variable that I am hardcoding for now

    let top_2 = 
        {
            "Name_one": "Esha Fatima",
            "Department_one": "Computer Science",
            "Name_two" : "Baqar",
            "Department_two" : "Islamic Studies",
            
    
        }

    res.render("findTutors", top_2)


})


app.post('/findStudents', (req,res)=>{
    //do a search from the databse and get the top 2 students liveing in the same city as thus particular tutor
    //store the name, department and the bidding price of the top 2 students living in the sam area as a json object like below
    let top_2_students = 
        {
            "Name_one": "Bastian",
            "Department_one": "Computer Science",
            "Bid_one" : "1000",
            "Name_two" : "Baqar",
            "Department_two" : "Islamic Studies",
            "Bid_two": "5000"
            
    
        }
        res.render("findStudents", top_2_students)

})


app.post('/loginRequest',(req,res)=>{
    
    //when received login request, check their password from firebase/
    //if the password is good to go 
    //go to dashboard page 
    //get all the firebase stuff and store it in a json object..the details
    console.log(req.body)
    let email = req.body["Email"]
    let password =  req.body["Password"]
    const docRef = db.collection('Students').doc(email);

    docRef.get().then((doc)=>{
        if(doc.exists){
            //then check the password from database
            console.log("User found");
            //console.log(doc.data());
            let user_deets = doc.data().jason_obj
            console.log(user_deets)
            if(user_deets.Password == password){
                //this means passwords match and
                console.log("Passwords match")
                let n_obj = {

                    "Name" :user_deets.Name,
                    "EmailAddress":user_deets.EmailAddress,
                    "PhoneNumber": user_deets.PhoneNumber,
                    "Password":user_deets.Password,
                    "Image":user_deets.Image,
                    "Address": user_deets.Address,
                    "City" : user_deets.City

                }
                global_user = n_obj;
                console.log(global_user)
                res.render("dashboard", global_user)

            }
            else{
                res.render("Login")
                console.log("Passwords do not match")
            }
            
        }
        else{
            
            const docRefTutor = db.collection('Teachers').doc(email);
            docRefTutor.get().then((doc)=>{
                if(doc.exists){
                    let user_deets = doc.data().jason_obj
                    console.log(user_deets)
                    //if it is tutor.
                    console.log("Tutor found")
                    if(user_deets.Password == password){
                         global_user = {
                            "Name" : user_deets.Name,
                            "EmailAddress":user_deets.EmailAddress,
                            "PhoneNumber": user_deets.PhoneNumber,
                            "Password":user_deets.Password,
                            "HighestQualification":user_deets.HighestQualification,
                            "BirthDay":user_deets.BirthDay,
                            "PreviousExperience":user_deets.PreviousExperience,
                            "Transcript":user_deets.Transcript,
                            "Image" : user_deets.Image,
                            "Address": user_deets.Address,
                            "City": user_deets.City

                        }
                        
                        res.render("tutorDashboard", global_user)
                    }
                    else{
                        console.log("Passwords do not match")
                        res.render("Login")
                    }

                    


                }
                else{
                    console.log("NOT FOUND")
                    res.render("Login")
                }
            })



        }
    });



    

    
   
});

app.post("/viewprofile",(req,res)=>{

    //get the details of the person who is logged in a json object and then send it to the frontend.
    //hardcodig it for now
    console.log("in vw")
    console.log(global_user)
    res.render("viewProfile",global_user)
})


app.post("/populateProfile",(req,res)=>{
    res.render("populateProfile")
})


app.post("/publishTutorProfile",(req,res)=>{
    res.render("publishProfile")
})



app.post("/populateProfileRequest",(req,res)=>{

    //in req.body get all details and store those
    //get the name of the banda who is logged in and create its json obj and store it in obj_extracted_from_db
    //like below
    //and then pass this and u will be redirected to dashboard
    let obj_extracted_from_db = {
        "name": "Esha Fatima",
        "image" : "xx",
        "documentID": "123"
    }
    

    res.render("dashboard", obj_extracted_from_db)
    //
    
})

app.post("/publishProfileRequest",(req,res)=>{

    //in req.body get all details and store those
    //get the name of the banda who is logged in and create its json obj and store it in obj_extracted_from_db
    //like below
    //and then pass this and u will be redirected to dashboard
    let obj_extracted_from_db = {
        "name": "Esha Fatima",
        "image" : "xx",
        "documentID": "123"
    }
    

    res.render("tutorDashboard", obj_extracted_from_db)
    //
    
})








app.post("/editProfile",(req,res)=>{
    //u will get the new attributes in req.body
    //do console.log(req.body)
    //these are the values from frontend
    //check each of these fields with THE ALREADY EXISTING VALUES and then update the values in db accordingly
    //then MAKE A NEW OBJECT WITH NEW VALUES OR ANY CHANGES AND STORE IT AS A JSON OBJ IN NEW OBJ
    // I am hardcoding new_obj for now
    //and then send new obj to frontend in the same format as i have hardcoded with any new or changed values
    console.log(req.body)
    let old_email = global_user['EmailAddress'];
    if(req.body['email'] != global_user['Email']){
        global_user['EmailAddress'] = req.body['email']

    }
    if(req.body['contact'] != global_user['PhoneNumber']){
        global_user['PhoneNumber'] = req.body['contact']

    }
    if(req.body['address'] != global_user['Address']){
        global_user['Address'] = req.body['address']

    }
    if(req.body['city'] != global_user['City']){
        global_user['City'] = req.body['city']

    }

    //let docRef = db.col lection('Teachers').doc(old_email);
    console.log("global user is", global_user)
    /*
    if(Object.keys(global_user).length==11){  
        //this means tutor hai
        console.log("issss ")
        docRef = db.collection('Teachers').doc(old_email);
        
    }
    */
    
    console.log("old email is ", old_email)
    // docRef.get().then((doc)=>{
        console.log("length is", Object.keys(global_user).length)
        if(Object.keys(global_user).length==12){

            db.collection('Teachers').doc(old_email).update({
                jason_obj:global_user
            }).then(()=>{
                console.log("firebase updated");
                res.render("viewProfile", global_user);
            });

        }
        else{
            db.collection('Students').doc(old_email).update({
                jason_obj:global_user
            }).then(()=>{
                console.log("firebase updated");
                res.render("viewProfile", global_user);
            });

        }
        
        //get the doc and then 
    // });





});




app.post("/login",(req,res)=>{
    
    res.render("Login");
   
});

 
///////Rendering home

app.get("/",(req,res)=>{
    console.log(1)
    
    res.render("home");
})

app.get("/home",(req,res)=>{
    console.log(2)
    res.render("home");
   
});

app.post("/home",(req,res)=>{

    console.log(3)
    if (req.body.home == "signin")
    {
        res.render("Login");
    }
    else
    {
        res.render("RegisterUser");
    }
    
});


app.post('/studentregistration',(req, res, next)=>{
    console.log(4)
    let request_object = req.body
    let email = request_object["Email"]

    let new_user = {
        "Name" : request_object["FirstName"] + " "+ request_object["LastName"],
        "EmailAddress":request_object["Email"],
        "PhoneNumber": request_object["PhoneNumber"],
        "Password":request_object["Password"],
        "Image":request_object["Image"],
        "Address": "None Added",
        "City" : "None Added"


    }

    global_user = new_user;

    const docRef = db.collection('Students').doc(email);
    docRef.get().then((doc)=>{
        if(doc.exists){
            console.log("User exists");
            res.redirect("/RegisterUser");
        }
        else{
            db.collection('Students').doc(email).set({
                jason_obj:new_user
            }).then(()=>{
                console.log("firebase filled");
                res.redirect("/home");
            });

        }
    });
});

app.post('/parentregistration',(req, res, next)=>{
    console.log(5)
    let request_object = req.body
    let email = request_object["Email"]

    let new_user = {
        "Name" : request_object["FirstName"] + " "+ request_object["LastName"],
        "EmailAddress":request_object["Email"],
        "PhoneNumber": request_object["PhoneNumber"],
        "Password":request_object["Password"],
        "HighestQualification":request_object["HighestQualification"],
        "BirthDay":request_object["BirthdayDay"]+"/"+request_object["BirthdayMonth"]+"/"+request_object["BirthdayYear"],
        "PreviousExperience":request_object["PreviousExperience"],
        "Transcript":request_object["Transcript"],
        "Image" : request_object["Image"],
        "Address": "None Added",
        "City": "None Added"
    }

    global_user = new_user

    const docRef = db.collection('Teachers').doc(email);
    docRef.get().then((doc)=>{
        if(doc.exists){
            console.log("User exists");
            res.redirect("/RegisterUser");
        }
        else{
            db.collection('Teachers').doc(email).set({
                jason_obj:new_user
            }).then(()=>{
                console.log("firebase filled");
                res.redirect("/home");
            });

        }
    });
});

// Save encryoted password
// Sing up
// Find Tutor

app.listen(port, '0.0.0.0', ()=>{ // '0.0.0.0' is for running via docker only
     console.log("Server has started on port 3000");
});
