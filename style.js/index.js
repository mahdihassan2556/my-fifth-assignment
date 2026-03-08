document.getElementById("btn-login").addEventListener("click", function(){
    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;
   
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value;

    if(username=='admin' && password=='admin123'){
        alert('Login successfull')
        window.location.assign("./home.html")
    }else{
        alert("login failed")
        return;
    }
})