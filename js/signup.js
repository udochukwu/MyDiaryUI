let signupForm = document.getElementById("signupForm");
const loader = document.getElementById("loader-div");

signupForm.onsubmit = function(event) {
    // regForm.encoding = "application/x-www-form-urlencoded";
    event.preventDefault();
    loader.style.display = "block";
    regText.innerHTML = 'please Wait..';
    signupError.style.display = "none";
    signupSuccess.style.display = "none";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let details = {email, password, confirmPassword};
    console.log(details);

    const registerUser = (details) => {
    const url = 'https://nelson-diary.herokuapp.com/api/v1/auth/signup';
    // const url = 'http://localhost:8000/api/v1/auth/signup';
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("token",data.token);
                signupSuccess.innerHTML = 'Redirecting.....';
                signupSuccess.style.display = "block";
                window.location.replace('account/index.html'); 
            } else {
                signupError.innerHTML = 'Sorry! No Web Storage support';
                signupError.style.display = "block";
            }
        }else{
            regText.innerHTML = 'Register';
            let errorList = '<ul>';
            if(data.errors.email){
                errorList += `<li>${data.errors.email}</li>`
            }
            if(data.errors.password){
                errorList += `<li>${data.errors.password}</li>`
            }
            if(data.errors.confirmPassword){
                errorList += `<li>${data.errors.confirmPassword}</li>`
            }
            errorList += `</ul>`;
            signupError.innerHTML = errorList;
            signupError.style.display = "block";
        }
        loader.style.display = "none";
    }).catch( (err) => {
        console.log('Request failed', err);
        regText.innerHTML = 'Register';
    });
    };
    registerUser(details);

    // When the user clicks anywhere outside of the modal, close the modals
    window.onclick = function(event) {
        if (event.target == registerModal) {
            registerModal.style.display = "block";
        }
    } 

}