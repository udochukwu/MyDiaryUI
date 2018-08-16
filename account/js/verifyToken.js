const token = localStorage.getItem('token');
// const token = 'tokedfdfdsgthrtvburbh67ubhjo876hj9j6756n';

console.log(token);
const fetchAllEntries = (token) => {
    // const url = 'https://nelson-diary.herokuapp.com/api/v1/entries';
    const url = 'http://localhost:8000/api/v1/entries';
    fetch(url, { method: 'GET', headers: { 'x-access-token':token,'Content-Type': 'application/json; charset=utf-8' }})
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            entriesCount.innerHTML = data.rowCount;
        }else{
            document.getElementById('body').innerHTML = "UNAUTHOIZED ACCESS";
        }
        // loader.style.display = "none";
    }).catch( (err) => {
        console.log('Request failed', err);
        // regText.innerHTML = 'Login';
    });
    };
    fetchAllEntries(token);