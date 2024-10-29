var urlParams = new URLSearchParams(window.location.search);

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// getUrlParameter('move')

var albumURL = getUrlParameter("albumURL");

var calendars = {
  "brianpersonal":getUrlParameter("brianpersonal"),
  "brianwork":getUrlParameter("brianwork"),
  "muellerfamily":getUrlParameter("muellerfamily"),
  "brianemily":getUrlParameter("brianemily"),
  "photography":getUrlParameter("photography"),
  "emilypersonal":getUrlParameter("emilypersonal"),
  "emilycrossroads":getUrlParameter("emilycrossroads"),
  "brooklyncollege":getUrlParameter("brooklyncollege"),
  "amelia":getUrlParameter("amelia"),
  "madilyn":getUrlParameter("madilyn"),
  "david":getUrlParameter("david"),
  "important":getUrlParameter("important"),
  "holidays":getUrlParameter("holidays"),
}

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
  // hour = updateTime(hour);
  min = updateTime(min);
  // sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + ":" + min; /* adding time to the div */
  var t = setTimeout(function(){ currentTime() }, 1000*5); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime();





async function populateImage() {
  const dashboardPhotos = "uZRaNk7rrzZ4hWNHA";
  const dashboardAmelia = "grsRiadhvHpKpXqw7";
  const dashboardMadilyn = "JN35RfoyCBgxgj4bA";
  const dashboardDavid = "VfrD3JYGswWZ54Ko6";
  const dashboardHalloween = "Yr2UDv5EBQBtNiUu8";
  const dashboardThanksgiving= "Vfx3sepjXEx3ShDz6"
  const dashboardChristmas = "amxn19hu7cNmZe326";

  let d = new Date();
  let currentMonth = d.getMonth();

  let dashboardStr;

  switch(currentMonth+1) {
    case 4:
      dashboardStr = dashboardDavid;
      break;
    case 6:
      dashboardStr = dashboardMadilyn;
      break;
    case 7: 
      dashboardStr = dashboardAmelia;
      break;
    case 10:
      dashboardStr = dashboardHalloween;
      break;
    case 11:
      dashboardStr = dashboardThanksgiving;
      break;
    case 12: 
      dashboardStr = dashboardChristmas;
      break;
    default:
      dashboardStr = dashboardPhotos;
  }

  // override
  dashboardStr = dashboardPhotos;

  const url = 'https://corsproxy.io/?' + encodeURIComponent("https://mueller-express.onrender.com/?albumURL=https://photos.app.goo.gl/" + dashboardStr);
  // const url = 'https://corsproxy.io/?' + "https://mueller-express.onrender.com/?albumURL=https://photos.app.goo.gl/" + dashboardStr;
  console.log(url)
  const gPhotosData = await fetch(url)
  .then(function(response) {
    console.log(response.json())
    return response.json();
  });

  console.log(gPhotosData)
  let imageURL = gPhotosData["URL"];
  $("#photos img").attr("src",imageURL+"=w1080");
}
populateImage();





async function populateList() {
  // loading();
  let mealfredid=getUrlParameter('mealfredid');
  const jsonBox = await fetch('https://jsonbox.io/'+mealfredid+'/5f8499dee61705001783dbf1')
  .then(function(response) {
    // loaded();
    return response.json();
  });

  // console.log(jsonBox.list)

  if(jsonBox.list != null){
    list = jsonBox.list;
    let table = document.querySelector('#todo table')
    // for(var item in list){
      // table.innerHTML += `<tr><td>☐</td><td>${item}</td></tr>`
    // }
    list.forEach(item => table.innerHTML += `<tr><td>☐</td><td>${item}</td></tr>`);
  }
}
// populateList();



function loadFullCalendar(){
  let gcapikey = getUrlParameter('gcapikey');

  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('fullcalendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'googleCalendar' ],
      header: {
        left:   '',
        center: '',
        right:  ''
      },
      // 6 weeks is default
      // fixedWeekCount: false,
      height: 1054,
      columnHeaderFormat: {
        weekday: 'long'
      },
      googleCalendarApiKey: gcapikey,

      eventSources: [

        // BRIAN
        {
          googleCalendarId: calendars['brianpersonal'],
          className: 'brianpersonal',
          color: '#FFBB3D',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['brianwork'],
          className: 'brianwork',
          color: '#ed7b39',
          textColor: 'white'
        },
        
        // MUELLERS
        {
          googleCalendarId: calendars['muellerfamily'],
          className: 'muellerfamily',
          color: '#63c74d',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['brianemily'],
          className: 'brianemily',
          color: '#3e8948',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['photography'],
          className: 'photography',
          color: '#265c42',
          textColor: 'white'
        },

        // EMILY
        {
          googleCalendarId: calendars['emilypersonal'],
          className: 'emilypersonal',
          color: '#124e89',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['emilycrossroads'],
          className: 'emilycrossroads',
          color: '#0099db',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['brooklyncollege'],
          className: 'brooklyncollege',
          color: '#45C6C4',
          textColor: 'white'
        },

        // KIDS
        {
          googleCalendarId: calendars['amelia'],
          className: 'amelia',
          color: '#FF00FF', // bright pink
          // color: '#FF66CC', // rose pink
          // color: '#FCA3B7', // flamingo
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['madilyn'],
          className: 'madilyn',
          color: '#A500D5',
          textColor: 'white'
        },
        {
          googleCalendarId: calendars['david'],
          className: 'david',
          color: '#BF262D',
          textColor: 'white'
        },

        // OTHER
        {
          googleCalendarId: calendars['important'],
          className: 'important',
          color: '#FFF',
          textColor: 'black'
        },
        {
          googleCalendarId: calendars['holidays'],
          className: 'holidays',
          color: '#646464',
          textColor: 'white'
        }
        
      ],          
      loading: function(bool) {
        document.getElementById('loading').style.display =
          bool ? 'block' : 'none';
      }
    });

    calendar.render();
    
  });
}


