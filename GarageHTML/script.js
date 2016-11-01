// JavaScript source code
var Garages = [];

if (window.attachEvent) {
    window.attachEvent('onload', loadscript);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function (evt) {
            curronload(evt);
            loadscript(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = loadscript;
    }
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function loadMovies() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                ParseMovies(this);
                //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "objects.xml", true);
    xmlhttp.send();
}

function ParseMovies(xml) {
    var xmlDoc = xml.responseXML;
    var garageNodes = xmlDoc.getElementsByTagName("Garage");
    //console.log(garageNodes[0]);
    for (var i = 0; i < garageNodes.length; i++) {
        for (var j = 0; j < garageNodes[i].getElementsByTagName("Vehicle").length; j++) {
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Type").toString().match(/\.(.*)/)[1].toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Color").toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Wheels").toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("RegNr").toString());
        }
        
        
        //Garages.push(new Garage(garageNodes[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue.toString().trim(),
        garageNodes[i].getElementsByTagName("Date")[0].childNodes[0].nodeValue.toString().trim(),
        garageNodes[i].getElementsByTagName("Discreption")[0].childNodes[0].nodeValue.toString().trim(),
        garageNodes[i].getElementsByTagName("Link")[0].childNodes[0].nodeValue.toString().trim()));

    }
    LoadPage();
}



function LoadPage() {
    for (var i = 0; i < movies.length; i++) {
        document.getElementById("movieselectdropdown").innerHTML += "<div id=\"button" + i + "\" class=\"button movieButton\">" + movies[i].title + "</div>";
    }

    for (var i = 0; i < movies.length; i++) {

    }

    var buttons = document.getElementsByClassName("movieButton");
    for (b in buttons) {
        if (buttons.hasOwnProperty(b)) {
            buttons[b].addEventListener("click", function () {
                setHTMLtoMovie(this.id);
            }, false);
        }
    }
    document.getElementById("movieTitle").innerHTML = movies[0].title;
    document.getElementById("movieDate").innerHTML = movies[0].date;
    document.getElementById("movieDiscription").innerHTML = movies[0].disctiption;
    document.getElementById("movieYoutube").setAttribute("src", movies[0].link);
}

function loadscript() {
    loadMovies();
    
};

function setHTMLtoMovie(id) {
    var i = id.match(/[^a-z]/g);

    removeClass(document.getElementById("content"), 'unfade');
    addClass(document.getElementById("content"), 'fade');

    setTimeout(function () {
        document.getElementById("movieTitle").innerHTML = movies[i].title;
        document.getElementById("movieDate").innerHTML = movies[i].date;
        document.getElementById("movieDiscription").innerHTML = movies[i].disctiption;
        document.getElementById("movieYoutube").setAttribute("src", movies[i].link);
    }, 250);

    setTimeout(function () {
        removeClass(document.getElementById("content"), 'fade');
        addClass(document.getElementById("content"), 'unfade');
    }, 500);
}

function Garage(type, size, name, vehicles) {
    this.type = type;
    this.size = size;
    this.name = name;
    this.vehicles = vehicles;
}

function movie(title, date, discription, link) {
    this.title = title;
    this.datee = new Date(date);
    this.date = this.datee.getFullYear() + " " + monthNames[this.datee.getMonth()] + " " + this.datee.getDate();
    console.log(this.date);
    this.disctiption = discription;
    this.link = link;
};

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}