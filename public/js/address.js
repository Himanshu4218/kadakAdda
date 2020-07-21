function allLetter(inputtxt)
      { 
      var letters = /^[A-Za-z]+$/;
      for(var input of inputtxt){
        if(input.value.match(letters))
        {
        
        }
        else
        {
        alert('Please input only alphabet characters in Name and City');
        return false;
        } 
        return true;
      }
      
      }

      var form = $(".container-fluid form");
      form.on("submit",function(e){
          e.preventDefault();
          var obj = {
              country : $("#country").val(),
              fullname : $("#name").val(),
              street : $("#street").val(),
              houseNo : $("#houseNo").val(),
              pincode : $("#pincode").val(),
              city : $("#city").val(),
              state : $("#state").val()
          }
          var addAddress = firebase.functions().httpsCallable("addAddress");
          addAddress(obj).then(result => {
              form.reset();
              console.log("address added");
          }).catch(err => {
              console.log(err);
          });
          
      });
      
      $(".location").on('click', function(){
      
          if(navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
      
                  console.log(position);
                  axios.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false&key=AIzaSyCYcVMB-O29cZmQS49YcCdXmKgkoiPC_4o")
                  .then(function(data) {
                      console.log(data);
                  })
                  .catch(function(err){
                      console.log(err.message);
                  });
              });
      
          }
      
      })