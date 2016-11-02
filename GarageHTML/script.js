// JavaScript source code
var Garages = [];
var Vehicles = [];
var OldHeight = $("#Home1").height();
var OldWidth = $("#Home1").height();
var scrolledTo = 'Home';
var rtime;
var timeout = false;
var delta = 200;
var selectedLot = null;
var lotsCount = 0;


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
            /*
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Type").toString().match(/\.(.*)/)[1].toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Color").toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Wheels").toString());
            console.log(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("RegNr").toString());
            */
        }
        //Garages.push(new Garage(garageNodes[i].getAttribute("Name").toString(),
        console.log(garageNodes[i].getAttribute("Name").toString());
        //new Garage();
        //garageNodes[i].getElementsByTagName("Date")[0].childNodes[0].nodeValue.toString().trim(),
        //garageNodes[i].getElementsByTagName("Discreption")[0].childNodes[0].nodeValue.toString().trim(),
        //garageNodes[i].getElementsByTagName("Link")[0].childNodes[0].nodeValue.toString().trim();

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

function addLot(){
    $('#garage').html($('#garage').html() + '<div id="lot' + lotsCount + '" class="lot"><div/>');

    $('.lot').click(function (event) {
        if (selectedLot == event.target.id)
        {
            $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.50)' });
            $('.lot').css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });
            selectedLot = null; 
        }
        else
        {
            selectedLot = event.target.id;
            $('.lot').css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });
            $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.50)' });
        }
    });
    lotsCount += 1;
}

function addVehicle() {
    if (selectedLot != null)
    {
        $('#' + selectedLot).html('<div class="vehicle"><div/>');
        Vehicles.push(new Vehicle("car", "white", "12", "asdf444"));
    }
    else
        alert("You must select a lot first!");
    selectedLot = null;
}

function loadscript() {
    if (lotsCount == 0)
    {
        loadMovies();
        DynamicSizingAndPositioning();
        DynamicSizingAndPositioning();
        
        $('#Home').click(function (event) {
            if (scrolledTo != event.target.id) {
                if (scrolledTo != event.target.id && scrolledTo != "Garage")
                {
                    $('#contentWithLogo').animate({ scrollTop: $("#Home1").offset().top }, 'fast');
                    scrolledTo = event.target.id;
                }
                else if (scrolledTo == "Garage") {
                    $('#content').animate({ scrollTop: $("#Home1").offset().top }, 'fast');
                    scrolledTo = event.target.id;
                }
            }
        });

        $('#AboutUs').click(function (event) {
            if (scrolledTo != event.target.id && scrolledTo != "Garage")
            {
                $('#contentWithLogo').animate(
                    { scrollTop: $("#AboutUs1").offset().top },
                    'fast',
                    "swing",
                    function(){ 
                        //alert("animation complete! - your custom code here!"); 
                    }
                );
                scrolledTo = event.target.id;
            }
            else if(scrolledTo == "Garage")
            {
                $('#content').animate({ scrollTop: $("#AboutUs1").offset().top },
                    'fast',
                    'swing',
                    function () {
                        $('#contentWithLogo').animate({ scrollTop: $("#AboutUs1").offset().top }, 'slow');
                    });
                scrolledTo = event.target.id;
            }
        });

        $('#Garage').click(function (event) {
            if (scrolledTo != "Garage")
            {
                $('#content').animate({ scrollTop: $("#Garage1").offset().top },
                    'fast',
                    'swing',
                    function () {
                        $('#contentWithLogo').animate({ scrollTop: $("#AboutUs1").offset().top }, 'slow');
                    });
                scrolledTo = event.target.id;
            }
        });

    }
};


function setSelectedLot(id) {
    selectedLot = id;
    console.log(id);
};

$(window).resize(function () {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false; // timer function

        // needed functions
        var NewHeight = $(this).height();
        var NewWidth = $(this).width();
        //$('#content').scrollTo('#Home1');
        DynamicSizingAndPositioning();
        // needed functions end
        
    }
}

function DynamicSizingAndPositioning() {
    $('.contentContainer').css({ 'top': $('.navbar').height() - 15, 'bottom': $('.footer').height() });
    $('.header').css({ 'height': $('.navbar').height() });

    $("#Home1").css({ 'height': $(window).height() - $(".headerLogo").height() - $('.footer').height() - $('.navbar').height() });
    $("#AboutUs1").css({ 'height': $(window).height() - $(".headerLogo").height() - $('.footer').height() - $('.navbar').height(), 'top': $("#Home1").height() });

    $('#contentWithLogo').css({ 'top': $('.navbar').height() + $('.headerLogo').height(), 'height': $(window).height() - $('.footer').height() - $(".headerLogo").height() - $('.navbar').height(), 'bottom': $('.footer').height() });

    $('.leftContainer').css({ 'top': $('.navbar').height() - 15, 'height': $(window).height() - $('.footer').height() - $('.navbar').height() + 15 });
    $('#Garage1').css({ 'top': $('#contentWithLogo').height() + $('.navbar').height() + $('.footer').height() + $('.headerLogo').height(), 'height': $(window).height() - $('.footer').height() - $('.navbar').height() });
    
    $('.leftContentContainer').css({ 'top': $('.navbar').height() - 15, 'height': $(window).height() - $('.footer').height() - $('.navbar').height() + 15, 'padding-top': $('.navbar').height() + 50 } );
    $('.garageContent').css({ 'top': $('.navbar').height(), 'height': $(window).height() - $('.footer').height() - $('.navbar').height(), 'width': $('.contentContainer').width() - $('.leftContainer').width(), 'left': $('.leftContainer').width() });
    
    //garageContent

}

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

function Garage(type, size, name, vehicles)
{
    this.type = type;
    this.size = size;
    this.name = name;
    this.vehicles = vehicles;
}

function Vehicle(type, color, wheels,regnr)
{
    this.type = type;
    this.color = color;
    this.wheels = wheels;
    this.regnr = regnr;
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


