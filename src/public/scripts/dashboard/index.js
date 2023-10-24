const funnyTitle = document.querySelector('.title-funny');
const buttonElement = document.querySelector('.button-getting-started');

const title = 'Funny Images'
funnyTitle.style.color = 'red';

title.split('').forEach((letter, index) => {
    setTimeout(() => {
        funnyTitle.innerHTML += letter;
    }, 75 * index);

    setTimeout(() => {
      buttonElement.style.display = 'block';
    }, 1000);
});