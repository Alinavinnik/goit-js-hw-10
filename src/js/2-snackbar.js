import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.docinput-delay');
const inputFulfilled = document.querySelector('[value="fulfilled"]');

form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  CreatePromice();
}

function CreatePromice() {
  const timeDelay = Number(inputDelay.value);
  const promise = new Promise((res, rej) =>
    setTimeout(() => {
      if (inputFulfilled.checked) {
        res(
          iziToast.show({
            message: `✅ Fulfilled promise in ${timeDelay} ms`,
            position: 'topLeft',
            backgroundColor: 'rgba(9, 189, 19, 0.8)',
          })
        );
      } else {
        rej(
          iziToast.show({
            message: `❌ Rejected promise in ${timeDelay}ms`,
            position: 'topLeft',
            backgroundColor: 'rgba(197, 26, 20, 0.8)',
          })
        );
      }
    }, timeDelay)
  );
  return promise;
}
