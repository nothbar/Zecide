const form = document.getElementById('logInForm');

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
  }

function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    var stat;
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target))
    }).then((resp) => {
        stat = resp.status;
        return resp.json(); 
    }).then((body) => {
        console.log(body);
        console.log(body.UserName);
        console.log(body._id);
        console.log(body.token);
        setCookie("UserName", body.UserName);
        setCookie("UserID", body._id);
        setCookie("token", body.token);
        
        if(stat==200){
                        window.location.pathname = '/posts/0';
                    }
                    else{
                        alert('Wrong Credentials!')
                    }
                

    }).catch((error) => {
        console.error(error);
    });
});


// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var username = form.elements[0].value;
//     var password = form.elements[1].value;
//     var stat;
//     var infoObject = { "UserName": username, "password": password };
//     var info = JSON.stringify(infoObject);
//     formData.append("user", info);
//     // formData = JSON.stringify(formData);
//     // console.log(JSON.parse(formData));
//     // console.log(typeof(formData))
//     fetch('http://localhost:8000/Users/login/', {
//         method: 'POST',
//         body: formData
//     }).then(function(response){
//         stat = response.status;
//         console.log(stat);
//         return response.json();
//     }).then(function(text){
//         console.log(text.user.UserName);
//         console.log(text.user._id);
//         console.log(text.user.token);
//         setCookie("UserName", text.user.UserName);
//         setCookie("UserID", text.user._id);
//         setCookie("token", text.user.token);

//         var usc = getCookie("UserName");
//         var uic = getCookie("UserID");
//         var tc = getCookie("token");

//         console.log(usc);
//         console.log(uic);
//         console.log(tc);

//         if(stat==200){
//             window.location.pathname = '/posts/0';
//         }
//         else{
//             alert('An error occured!')
//         }
//     }).catch(function(error){
//         // console.error(error);
//     })
// });