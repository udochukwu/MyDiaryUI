let loginForm = document.getElementById("loginForm");

loginForm.onsubmit = function(event) {
    // regForm.encoding = "application/x-www-form-urlencoded";
    event.preventDefault();
    logText.innerHTML = 'please Wait..';
    loginError.style.display = "none";
    loginSuccess.style.display = "none";
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let details = {email, password};
    console.log(details);

    const loginUser = (details) => {
    const url = 'https://nelson-diary.herokuapp.com/api/v1/auth/login';
    // const url = 'http://localhost:8000/api/v1/auth/login';
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("token",data.token);
                loginSuccess.innerHTML = 'Redirecting.....';
                loginSuccess.style.display = "block";
                window.location.replace('account/index.html'); 
            } else {
                loginError.innerHTML = 'Sorry! No Web Storage support';
                loginError.style.display = "block";
            }
        }else{
            logText.innerHTML = 'Login';
            let errorList = '<ul>';
            if(data.errors.email){
                errorList += `<li>${data.errors.email}</li>`
            }
            if(data.errors.password){
                errorList += `<li>${data.errors.password}</li>`
            }
            errorList += `</ul>`;
            loginError.innerHTML = errorList;
            loginError.style.display = "block";
        }
        loader.style.display = "none";
    }).catch( (err) => {
        console.log('Request failed', err);
        regText.innerHTML = 'Login';
    });
    };
    loginUser(details);

    // When the user clicks anywhere outside of the modal, close the modals
    window.onclick = function(event) {
        if (event.target == loginModal) {
            registerModal.style.display = "block";
        }
    } 

}