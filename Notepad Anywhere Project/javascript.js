function new_button(){

    document.getElementById("editor").value = "";
    document.getElementById("save_link").innerHTML = ""
    
}

function open_document(data){

    const r = new FileReader();
    r.readAsText(data.files[0]);

    r.onload = function() {
        document.getElementById("editor").value = r.result
    };
    r.onerror = function() {
        alert("Error: ", r.error);
    };

    document.getElementById("save_link").innerHTML = ""

}

function save_button(){

    let content = document.getElementById("editor").value;
    uriContent = "data:application/octet-stream," + encodeURIComponent(content);
    entered = prompt("Enter the name of file with extension\nEx: Hello.txt")
    document.getElementById("save_link").innerHTML = "<a href=" + uriContent + " download=" + entered + ">Click To Save</a>"
    //document.getElementById('save_link').click();
    //window.open(uriContent);
    // OK


















}
