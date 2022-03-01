'use strict';

import { toMinutes, changeColor, changeTime } from './helper.js';

let sessionSeconds = Number($('#session-length').text()) * 60,
breakSeconds = Number($('#break-length').text()) * 60,
timer = 0,
isCounting = false;

const changeDuration = e => {
  const id = e.target.id,
  separator = id.indexOf('-'),
  target = id.slice(0, separator),
  selector = `#${target}-length`,
  number = Number($(selector).text());

  if (!isCounting) {
    if (id.slice(separator + 1) === 'decrement') {
      $(selector).text(() => `${number > 1 ? number - 1 : number}`);
      changeColor(number - 1, target);
    } else {
      $(selector).text(() => `${number < 60 ? number + 1 : number}`);
      changeColor(number + 1, target);
    }
    if (target === 'session') { changeTime($(selector).text()); }    
    sessionSeconds = Number($('#session-length').text()) * 60;
    breakSeconds = Number($('#break-length').text()) * 60;
  }
  
  e.preventDefault();
}; // Increase or decrease the session and the break.

const countDown = e => {
  isCounting = !isCounting;
  
  $('#start_stop > i').attr('class', `${isCounting ? 'fa-solid fa-pause' : 'fa-solid fa-play'}`);

  timer === 0 && sessionSeconds > 0 && isCounting || sessionSeconds > 0 && isCounting
    ? timer = setInterval(countCurrentSession, 1000)
    : sessionSeconds === 0 && breakSeconds > 0 && isCounting || breakSeconds > 0 && isCounting
      ? timer = setInterval(countCurrentBreak, 1000)
      : clearInterval(timer);

  if (!isCounting) {
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  e.preventDefault();
}; // Start the countdown.

const countCurrentSession = () => {
  sessionSeconds--;

  const timeLeft = toMinutes(sessionSeconds);

  changeTime(timeLeft.m, timeLeft.s, 'Session');

  if (sessionSeconds === 0) {
    document.getElementById('beep').play();
    clearInterval(timer);
    setTimeout(countNextBreak, 1000);
  }
}; // Countdown the session.

const countCurrentBreak = () => {
  breakSeconds--;

  const timeLeft = toMinutes(breakSeconds);

  changeTime(timeLeft.m, timeLeft.s, 'Break');

  if (breakSeconds === 0) {
    document.getElementById('beep').play();
    clearInterval(timer);
    setTimeout(countNextSession, 1000);
  }
}; // Countdown the break.

const countNextSession = () => {
  timer = setInterval(countCurrentSession, 1000);
  sessionSeconds = Number($('#session-length').text()) * 60;
}; // Reset the session value.

const countNextBreak = () => {
  timer = setInterval(countCurrentBreak, 1000);
  breakSeconds = Number($('#break-length').text()) * 60;
}; // Reset the break value.

const reset = e => {
  e.preventDefault();
  $('#break-length').text('5');
  $('#session-length').text('25');
  $('#start_stop > i').attr('class', 'fa-solid fa-play');
  changeColor(Number($('#break-length').text()), 'break');
  changeColor(Number($('#session-length').text()), 'session');
  changeTime($('#session-length').text());
  clearInterval(timer);
  
  document.getElementById('beep').pause();
  document.getElementById('beep').currentTime = 0;

  sessionSeconds = Number($('#session-length').text()) * 60;
  breakSeconds = Number($('#break-length').text()) * 60;
  isCounting = false;
}; // Reset all elements to their initial value.

export { changeDuration, countDown, reset };