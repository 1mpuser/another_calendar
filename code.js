let arrOfRussianMonths = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];
let p = document.querySelector('p');
let arrOfComparedDates = [];
let indexOfMonth;
let divYear;
let nowDay;
let nowYear;
let nowMonth;
findNowDay();
let arrOfDayTransition = [6, 0, 1, 2, 3, 4, 5];
let cells = document.getElementsByClassName('cell');
let sixthWeek = document.getElementById('sixthWeek');
replacingCells(nowMonth, nowYear);
let MonthNYear = document.getElementById('MonthNYear');
indexOfMonth = nowMonth;
divYear = nowYear;
MonthNYear.innerText = arrOfRussianMonths[indexOfMonth] + ' ' + divYear;
let clicks = document.querySelectorAll('a');
clicks[0].addEventListener('click', subtractTheMonth);
clicks[1].addEventListener('click', addingTheMonth);

function addingTheMonth() {
	if (indexOfMonth >= 11) {
		indexOfMonth = 0;
		divYear++;
	} else indexOfMonth++;
	MonthNYear.innerText = arrOfRussianMonths[indexOfMonth] + ' ' + divYear;
	replacingCells(indexOfMonth, divYear);
}

function subtractTheMonth() {
	if (indexOfMonth <= 0) {
		indexOfMonth = 11;
		divYear--;
	} else indexOfMonth--;
	MonthNYear.innerText = arrOfRussianMonths[indexOfMonth] + ' ' + divYear;
	replacingCells(indexOfMonth, divYear);
}

function replacingCells(month, year) {
	sixthWeek.style.display = 'none';
	for (let elem of cells) {
		elem.innerText = ' ';
		elem.classList.remove('nowDay');
		elem.classList.remove('picked');
		elem.removeEventListener('click', addPickedClass);
	}
	let dForDay = new Date(year, month, 1);
	let indexOfDay = dForDay.getDay();
	for (let i = 1; i < 32; i++) {
		if (checkDate(year, month, i)) {
			cells[arrOfDayTransition[indexOfDay] + i - 1].innerText = i;
			if (isItNowDay(year, month, i))
				cells[arrOfDayTransition[indexOfDay] + i - 1].classList.add('nowDay');
			if (isThisDatePicked(year, month, i))
				cells[arrOfDayTransition[indexOfDay] + i - 1].classList.add('picked');
			cells[arrOfDayTransition[indexOfDay] + i - 1].addEventListener(
				'click',
				addPickedClass
			);
		}
	}
	for (let elem of cells) doYourParentElementVisible(elem);
}

function doYourParentElementVisible(elem) {
	if (elem.innerText !== ' ' && elem.innerText !== '') {
		if (elem.parentElement.style.display == 'none')
			elem.parentElement.style.display = 'block';
	}
}

function findNowDay() {
	let now = new Date();
	nowDay = now.getDate();
	nowYear = now.getFullYear();
	nowMonth = now.getMonth();
}
function isItNowDay(year, month, day) {
	if (day == nowDay && month == nowMonth && year == nowYear) return true;
	else return false;
}
function checkDate(year, month, day) {
	let flag = true;
	let date = new Date(year, month, day);
	if (year != date.getFullYear()) flag = false;
	if (month != date.getMonth()) flag = false;
	if (day != date.getDate()) flag = false;
	return flag;
}
function differenceBetweenDates(oneDateInFormatDD_MM_YY, secondDate) {
	let oneDate = oneDateInFormatDD_MM_YY;
	let arrOfOnedate = oneDate.split('_').reverse();
	let arrOfSecondDate = secondDate.split('_').reverse();
	let one = new Date(...arrOfOnedate);
	let two = new Date(...arrOfSecondDate);
	let diff = Math.abs(two - one);
	let round = Math.round(diff / 86400000);
	return round;
}
function isThisDatePicked(year, month, day) {
	let flag = false;
	for (let n of arrOfComparedDates) {
		let arr = n.split('_').reverse;
		if (arr[0] == year && arr[1] == month && arr[2] == day) {
			flag = true;
			break;
		}
	}
	return flag;
}
function addPickedClass() {
	let length = arrOfComparedDates.length;
	let picked = document.getElementsByClassName('picked');
	if (length == 0 || length == 1) {
		console.log('if');
		if (length == 0) {
			for (let elem of picked) elem.classList.remove('picked');
		}
		this.classList.add('picked');
		let day = this.innerText;
		let month = indexOfMonth;
		let year = divYear;
		let string = day + '_' + month + '_' + year;
		arrOfComparedDates.push(string);
		if (arrOfComparedDates.length == 2) {
			let diff = differenceBetweenDates(...arrOfComparedDates);
			p.innerText = 'Между выбранами датами: ' + diff;
		}
	} else {
		console.log('else');
		//console.log(picked);
		for (let elem of picked) elem.classList.remove('picked');
		picked[0].classList.remove('picked');
		console.log(picked);
		this.classList.add('picked');
		let day = this.innerText;
		let month = indexOfMonth;
		let year = divYear;
		let string = day + '_' + month + '_' + year;
		arrOfComparedDates.length = 0;
		arrOfComparedDates.push(string);
		//console.log(document.getElementsByClassName('picked'));
	}
}