// calendarweek
let daysOfWeek = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

let week = document.querySelector("#calendarweek");
for(let i = 0; i < 7; i++){

  week.innerHTML += `
    <div class="weekday" id=${daysOfWeek[i]}>
      <div class="meals">
      </div>
      <div class="weather">
        <span class="low"></span><img class="skycon"><span class="high"></span>
      </div>
    </div>
  `;

}

let baseURL = "https://json.extendsclass.com/bin/";
let calendarID = "0dd7d122ccf4";

var calendarHash = {};

async function populateMeals() {
  // loading();
  const jsonStore = await fetch(baseURL+calendarID)
  .then(function(response) {
    // loaded();
    return response.json();
  });

  if(jsonStore.calendar != null){
    calendarHash = jsonStore.calendar;
    for(var day in calendarHash){
      let meals = calendarHash[day].meals;
      meals.splice(0,1);
      let targetDay = document.querySelector('#'+day.toLowerCase() + " .meals");
      if(meals.length > 0){
        for(let i = 0; i < meals.length; i++){
          targetDay.innerHTML += `<p>${meals[i]}</p>`;
        }
      } else {
        targetDay.innerHTML += `<img src="mealfred-logo-white-sm.png" class="mealfred">`;
      }
    }

  }
}
populateMeals();





function populateWeather() {
  fetch('https://api.openweathermap.org/data/3.0/onecall?lat=40.637490&lon=-74.032470&appid=eb9b134a06995b47a1d406b24cbea580&units=imperial')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(res) {
    let tempNow = res.current.temp;
    // console.log(tempNow);
    document.querySelector('#weathernow p').innerHTML = (Math.round(tempNow))+"º";

    let dailyWeather = res.daily;
    dailyWeather.splice(7,1);
    // console.log(dailyWeather);

    let timestamp = dailyWeather[0].dt; // UNIX timestamp in seconds
    let d = new Date();
    d.setTime(timestamp*1000); // javascript timestamps are in milliseconds
    let currentDayNum = d.getDay();
    // console.log(d.getDay());
    // console.log(currentDayNum);

    let today = document.querySelector("#" + daysOfWeek[currentDayNum]);
    // console.log(today)
    today.style.backgroundColor = "#aaa";
    today.style.color = "black";
    // today.style.borderLeftWidth = "5px";

    for(let i = 0; i < 7; i++){ // start with today
      let myLow = document.querySelector("#" + daysOfWeek[(currentDayNum+i)%7] + " .low");
      let dsLow = dailyWeather[i].temp.min;
      myLow.innerHTML += Math.round(dsLow);

      let myHigh = document.querySelector("#" + daysOfWeek[(currentDayNum+i)%7] + " .high");
      let dsHigh = dailyWeather[i].temp.max;
      myHigh.innerHTML += Math.round(dsHigh);

      // console.log(dsLow + "," + dsHigh)

      let myTemps = document.querySelectorAll("#" + daysOfWeek[(currentDayNum+i)%7] + " span");
      // console.log(dailyWeather[i].rain)
      let dsPrecip = dailyWeather[i].rain/10;
      // console.log(dsPrecipProb);
      
      myTemps.forEach(function(temp){
        if(dsPrecip > 0.1){
          temp.style.backgroundColor = "rgba(0,0,255,"+dsPrecip+")";
          // temp.style.color = "rgba(0,0,255,"+(dsPrecipProb*2+0.35)+")";
        } 
        if(dsPrecip > 0.5){
          temp.style.color = "white";
        }    
      });
      
      let myIcon = document.querySelector("#" + daysOfWeek[(currentDayNum+i)%7] + " img.skycon");
      let dsIcon = dailyWeather[i].weather[0].icon;
      myIcon.src = "https://openweathermap.org/img/wn/" + dsIcon + "@2x.png"
      
    }
  });

}
populateWeather();

// var icons = new Skycons(),
//     list  = [
//       "clear-day", "clear-night", "partly-cloudy-day",
//       "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
//       "fog"
//     ],
//     i;

// for(i = list.length; i--; )
//   icons.set(list[i], list[i]);

// icons.play();


////////////////////////////////////////////////////////////////////////


var icons = new Skycons({
    "color": "#fff"
  }),
  list = [
    "clear-day", "clear-night", "partly-cloudy-day",
    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
    "fog"
  ],
  i;


var urlParams = new URLSearchParams(window.location.search);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function rotate90(){
  let bodyEl = document.querySelector('body');
  bodyEl.style.cssText = 'margin: 0; overflow: hidden;';

  let contentEl = document.querySelector('#content');
  contentEl.style.cssText = 'transform: rotate(90deg); transform-origin:bottom left; position:absolute; top: -100vw; left: 0; height:100vw; width:100vh; overflow:hidden;';
}

var rotate = getUrlParameter('rotate');
if (rotate == "1") {
  rotate90();
}

loadFullCalendar();

window.addEventListener('load', function () {

  for (i = list.length; i--;) {
    var weatherType = list[i],
      elements = document.getElementsByClassName(weatherType);
    for (e = elements.length; e--;) {
      icons.set(elements[e], weatherType);
    }
  }

  icons.play();

  document.querySelector('.fc td.fc-today').style.background = '#aaa';

});

setTimeout(function() {
  location.reload();
}, 1000*60*60);