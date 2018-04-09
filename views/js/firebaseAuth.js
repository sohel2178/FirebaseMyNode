function checkIfLoggin(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(user);
        $('#google_image').attr('src',user.photoURL);
        $('#display_name').html(user.displayName);
        $('#google_email').html(user.email);
        $('#google_sign_in').addClass('my-class');
        $('#google_sign_in').removeClass('visible-class');
        $('#sign_out').addClass('visible-class');
        $('#sign_out').removeClass('my-class');
        } else {
          // No user is signed in.
          $('#display_name').html("");
          $('#google_email').html("");
          $('#google_image').attr('src',"");
          $('#google_sign_in').addClass('visible-class');
          $('#google_sign_in').removeClass('my-class');
          $('#sign_out').addClass('my-class');
          $('#sign_out').removeClass('visible-class');
        }
      });

}




function signInWithGoogle(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(result=>{
            checkIfLoggin();
        })
        .catch(err=>{
            console.log(err);   
        });
}

$(document).ready(()=>{
    checkIfLoggin();
    $('#google_sign_in').click(()=>{
        signInWithGoogle();
       
    })

    $('#sign_out').click(()=>{

        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            checkIfLoggin();
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        
    })
})

