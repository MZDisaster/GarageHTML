/// <reference path="C:\Users\elev\Source\Repos\GarageHTML\GarageHTML\Scripts/jquery-3.1.1.js" />

// JavaScript source code
var topPosition = $(window).scrollTop();
var Garages = [];
var SelectedGarageIndex = null;
var OldHeight = $("#Home1").height();
var OldWidth = $("#Home1").height();
var scrolledTo = 'Home';
var rtime;
var timeout = false;
var delta = 1;
var selectedLot = null;
var lotsCount = 0;
var scrolledTooffset = 0;

var newGaragebtn = document.getElementById("newGarage");

var modal = document.getElementById('myModal');



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
newGaragebtn.onclick = function () {
    showModal("<p>New Garage</p>",
        "<div><label for='garageName'>Garage Name: </label><input type='text' id='garageName' placeholder='Garage Name'></div>"+
            "<div class='typeslist'>"+
                "<label for='garageType'>Garage Type: </label><select id='garageType' placeholder='Garage Type' size='5'>" +
                    "<option value='Airplane' selected>Airplane</option>"+
                    "<option value='Boat'>Boat</option>"+
                    "<option value='Buss'>Buss</option>"+
                    "<option value='Car'>Car</option>"+
                    "<option value='Motorcycle'>Motorcycle</option>"+
                "</select>"+
            "</div>"+
            "<input type='number' id='garageSize' min='1' max='9999' value='10'>",
        "<div id='createGarage' class='button'>Create</div>");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showModal(title, content, footer) {
    var modalTitle = document.getElementById("modal-title");
    var modalContent = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    modalTitle.innerHTML = title;
    modalContent.innerHTML = content;
    modalFooter.innerHTML = footer;

    modal.style.display = "block";
}

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
                ParseGarages(this);
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

function ParseGarages(xml) {
    var xmlDoc = xml.responseXML;
    var garageNodes = xmlDoc.getElementsByTagName("Garage");
    //console.log(garageNodes[0]);

    for (var i = 0; i < garageNodes.length; i++) {
        var Vehicles = [];
        for (var j = 0; j < garageNodes[i].getElementsByTagName("Vehicle").length; j++) // garage vehicles
        {
            Vehicles.push(new Vehicle(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Type").toString().match(/\.(.*)/)[1].toString(), garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Color").toString(), parseInt(garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("Wheels").toString()), garageNodes[i].getElementsByTagName("Vehicle")[j].getAttribute("RegNr").toString()));
        }
        var garageType = garageNodes[i].getAttribute("Type").toString().match(/\[(.*)/)[1].match(/\.(.*)/)[1].match(/[^\]]+/).toString(); // garage type parsed with RegEx
        var garageSpace = parseInt(garageNodes[i].getAttribute("Space")); // Garage Size
        var garageName = garageNodes[i].getAttribute("Name").toString(); // Garage Name

        Garages.push(new Garage(garageType,
            garageSpace,
            garageName,
            Vehicles));

        $('#GaragesDropdown').html($('#GaragesDropdown').html() + "<div id=\"garage" + i + "\" class=\"garageButton\" data-size=\"" + garageSpace + "\" data-index=\"" + i + "\">" + garageName + "</div>");

        //addVehicle();
        //Vehicles.length = 0;

        //console.log(garageNodes[i].getAttribute("Name").toString());
        //new Garage();
        //garageNodes[i].getElementsByTagName("Date")[0].childNodes[0].nodeValue.toString().trim(),
        //garageNodes[i].getElementsByTagName("Discreption")[0].childNodes[0].nodeValue.toString().trim(),
        //garageNodes[i].getElementsByTagName("Link")[0].childNodes[0].nodeValue.toString().trim();

    }
    LoadPage();
}

function LoadPage() {
    jQuery.each(Garages, function (i, val) {
        var garagee = this;

        $('#garage' + i).click(function (event) {
            $('#garage').html('');
            //console.log(this);
            SelectedGarageIndex = parseInt($(this).data('index'));
            showLots();
            showVehicles();
        });
    });
}

