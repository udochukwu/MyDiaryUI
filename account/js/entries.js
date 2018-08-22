const token = localStorage.getItem('token');
// const token = 'tokedfdfdsgthrtvburbh67ubhjo876hj9j6756n';

console.log(token);
const fetchAllEntries = (token) => {
    const url = 'https://nelson-diary.herokuapp.com/api/v1/entries';
    // const url = 'http://localhost:8000/api/v1/entries';
    fetch(url, { method: 'GET', headers: { 'x-access-token':token,'Content-Type': 'application/json; charset=utf-8' }})
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if(data.success){
            var table_rows = '';
            for (x in data.entries) {
                var entryTitle = data.entries[x].entrytitle;
                var entryContent = data.entries[x].entrycontent; 
                var entryId = data.entries[x].entryid;  
                var dateTime = data.entries[x].datetime;                                                 
                table_rows+= `<tr>
                                <td>
                                    <h4><a href="entry.html?entryId=${entryId}">${entryTitle}</a></h4>                          
                                    <p>${entryContent}</p>
                                    <small>${dateTime}</small>
                                </td>
                                <td><a class="deleteBtn" href="#${entryId}" id='${entryId}'><i class="far fa-trash-alt"></i></a></td>
                             </tr>`;
            }
            entriesBody.innerHTML = table_rows;
            var anchors = document.getElementsByClassName("deleteBtn");
            for (var i = 0, length = anchors.length; i < length; i++) {
              var anchor = anchors[i];
              anchor.addEventListener('click', function(e) {
                  e.preventDefault();  
                  console.log(this.getAttribute('id'));
                  const entryId = this.getAttribute('id');
                  deleteEntry(entryId);
              }, true);
            };
        }else{
            document.getElementById('body').innerHTML = "UNAUTHOIZED ACCESS";
        }
        // loader.style.display = "none";
    }).catch( (err) => {
        console.log('Request failed', err);
        // regText.innerHTML = 'Login';
    });
    };
    const deleteEntry = (entryId) => {
        const token = localStorage.getItem('token');
        console.log(token); 
        console.log(entryId);
        const url = `https://nelson-diary.herokuapp.com/api/v1/entries/${entryId}`;
        // const url = `http://localhost:8000/api/v1/entries/${entryId}`;
        fetch(url, { method: 'DELETE', headers: { 'x-access-token':token,'Content-Type': 'application/json; charset=utf-8'  } })
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if(data.success){
                console.log('success');
                fetchAllEntries(token);
            }else{
                console.log('not success');
            }
        }).catch( (err) => {
            console.log('Request failed', err);
        }); 
    }
    fetchAllEntries(token);