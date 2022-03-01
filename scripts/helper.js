'use strict';

const generateRandomNumber = (max = 0) => Math.floor(Math.random() * max); // Generate a random number.

const toMinutes = (second = 0) => {
  const minutes = Math.floor(second % (60 * 60) / 60),
  remaining_seconds = second % (60 * 60) % 60,
  seconds = Math.ceil(remaining_seconds);

  return {
    m: minutes < 10 ? '0' + minutes.toString() : minutes.toString(),
    s: seconds < 10 ? '0' + seconds.toString() : seconds.toString()
  };
}; // Change the value to minutes and seconds.

const changeColor = (index = 0, target = '') => {  
  const spans = document.querySelectorAll(`#${target}>SPAN`),
  number = index >= spans.length
    ? 0
    : index <= 0 
      ? 1
      : index,
  span = spans[number];

  spans.forEach(span => {
    span.style.setProperty('--background', '');
    span.style.setProperty('--shadow', '');
  });
  span.style.setProperty('--background', '#00F');
  span.style.setProperty('--shadow', '0 0 1vh #F8CF40');
}; // Change the background color of the ticks.

const changeTime = (minutes = '', seconds = '00', label = 'Session') => {
  $('#timer-label').text(label);
  $('#time-left').text(() => `${minutes}:${seconds}`);
  $('#minute-stick').css('transform', `rotate(${Number(minutes) * 6}deg)`);
  $('#seconds-stick').css('transform', `${seconds === '00' ? 'none' : `rotate(${Number(seconds) * 6}deg)`}`);
  changeColor(Number(minutes), 'time');
}; // Change the display of the time left.

const chooseTicksSize = (index = 0, element = '', limiter = 0) => {
  if (limiter > 60 && index % 25 === 0) {
    element.css('--height', '2vh');
    element.css('--width', '100%');
    element.css('--left', '0');
  } else if (index % 5 === 0) {
    element.css('--height', '1vh');
    element.css('--width', '50%');
    element.css('--left', '25%');
  } else {
    element.css('--height', '0.5vh');
    element.css('--width', '25%');
    element.css('--left', '37.5%');
  }
}; // Determine the size of the ticks.

export { generateRandomNumber, toMinutes, changeColor, changeTime, chooseTicksSize };