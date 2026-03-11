import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refers = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('.btn-start'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

const { input, btnStart, timerDays, timerHours, timerMinutes, timerSeconds } =
  refers;
let userSelectedDate;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
    if (userSelectedDate <= Date.now()) {
      izitoast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgba(255, 18, 49, 0.8)',
        position: 'topRight',
        timeout: 0,
        messageColor: 'white',
      });

      btnStart.disabled = true;
      return;
    } else {
      btnStart.disabled = false;
    }
  },
};
flatpickr(input, options);

btnStart.addEventListener('click', handleClick);
function handleClick() {
  input.disabled = true;
  btnStart.disabled = true;
  const idInterval = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const convertData = convertMs(diff);
    const { days, hours, minutes, seconds } = convertData;
    timerDays.innerHTML = addLeadingZero(days);
    timerHours.innerHTML = addLeadingZero(hours);
    timerMinutes.innerHTML = addLeadingZero(minutes);
    timerSeconds.innerHTML = addLeadingZero(seconds);
    if (diff <= 0) {
      clearInterval(idInterval);
      input.disabled = false;
      [timerDays, timerHours, timerMinutes, timerSeconds].forEach(el => {
        el.innerHTML = '00';
      });
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