function NewGarage() {
    
}
/*
function NewGarage() {
    var garagename = $("#garageName").val();
    var garagetype = $("#garageType").val();
    var garagesize = $("#garageSize").val();

    if (garagename != "" && garagetype != "" && garagesize != "") {
        var newgarage = new Garage(garagetype, parseInt(garagesize), garagename);
        Garages.push(newgarage);
        $('#GaragesDropdown').html($('#GaragesDropdown').html() + "<div id=\"garage" + Garages.length + "\" class=\"garageButton\" data-size=\"" + newgarage.size + "\" data-index=\"" + Garages.length + "\">" + newgarage.name + "</div>");

        $('#garage' + Garages.length).click(function (event) {
            $('#garage').html('');
            //console.log(this);

            SelectedGarageIndex = parseInt($(this).data('index'));
            showLots();
            showVehicles();
        });

        $('#garage').html('');
        SelectedGarageIndex = Garages.length - 1;
        showLots();
        showVehicles();

        $('#vehiclecolor').val("#123456");
        $("#garageName").val("");
        $("#garageType").val("Airplane");
        $("#garageSize").val("10");
    }
    else
        alert("Missing info!");
}*/

function addLot() {
    if (SelectedGarageIndex != null)
    {
        $('#garage').html($('#garage').html() + '<div id="lot' + lotsCount + '" class="lot"><div/>');

        $('.lot').click(function (event) {
            if (selectedLot == event.target.id) {
                $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.50)' });
                $('.lot').css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });
                selectedLot = null;
            }
            else if ($(event.target).attr('id') != null) {
                selectedLot = $(event.target).attr('id');
                $('.lot').css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });
                $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.50)' });
            }
            else {
                selectedLot = $(event.target).parent().attr('id');
                $('.lot').css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });
                $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.50)' });
            }
        });
        lotsCount += 1;
    }
}


function addVehicle() {
    if (selectedLot != null) {
        if ($('#' + selectedLot + " .vehicle").length < 1) {
            var color = $('#vehiclecolor').val();
            if (color == "#123456")
                color = "transparent";
            var newvehicle = new Vehicle(Garages[SelectedGarageIndex].type, color, "12", "asdf444", parseInt(selectedLot.match(/\d+/)[0]));
            console.log(Garages[SelectedGarageIndex].type);
            Garages[SelectedGarageIndex].vehicles.push(newvehicle);
            $('#' + selectedLot).html('<div class="vehicle ' + newvehicle.type + '" style="background-color:' + newvehicle.color + ';"><div/>');
            $('#' + selectedLot).css({ 'background-color': 'rgba(30, 30, 30, 0.20)' });

            $('#vehiclecolor').val("#123456");
        }
        else
            alert("Lot already contains vehicle!");
    }
    else
        alert("You must select a lot first!");

    selectedLot = null;
}

function showLots() {
    lotsCount = 0;
    for (var j = 0; j < Garages[SelectedGarageIndex].size ; j++) {
        addLot();
    }
}

function showVehicles() {
    if (Garages[SelectedGarageIndex].hasOwnProperty('vehicles')) {
        jQuery.each(Garages[SelectedGarageIndex].vehicles, function (k, val) {
            //if(this.color.toString().substring < )
            if (this.lotnr > 0)
                $('#lot' + this.lotnr).html('<div class="vehicle ' + this.type + '" style="background-color:' + this.color + ';"><div/>');
            else
                $('#lot' + k).html('<div class="vehicle ' + this.type + '" style="background-color:' + this.color + ';"><div/>');
        });
    }
}

