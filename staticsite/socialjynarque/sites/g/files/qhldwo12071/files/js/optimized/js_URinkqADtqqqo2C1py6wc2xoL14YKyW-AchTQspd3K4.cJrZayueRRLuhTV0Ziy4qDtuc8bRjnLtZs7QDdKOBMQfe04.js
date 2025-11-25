/* Source and licensing information for the line(s) below can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/focus.js. */
"use strict";

var userClickClass = 'user-is-clicking';
var userTabClass = 'user-is-tabbing';

function isClicking() {
  document.body.classList.add(userClickClass);
  document.body.classList.remove(userTabClass);
}

function isTabbing(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode === 9) {
    document.body.classList.add(userTabClass);
    document.body.classList.remove(userClickClass);
  }
}

document.onmousedown = isClicking;
document.onkeydown = isTabbing;

/* Source and licensing information for the above line(s) can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/focus.js. */