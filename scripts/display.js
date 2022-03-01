'use strict';

import { generateRandomNumber, chooseTicksSize } from './helper.js';

const drawTicks = (selector = '', limiter = 0, incrementor = 0) => {
  for (let i = 0; i < limiter; i++) {
    const span = $(document.createElement('SPAN')),
    text = $(`${selector} > p`).text();
    $(`${selector} > div`).append(span);
    span.css('transform', `rotate(${i * incrementor}deg)`);
    chooseTicksSize(i, span, limiter);
    if (i === Number(/:/.test(text) ? text.slice(0, text.indexOf(':')) : text) && selector !== 'main') {
      span.css('--background', '#00F');
      span.css('--shadow', '0 0 1vh #F8CF40');
    }
  }
}; // Render the ticks.

const drawCircle = (limiter = 0) => {
  if (limiter > 0) {
    const div = $(document.createElement('DIV')),
    number = generateRandomNumber(25);
    div.css('--div-height', `${number}vh`);
    div.css('--div-width', `${number}vh`);
    div.css('--div-top', `${generateRandomNumber($(window).height())}px`);
    div.css('--div-left', `${generateRandomNumber($(window).width())}px`);
    $('body > div').append(div);
    drawCircle(limiter - 1);
  } else { return 0; }
}; // Render the circle pattern.

export { drawTicks, drawCircle };