function loadscript() {
    if (lotsCount == 0) {
        loadMovies();
        //DynamicSizingAndPositioning();
        //DynamicSizingAndPositioning();

        $('#Home').click(function (event) {
            if (scrolledTo != event.target.id) {
                if (scrolledTo != event.target.id && scrolledTo != "Garage") {
                    $('#contentWithLogo').animate({ scrollTop: $("#Home1").offset().top }, 'fast');
                    scrolledTo = event.target.id;
                }
                else if (scrolledTo == "Garage") {
                    $('.contentContainer').animate({ scrollTop: $(".headerLogo").offset().top }, 'fast', 'swing',
                        function () {
                            //$('.contentContainer').animate({ scrollTop: $("#Home1").offset().top }, 'fast');
                        });
                    scrolledTo = event.target.id;
                }
            }
        });

        $('#AboutUs').click(function (event) {
            if (scrolledTo != event.target.id && scrolledTo != "Garage") {
                $('#contentWithLogo').animate(
                    { scrollTop: $("#AboutUs1").offset().top },
                    'fast',
                    "swing",
                    function () {
                        // animation complete
                    }
                );
                scrolledTo = event.target.id;
            }
            else if (scrolledTo == "Garage") {
                $('.contentContainer').animate({ scrollTop: $(".headerLogo").offset().top },
                    'fast',
                    'swing',
                    function () {
                        $('#contentWithLogo').animate({ scrollTop: $("#AboutUs1").offset().top }, 'fast');
                    });
                scrolledTo = event.target.id;
            }
        });

        $('#Garage').click(function (event) {
            if (scrolledTo != "Garage") {
                $('.contentContainer').animate({ scrollTop: $("#Garage1").offset().top },
                    'fast',
                    'swing',
                    function () {
                        $('#contentWithLogo').animate({ scrollTop: $("#Home1").offset().top }, 'fast');
                        console.log("should scroll!!!");
                    });
                scrolledTo = event.target.id;
                scrolledTooffset = $("#Garage1").offset().top;
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
        //timeout = true;
        //setTimeout(resizeend, delta);
        //$("#Home").trigger('click');
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false; // timer function

        // needed functions
        //var NewHeight = $(this).height();
        //var NewWidth = $(this).width();
        //$('#content').scrollTo('#Home1');
        //DynamicSizingAndPositioning();
        // needed functions end

    }
}

function DynamicSizingAndPositioning() {
    if (scrolledTo == "Garage") {
        if (window.innerHeight < 600)
            $('.contentContainer').animate({ scrollTop: $(".headerLogo").offset().top }, 'fast', 'swing',
                        function () {
                            $('#contentWithLogo').animate({ scrollTop: $("#AboutUs1").offset().top }, 'fast');
                            scrolledTo = "";
                        });
        //$('.contentContainer').scrollTop($("#Garage1").offset().top);
        //console.log("asd");
    }

    /*
    $('.contentContainer').css({ 'top': $('.navbar').height(), 'bottom': $('.footer').height(), 'height': $(window).height() - $('.footer').height() - $('.navbar').height() });
    $('.header').css({ 'height': $('.navbar').height() });

    $("#Home1").css({ 'height': $(window).height() - $(".headerLogo").height() - $('.footer').height() - $('.navbar').height() });
    $("#AboutUs1").css({ 'height': $(window).height() - $(".headerLogo").height() - $('.footer').height() - $('.navbar').height() });

    $('#contentWithLogo').css({ 'top': '0', 'bottom': $('.footer').height(), 'height': $(window).height() - $(".headerLogo").height() - $('.footer').height() - $('.navbar').height() });
    $('#Garage1').css({ 'height': $(window).height() - $('.footer').height() - $('.navbar').height() });

    $('.garageContent').css({ 'top': $('.navbar').height(), 'height': $(window).height() - $('.footer').height() - $('.navbar').height(), 'width': $('.contentContainer').width() - $('.leftContainer').width(), 'left': $('.leftContainer').width() });
    */
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

function Garage(type, size, name, vehicles) {
    this.type = type;
    this.size = size;
    this.name = name;
    if (vehicles == null)
        this.vehicles = [];
    else
        this.vehicles = vehicles;
}

function Vehicle(type, color, wheels, regnr, lotnr) {
    this.type = type;
    this.color = color;
    this.wheels = wheels;
    this.regnr = regnr;
    this.lotnr = lotnr;
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


