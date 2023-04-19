let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let timeZone = document.getElementById('timeZone');
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let date = document.getElementById("date");
let alarm = document.querySelectorAll('.timepicker');
let alarmObj = {}
let alarmInterval;



let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const appear = (x) => { return (x < 10 ? "0" + x : x); }
const convert = (x) => { return Number.parseInt(x) }
const hider4 = (x) => { x.hidden = (x.hidden) ? false : true; }
function setTime() {
    setInterval(() => {
        let d = new Date();
        let h = appear(d.getHours());
        let m = appear(d.getMinutes());
        let s = appear(d.getSeconds());
        let din = d.getDay();
        let mon = d.getMonth();
        let tarik = d.getDate();
        let y = d.getFullYear();
        let dur = "AM";
        if ((h > 12) || (h == 12 && m > 0)) {
            h = h - 12;
            dur = "PM"
        }
        if (h == 0) {
            h = 1;
        }

        hour.innerHTML = h;
        min.innerHTML = m;
        sec.innerHTML = s;
        timeZone.innerHTML = dur;
        day.innerHTML = days[din];
        month.innerHTML = monthName[mon];
        year.innerHTML = y;
        date.innerHTML = tarik;
    }, 1000);
}
setTime();

const set = () => {
    let alarmString = alarm[0].value;
    alarmObj.hour = convert(alarmString.substr(0, 2));
    alarmObj.min = convert(alarmString.substr(3, 3));
    alarmObj.mer = alarmString.substr(6, 2);
    alarmInterval = (alarmObj.hour + 12 - convert(hour)) * 3600;  //hour to minutes
    if (alarmObj.min < convert(min) || timeZone != alarmObj.timeZone) {
        alarmInterval += 24 * 3600   //sets alarm for next day 
    }
    alarmInterval += (alarmObj.min - convert(min)) * 60;     //minutes to seconds
    alarmInterval -= convert(sec.innerHTML);
    //rectifies manual delay while setting Alarm
    alarmInterval = alarmInterval * 1000
    console.log('alarm set', alarmInterval)             //to milliseconds
    //   setTimeout(playsound, alarmInterval)
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {});
});
