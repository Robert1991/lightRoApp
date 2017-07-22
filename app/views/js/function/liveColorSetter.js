function update(jscolor) {
    document.getElementById("colorRect").style.backgroundColor = jscolor;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

        }
    };
    xhttp.open("GET", "/device/?device=" + "test" + "&set_live_color=" + jscolor, true);
    xhttp.send();
}