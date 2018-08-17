window.onload = function() {
    let editBtn = document.getElementById("editBtn");   

    //Hide side bar on click
    navClsBtn.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "none";
    }

    //display side bar on click
    bars.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "block";
    }
    


}