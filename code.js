//We need to install the npm module @mailchimp/mailchimp_marketing.
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS and images
app.use(express.static("public"));

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/login.html");
});

//Setting up MailChimp
mailchimp.setConfig({
//replace with your api key
 apiKey: "5418e0183e3063d2aadec08e000b26aa-us10",
//replace with last us-XX from api key
 server: "us10"
});


app.post("/", function (req,res) {

//change the values to according to your input attributes in html
const firstName = req.body. firstName;
const secondName = req.body.lastName;
const email = req.body.email;

//Your list/audience id
const listId = "86a285ca4d";

//Creating an object with the users data
const subscribingUser = {
 firstName:  firstName,
 lastName: secondName,
 email: email
};

//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser. firstName,
 LNAME: subscribingUser.lastName
}
});

//If all goes well logging the contact's id
 res.sendFile(__dirname + "/successPage.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
//If anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failurePage.html"));
});




app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});






//86a285ca4d.

//5418e0183e3063d2aadec08e000b26aa-us10
//
//
//

//
//
//
//
// });



//unic id=86a285ca4d
