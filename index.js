const timer = document.querySelector(".timer");
const timerDaysValue = timer.querySelector(".timer__days-value");
const timerHoursValue = timer.querySelector(".timer__hours-value");
const timerMinutesValue = timer.querySelector(".timer__minutes-value");
const timerSecondsValue = timer.querySelector(".timer__seconds-value");
const NYbutton = document.querySelector("#ny-button");
const corpButton = document.querySelector("#corp-button");
const NewYear = "2024-12-31 23:59:59";
const Corp = "2024-12-20 16:59:59";
let currentTimer = undefined;
let currentTime = "";

corpButton.addEventListener("click", () => {
	changeTimer(Corp, corpButton, NYbutton);
});

NYbutton.addEventListener("click", () => {
	changeTimer(NewYear, NYbutton, corpButton);
});

function updateTimerClock(endTime) {
	if (currentTime == "") {
		currentTime = endTime;
	}

	var t = getRemainingTime(currentTime);

	if (t.days < 10) {
		t.days = ("0" + t.days).slice(-2);
	}
	t.hours = ("0" + t.hours).slice(-2);
	t.minutes = ("0" + t.minutes).slice(-2);
	t.seconds = ("0" + t.seconds).slice(-2);
	if (t.total <= 0) {
		clearInterval(timerinterval);
	}
	timerDaysValue.textContent = t.days;
	timerHoursValue.textContent = t.hours;
	timerMinutesValue.textContent = t.minutes;
	timerSecondsValue.textContent = t.seconds;

	if (currentTimer == undefined) {
		currentTimer = setInterval(updateTimerClock, 1000);
	}
}

function getRemainingTime(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date());
	const seconds = t < 0 ? 0 : Math.floor((t / 1000) % 60);
	const minutes = t < 0 ? 0 : Math.floor((t / 1000 / 60) % 60);
	const hours = t < 0 ? 0 : Math.floor((t / (1000 * 60 * 60)) % 24);
	const days = t < 0 ? 0 : Math.floor(t / (1000 * 60 * 60 * 24));

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

function changeTimer(endTime, pressedButton, anotherButton) {
	pressedButton.classList.add("container__button_active");
	pressedButton.classList.remove("container__button_deactive");
	anotherButton.classList.remove("container__button_active");
	anotherButton.classList.add("container__button_deactive");

	if (currentTimer !== undefined) {
		clearInterval(currentTimer);
		currentTimer = undefined;

		currentTime = endTime;
		updateTimerClock(endTime);
	}
}

currentTime = NewYear;
updateTimerClock(NewYear);
