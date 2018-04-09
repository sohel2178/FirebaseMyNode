var database = firebase.database();

var restaurentRef = database.ref('restaurents');

function addRestaurent(restaurentName){
    restaurentRef.push().set(
        {
            name:restaurentName,
            votes:0
        }
    )
    .then(()=>{
        window.location.reload();
        console.log("Restaurent Added SuccessFully");
        $('#restaurent_name').val("");
    })
    .catch((err)=>{
        console.log("Error",err);
    })

}

function getAllRestaurent(){
    restaurentRef.once('value')
        .then((snapshot)=>{
            console.log(snapshot.val());
        }).catch((err)=>{
            console.log(err);
        })
}


$(document).ready(()=>{
    $('#add_restautent').click(()=>{
        var restaurentName = $('#restaurent_name').val();

        if(restaurentName){
            addRestaurent(restaurentName);
        }else{
            alert("Enter Restaurent Name")
        }
    })

   /*  $('#get_restaurent').click(()=>{
        getAllRestaurent();
    }) */
})

function upvote(key){
    var ref =restaurentRef.child(key).child('votes')
    console.log(key);

    ref.once('value',(snapshot)=>{
        var vote = snapshot.val();
        vote++;

        ref.set(vote,(snapshot)=>{
            console.log(vote);
            window.location.reload();
        })
        
    })
}

function downvote(key){
    restaurentRef.child(key).child('votes')
    var ref =restaurentRef.child(key).child('votes')
    console.log(key);

    ref.once('value',(snapshot)=>{
        var vote = snapshot.val();
        vote--;

        ref.set(vote,(snapshot)=>{
            console.log(vote);
            window.location.reload();
        })
        
    })
}