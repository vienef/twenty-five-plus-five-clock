'use strict';

import { drawTicks, drawCircle } from './display.js';
import { changeDuration, countDown, reset } from './button.js';
import { changeTime } from './helper.js';

const main = () => {
  $('main').append('<span id="minute-stick"></span>');
  $('main').append('<span id="seconds-stick"</span>');
  $('section:not(:last-of-type) > form > button').on('click', changeDuration);
  $('#start_stop').on('click', countDown);
  $('#reset').on('click', reset);
  drawTicks('section:first-of-type', 60, 6);
  drawTicks('section:nth-child(4)', 60, 6);
  drawTicks('section:last-of-type', 60, 6);
  drawTicks('main', 300, 1.2);
  drawCircle(Math.round(Number($(window).width()) / 15));
  changeTime($('#session-length').text());
};

$(document).ready(main);