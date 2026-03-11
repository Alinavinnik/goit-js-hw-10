import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.docinput-delay');
const inputFulfilled = document.querySelector('[value="fulfilled"]');
const inputRejected = document.querySelector('[value="rejected"]');

form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const timeDelay = Number(inputDelay.value);
  const fulfilledChecked = inputFulfilled.checked;
  const rejectedChecked = inputRejected.checked;

  const userMessage = createPromise(
    timeDelay,
    fulfilledChecked,
    rejectedChecked
  );
  userMessage
    .then(res =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${res} ms`,
        position: 'topLeft',
        backgroundColor: 'rgba(9, 189, 19, 0.8)',
      })
    )
    .catch(rej =>
      iziToast.show({
        message: `❌ Rejected promise in ${rej} ms`,
        position: 'topLeft',
        backgroundColor: 'rgba(197, 26, 20, 0.8)',
      })
    );
}

function createPromise(delay, fulfilledChecked, rejectedChecked) {
  const promise = new Promise((res, rej) =>
    setTimeout(() => {
      if (fulfilledChecked) {
        res(delay);
      } else if (rejectedChecked) {
        rej(delay);
      }
    }, delay)
  );
  return promise;
}
