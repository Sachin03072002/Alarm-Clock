// getting all the div,class and id  references
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
let alarmName = document.getElementById('name');
const alarmSound = new Audio('alarm.mp3');
let alarmTile = document.getElementById('alarm-tile');
let popUp = document.querySelectorAll('.showbox');
let heading = document.getElementById('heading');
let alert = document.getElementById("alert");
let blink = document.getElementsByClassName('blink');
// making an empty alarmObj to set the alarms
let alarmObj = {
    alarms: []
};
// taking the index of the alarm
let alarmIndex = 0;


// stroing the name of the months 
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// storing the names of the days
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// function to make the digits as two digit number
const appear = (x) => { return (x < 10 ? "0" + x : x); }
// function to convert the string to number
const convert = (x) => { return Number.parseInt(x) }

// function to convert the 24 hr to 12 hr format
const Format12 = (h) => {
    if (h > 12) {
        h = h - 12;
    }
    return h;

}

// function to set the modal false
const hiderFalse = (x) => {
    x.hidden = false;
}
// function to set the modal true
const hiderTrue = (x) => {
    x.hidden = true;
}
// funciton to make the clocks colon to blink
setInterval((x) => { blink[0].classList.toggle("blinkThis") }, 520)
setInterval((x) => { blink[1].classList.toggle("blinkThis") }, 520)


// function to set the time of the clock when loaded
function setTime() {
    setInterval(() => {
        //acuring the current date , time and other details and setting them in their position
        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let din = d.getDay();
        let mon = d.getMonth();
        let tarik = d.getDate();
        let y = d.getFullYear();
        let dur = "AM";
        // if the time is greater tan 12 then changing it to 12hr format
        if ((h > 12) || (h == 12 && m > 0)) {

            dur = "PM"
        }
        if (h > 12) {
            h = h - 12;
        }
        hour.innerHTML = appear(h);
        min.innerHTML = appear(m);
        sec.innerHTML = appear(s);
        timeZone.innerHTML = dur;
        day.innerHTML = days[din];
        month.innerHTML = monthName[mon];
        year.innerHTML = y;
        date.innerHTML = appear(tarik);
        // call the alarmRing function each time to check the alarm that are set
        alarmRings();

        // if the alarmObj is empty then showing relevant info
        if (Object.keys(alarmObj.alarms).length === 0) {
            heading.innerHTML = `No active alarms`
        } else {
            heading.innerHTML = ''
            return;
        }

    }, 1000);
}
// calling the function whenever the website is open
setTime();



// function to set the alarmRing
function alarmRings() {
    // looping over the alarmObj and check which alarm is equal tot he current time
    alarmObj.alarms.forEach(function (alarm) {

        let hour = alarm.hour;
        let minute = alarm.min;
        let meridian = alarm.mer;

        let now = new Date();
        let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

        if (meridian === 'PM' && hour !== 12) {
            hour += 12;
        }
        alarmTime.setHours(hour);
        let timeDifference = alarmTime.getTime() - now.getTime();
        // if the timeDifference is near about zero than the alarm Rings 
        if (timeDifference > 0) {

            setTimeout(() => {

                // when the alarm time matches the sound get play
                alarmSound.play();
                alarmSound.loop = true;
                // the popup to stop the alarm shows
                hiderFalse(popUp[1]);
                console.log(`Alarm for ${hour % 12}:${minute} ${meridian} is ringing!`);
                setTimeout(() => {
                    // when the alarm time matches the sound get play
                    hiderTrue(popUp[1]);
                    // after 10s the alarm which rins up automatically get deleted
                    deleteAlarm(alarm.id);
                    alarmSound.pause();
                    alarmSound.currentTime = 0;
                }, 10000);
            }, timeDifference);
        }
    });
}

// function to set the alarm
const set = () => {
    // getting the values form the html document
    let alarmString = alarm[0].value;
    let hour = convert(alarmString.substr(0, 2));
    let min = convert(alarmString.substr(3, 2));
    let mer = alarmString.substr(6, 2);

    if (hour == 'NaN' || alarmString.trim() === '') {
        // If hour is not a number or alarmString is empty or contains only whitespace,
        // do not add a new alarm and exit the function
        return;
    } else {
        // Add new alarm to alarmObj.alarms array
        let now = new Date();
        // if no name is set than setting a default name
        if (alarmName.value == '') {
            alarmName.value = 'New Alarm';
        }
        let nowHour = Format12(now.getHours());
        let nowMin = now.getMinutes();
        let nowDate = new Date().toISOString().slice(0, 10);
        //declaring the properties of the alarmObj
        let newAlarm = {
            id: alarmIndex,
            name: "New Alarm",
            hour: hour,
            min: min,
            mer: mer,
        };
        // if the alarm time is past time then showing the alert
        if ((nowHour > hour) || (nowHour == hour && nowMin >= min)) {
            hiderFalse(alert);
            return;
        } else {
            alarmIndex++;
            newAlarm.id = `${alarmIndex}`;
            newAlarm.name = alarmName.value; // set the name of the alarm
            alarmObj.alarms.push(newAlarm); // add the new alarm to the array
        }
        // Create new list element for new alarm
        let newElement = document.createElement('div');
        newElement.innerHTML = `
            <li class="card" id="${newAlarm.id}">
                <div class="row">
                    <div class="col ms-2">
                        <span>${newAlarm.name}</span> 
                    </div>
                    <div class="col ms-2">
                        <span>${appear(hour)}:${appear(min)} ${mer}</span>
                    </div>
                    <div class="col ms-2">
                        <button class="delete" id="${newAlarm.id}">Delete</button>                    
                    </div>
                </div>
                
            </li>
    `;
        elem.value = '';
        alarmName.value = '';
        // Append the new element to the DOM
        alarmList.appendChild(newElement);

    }
};

// function to delete the alarm
function deleteAlarm(id) {
    //getting the id of the element clicked
    let alarmElement = document.getElementById(id);
    //remving it from the list
    alarmElement.remove();
    //removing it from the obj also
    for (let i = 0; i < alarmObj.alarms.length; i++) {
        if (alarmObj.alarms[i].id == id) {
            alarmObj.alarms.splice(i, 1);
            break;
        }
    }
}


// function for the clickListener
function handleClickListener(e) {
    const target = e.target;
    if (target.className == 'delete') {
        const taskId = target.id;
        deleteAlarm(taskId);
        return;

    }
}
document.addEventListener('click', handleClickListener);


//materialize initialiser
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {});
});