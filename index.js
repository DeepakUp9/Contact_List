const express=require('express');

//joining the path
const path=require('path');

const port=8000;


//connecting mongoose.js  //include that file
const db=require('./config/mongoose');

//connecting contact.js //include that file
const Contact=require('./models/contact');



const app=express();


//setting ejs engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middleware form data decoding 
app.use(express.urlencoded());


//include the static files using middleware
app.use(express.static('assets'));




var  contactList=[
     
    {
        name:"Deepak",
        phone:"111111111"

    },
    {
        name:"Tony Stark",
        phone:"1234567890"

    },
    {
        name:"rahul",
        phone:"23543534"
    },

    {
        name:"David",
        phone:"3556667723"
    },

    {
        name:"Krishna",
        phone:"9999999999"
    }

]

//controller and route using the get
app.get('/',function(req,res){


    Contact.find({},function(err,contacts){
          if(err){
              console.log('Error in fetching contacts from db');
              return;
          }


          return res.render('home',{
        
            titile: "My  Contacts List",

            contact_List:contacts


    });



//     Contact.find({name:"sanjay"},function(err,contacts){
//         if(err){
//             console.log('Error in fetching contacts from db');
//             return;
//         }


//         return res.render('home',{
      
//           titile: "My  Contacts List",

//           contact_List:contacts


//   });


      





    
    // return res.render('home',{
        
    // titile: "My  Contacts List",

    // contact_List:contactList



});
  

});






//another controller and route using the get
app.get('/play',function(req,res){

    return res.render('practice',{

        titile:'Let us play with ejs'
    });

});


////controller and route using the post
app.post('/create-contact',function(req,res){
 
 //contactList.push(req.body);

 Contact.create({

    name:req.body.name,
    phone:req.body.phone

 },function(err,newContact){
     if(err){
        console.log('error in creating a contact!');
        return;
     }
    
     console.log("*********",newContact);

     return res.redirect('back');

 });


});


// delete contact to setup raoute and controller using get 
//query param
//for  deleting a contact
//get the query from the url 
app.get('/delete-contact',function(req,res){
     
      //get the id from query in the url

      let id =req.query.id;

      //find the contact in the database using id  and delete
      Contact.findByIdAndDelete(id,function(err){
             if(err){
                 console.log('error in deleting an object from the database');
                 return;
             }

         
  
             return res.redirect('back');

      });





    // let phone=req.query.phone;

    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');



});



app.listen(port,function(err){

    if(err){
        console.log('Error in  running  the server',err);
    }

    console.log("yup! My Express Server is running on Port:",port);

});