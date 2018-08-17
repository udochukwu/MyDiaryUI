const token = localStorage.getItem('token');

console.log(token);
const fetchEntryById = (token) => {

    const url_string = window.location.href;
    const link = new URL(url_string);
    const entryId  = link.searchParams.get("entryId");
    console.log(entryId);

    const url = `https://nelson-diary.herokuapp.com/api/v1/entries/${entryId}`;
    // const url = `http://localhost:8000/api/v1/entries/${entryId}`;
    fetch(url, { method: 'GET', headers: { 'x-access-token':token,'Content-Type': 'application/json; charset=utf-8' }})
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            const entryTitle = data.entries[0].entrytitle; 
            const entryContent = data.entries[0].entrycontent; 
            const dateTime = data.entries[0].datetime; 


            document.getElementById('entryTitle').value = entryTitle;
            document.getElementById('entryContent').value = entryContent;
            document.getElementById('dateTime').innerHTML = dateTime;

        }else{
            // document.getElementById('body').innerHTML = "UNAUTHOIZED ACCESS";

        }
    }).catch( (err) => {
        console.log('Request failed', err);
        // regText.innerHTML = 'Login';
    });
};
fetchEntryById(token);


