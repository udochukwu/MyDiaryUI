
//when edit button is clicked make test-input editable
editBtn.onclick = function(e) {
    e.preventDefault();    
    document.getElementById("entryTitle").readOnly = false;
    document.getElementById("entryContent").readOnly = false;        
    document.getElementById("entryTitle").focus();                   
    document.getElementById("editBtn").style.display = "none";   
    document.getElementById("saveBtn").style.display = "block";                     
}

const saveBtn = document.getElementById("saveBtn");
saveBtn.onclick = function(e) {
    e.preventDefault();  
    document.getElementById("saveBtnText").innerHTML = "Please Wait...";                                                               
    const entryContent = document.getElementById("entryContent").value;
    const  entryTitle = document.getElementById("entryTitle").value;

    const details = {entryTitle, entryContent};
    console.log(details);

    const modifyEntry = (details) => {
    const token = localStorage.getItem('token');
    console.log(token);

    const url_string = window.location.href;
    const link = new URL(url_string);
    const entryId  = link.searchParams.get("entryId");
    const url = `https://nelson-diary.herokuapp.com/api/v1/entries/${entryId}`;
    // const url = `http://localhost:8000/api/v1/entries/${entryId}`;
    fetch(url, { method: 'PUT', headers: { 'x-access-token':token,'Content-Type': 'application/json; charset=utf-8'  }, body: JSON.stringify(details) })
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            document.getElementById("saveBtnText").innerHTML = "Save";                                                          
            document.getElementById("saveBtn").style.display = "none";   
            document.getElementById("editBtn").style.display = "block"; 
            document.getElementById("entryTitle").readOnly = true;    
            document.getElementById("entryContent").readOnly = true;  
        }else{
            document.getElementById("saveBtnText").innerHTML = "Save";                                                          
        }
    }).catch( (err) => {
        document.getElementById("saveBtnText").innerHTML = "Save";                                                          
        console.log('Request failed', err);
    });
    };
    modifyEntry(details);
}