firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in. Show appropiate elements for signed in user and vice-versa.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){
      // Change elements for signed in user.
    var email_id = user.email;
    document.getElementById("user_para").innerHTML = "Welcome " + email_id;
	  document.getElementById("home_para").innerHTML = "Welcome back to CollegeChef™. Click the button below to start cooking.";
	  document.getElementById("home_btn").innerHTML = "Get Cooking";
	  document.getElementById("home_btn").href = "#loggedin";
    document.getElementById("home_head").innerHTML = "Welcome Back";

    }

  } else {
    // No user is signed in. Display appropriate elements.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("loggedin").style.display = "none";

  }
});

function login(){

  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
	  location.replace("home.html");
	})
	.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function resetPassword(){
  var userEmail = document.getElementById("inputEmail").value;
  firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
    // Email sent.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  }).catch(function(error) {
    // An error happened.
    var errorMessage = error.message;
	  
	  window.alert("Error : " + errorMessage);
  });
}

function create_account(){
	var userEmail = document.getElementById("inputEmail").value;
	var userPass = document.getElementById("inputPassword").value;
		
	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
		verify_email();
	})
	.catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  
	  window.alert("Error : " + errorMessage);

		// ...
  
});
}

//Log user out and refresh page to diplay correct elements
function logout(){
  firebase.auth().signOut();
  location.reload();
}

function verify_email(){
	var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}
