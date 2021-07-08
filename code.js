let arrOfRussianMonths=['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь'];
let indexOfMonth;
let divYear;
let nowDay;
let nowYear;
let nowMonth;
findNowDay();
let arrOfDayTransition=[6, 0, 1, 2, 3, 4, 5];
let cells=document.getElementsByClassName('cell');
let sixthWeek=document.getElementById('sixthWeek');
replacingCells(nowMonth, nowYear);
let MonthNYear=document.getElementById('MonthNYear');
indexOfMonth=nowMonth;
divYear=nowYear;
MonthNYear.innerText=arrOfRussianMonths[indexOfMonth]+' '+divYear;
let clicks=document.querySelectorAll('a');
clicks[0].addEventListener('click', subtractTheMonth);
clicks[1].addEventListener('click', addingTheMonth);





function addingTheMonth(){
    if (indexOfMonth >= 11) {
        indexOfMonth = 0;
        divYear++;
    }
    else indexOfMonth++;
    MonthNYear.innerText=arrOfRussianMonths[indexOfMonth]+' '+divYear;
    replacingCells(indexOfMonth, divYear);
}


function subtractTheMonth(){
    if (indexOfMonth <= 0){
        indexOfMonth = 11;
        divYear--;
    }
    else indexOfMonth--;
    MonthNYear.innerText=arrOfRussianMonths[indexOfMonth]+' '+divYear;
    replacingCells(indexOfMonth, divYear);
}



function replacingCells(month, year){
    sixthWeek.style.display='none';
    for (let elem of cells){ elem.innerText=' ';
    elem.classList.remove('nowDay');
    }
    let dForDay= new Date(year, month, 1);
    let indexOfDay=dForDay.getDay();
    for (let i=1; i<32; i++){
        if (checkDate(year, month, i)) {
            cells[arrOfDayTransition[indexOfDay]+i-1].innerText=i;
            if (isItNowDay(year, month, i)) cells[arrOfDayTransition[indexOfDay]+i-1].classList.add("nowDay");
        }
    }
    for(let elem of cells) doYourParentElementVisible(elem);
}


function doYourParentElementVisible(elem){
    if (elem.innerText !== ' ' && elem.innerText !== ''){
        if (elem.parentElement.style.display == 'none' ) elem.parentElement.style.display='block';
    }
}

function findNowDay(){
    let now=new Date();
    nowDay=now.getDate();
    nowYear=now.getFullYear();
    nowMonth=now.getMonth();
}
function isItNowDay(year, month, day){
    if (day == nowDay && month == nowMonth && year == nowYear) return true;
    else return false;
}
function checkDate(year,month,day){
    let flag=true;
    let date=new Date(year,month,day);
    if (year!=date.getFullYear()) flag=false;
    if (month!=date.getMonth()) flag=false;
    if (day!=date.getDate()) flag=false;
    return flag;
}