let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let timeZone = document.getElementById('timeZone');
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let date = document.getElementById("date");
let alarm = document.querySelectorAll('.timepicker');
let alarmList = document.getElementById('alarm-list');
let elem = document.getElementById('elem-time');
let alarmObj = {
    alarms: []
};
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

            dur = "PM"
        }
        if (h > 12) {
            h = h - 12;
        }

        hour.innerHTML = h;
        min.innerHTML = m;
        sec.innerHTML = s;
        timeZone.innerHTML = dur;
        day.innerHTML = days[din];
        month.innerHTML = monthName[mon];
        year.innerHTML = y;
        date.innerHTML = tarik;
        alarmRings();
    }, 1000);
}
setTime();

const set = () => {
    let alarmString = alarm[0].value;
    let hour = convert(alarmString.substr(0, 2));
    let min = convert(alarmString.substr(3, 2));
    let mer = alarmString.substr(6, 2);

    let newAlarm = {
        hour: hour,
        min: min,
        mer: mer,
        active: true
    };

    alarmObj.alarms.push(newAlarm); // add the new alarm to the array

    let newElement = document.createElement('div');
    newElement.innerHTML = `
            <li class="card">
                <div class="row">
                    <div class="col">
                        <span>${alarm.name}</span>
                    </div>
                    <div class="col">
                        <span>${hour}:${min} ${mer}</span>
                    </div>
                    <div class="col">
                        <span>nhdvurh</span>
                    </div>
                </div>

            </li>
    `;
    elem.value = '';
    // Append the new element to the DOM
    alarmList.appendChild(newElement);
};
function alarmRings() {
    alarmObj.alarms.forEach(function (alarm) {
        let hour = alarm.hour;
        let minute = alarm.min;
        let meridian = alarm.mer;

        let now = new Date();
        let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

        if (meridian === 'PM' && now.getHours() < 12) {
            alarmTime.setHours(alarmTime.getHours() + 12);
        }

        let timeDifference = alarmTime.getTime() - now.getTime();

        if (timeDifference > 0) {
            setTimeout(() => {
                // Code to ring the bell
                console.log(`Alarm for ${hour}:${minute} ${meridian} is ringing!`);
            }, timeDifference);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {});
});
