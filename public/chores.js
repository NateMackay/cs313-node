
var emptyClass = document.getElementsByClassName('empty');
var breakfast  = document.getElementsByClassName('breakfast');
var playroom   = document.getElementsByClassName('play');
var family     = document.getElementsByClassName('family');
var outside    = document.getElementsByClassName('outside');
var bed        = document.getElementsByClassName('bedroom');
var together   = document.getElementsByClassName('together');
var dinner     = document.getElementsByClassName('dinner');
var clear      = document.getElementsByClassName('clear');
var wash       = document.getElementsByClassName('washDishes');
var j = 0;
var week = ["sunday" ,"monday" ,"tuesday" ,"wednesday" ,"thursday" ,"friday" ,"saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function assignChores() {

  addDates(0);

  //get the assignments from the database
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = function() {
    if (xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
      //manipulate the DOM with the assignments 
      console.log('inside if statement');
      var data = JSON.parse(xmlHttpRequest.responseText);

        // Empty-the-dishwasher assignments
        for (var i = 0; i < data.empty.length; i++) { 
          var header = document.createElement('h4');
          header.innerHTML = data.job[14].jobname;
          var day = document.createElement('p');
          day.innerHTML = data.member[data.empty[i].nameid - 1].firstname;
          day.setAttribute("class", data.member[data.empty[i].nameid -1].firstname);
          day.setAttribute("onclick", 'jobComplete(this)');
          emptyClass[j].appendChild(header);
          emptyClass[j].appendChild(day);
          j++;
        }

      // Make-breakfast assignments
      j = 0;
      for (var i = 0; i < data.breakfast.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[5].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.breakfast[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.breakfast[i].nameid -1].firstname);
        if (data.member[data.breakfast[i].nameid - 1].firstname) {
          breakfast[j].appendChild(header);
          breakfast[j].appendChild(day);
          j++;
        } else {
          breakfast[j].parentElement.removeChild(breakfast[j]);
        }
      }

      // Clean-the-playroom assignments
      j = 0;
      for (var i = 0; i < data.play.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[15].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.play[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.play[i].nameid -1].firstname);
        if (data.member[data.play[i].nameid - 1].firstname) {
          playroom[j].appendChild(header);
          playroom[j].appendChild(day);
          j++;
        } else {
          playroom[j].parentElement.removeChild(playroom[j]);
        }
      }

      // Clean-the-family-room assignments
      j = 0;
      for (var i = 0; i < data.family.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[0].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.family[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.family[i].nameid -1].firstname);
        if (data.member[data.family[i].nameid - 1].firstname) {
          family[j].appendChild(header);
          family[j].appendChild(day);
          j++;
        } else {
          family[j].parentElement.removeChild(family[j]);
        }
      }

      // Clean-the-outside assignments
      j = 0;
      for (var i = 0; i < data.outside.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[16].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.outside[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.outside[i].nameid -1].firstname);
        console.log("index i = " + i);
        if (data.member[data.outside[i].nameid - 1].firstname) {
          outside[j].appendChild(header);
          outside[j].appendChild(day);
          j++;
        } else {
          outside[j].parentElement.removeChild(outside[j]);
        }
      }

      // Clean-bedroom assignments
      j = 0;
      for (var i = 0; i < data.bedroom.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[2].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.bedroom[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.bedroom[i].nameid -1].firstname);
        if (data.member[data.bedroom[i].nameid - 1].firstname) {
          bed[j].appendChild(header);
          bed[j].appendChild(day);
          j++;
        } else {
          bed[j].parentElement.removeChild(bed[j]);
        }
      }

      // Complete together job assignments
      togJob = ["", 1, 2, 0, "Special Projects", 2];
      for (var i = 1; i < 6; i++) {
        var togetherHeader = document.createElement('h4');
        togetherHeader.innerHTML = "Complete together";
        var tog = document.createElement('p');
        tog.innerHTML = (isNaN(togJob[i]) ? togJob[i] : data.job[togJob[i]].jobname);
        together[i].appendChild(togetherHeader);
        together[i].appendChild(tog);
      }

      //remove Sunday, and Saturday
      together[0].parentElement.removeChild(together[0]);
      together[5].parentElement.removeChild(together[5]);

      // Make-dinner assignments
      j = 0;
      for (var i = 0; i < data.dinner.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[4].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.dinner[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.dinner[i].nameid -1].firstname);
        if (data.member[data.dinner[i].nameid - 1].firstname) {
          dinner[j].appendChild(header);
          dinner[j].appendChild(day);
          j++;
        } else {
          dinner[j].parentElement.removeChild(dinner[j]);
        }
      }

      // Clear-the-table assignments
      j = 0;
      for (var i = 0; i < data.clear.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[3].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.clear[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.clear[i].nameid -1].firstname);
        if (data.member[data.clear[i].nameid - 1].firstname) {
          clear[j].appendChild(header);
          clear[j].appendChild(day);
          j++;
        } else {
          clear[j].parentElement.removeChild(clear[j]);
        }
      }

      // Wash-the-dishes assignments
      j = 0;
      for (var i = 0; i < data.wash.length; i++) { 
        var header = document.createElement('h4');
        header.innerHTML = data.job[17].jobname;
        var day = document.createElement('p');
        day.innerHTML = data.member[data.wash[i].nameid - 1].firstname;
        day.setAttribute("class", data.member[data.wash[i].nameid -1].firstname);
        if (data.member[data.wash[i].nameid - 1].firstname) {
          wash[j].appendChild(header);
          wash[j].appendChild(day);
          j++;
        } else {
          wash[j].parentElement.removeChild(wash[j]);
        }
      }


      //document.getElementsByTagName('div').addEventListener('click', jobComplete());

    }
  }

  //the json is from the database here
  xmlHttpRequest.open('GET', 'https://nates-apps.herokuapp.com/week', true);
  xmlHttpRequest.send();


var day = new Date();
goTo(week[day.getDay()]);

}


//this function adds the date to each day
function addDates(next) { 
  var days = document.getElementsByClassName('date'); 
  var today  = new Date();

  var sunday = new Date;
  sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + next);

  //store a local date value for sunday 
  //localStorage.setItem('sunday', sunday.getDate());
  //sessionStorage.setItem('iCounter', parseInt(0));

  var dayToSet = new Date;
  dayToSet = sunday;

  for (var i = 0 + next; i < 7 + next; i++) {
    days[(i + next) % 7].innerHTML = capitalize(week[(i + next) % 7]) + ", " + month[dayToSet.getMonth()] + " " + dayToSet.getDate();
    dayToSet.setDate(dayToSet.getDate() + 1);
  }
}

//this function capitalizes the first letter of a string
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
