"use strict";

function customRules(element) {
  return !(element.classList.contains('interstitial-minified') || element.classList.contains('interstitial-learn-more') || element.classList.contains('interstitial-collapse'));
}

function isClicking() {
  document.body.classList.add('user-is-clicking');
  document.body.classList.remove('user-is-tabbing');
}

function isTabbing(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    document.body.classList.remove('user-is-clicking');
  }
}

document.onmousedown = isClicking;
document.onkeydown = isTabbing;
var previousElementOffsetTop = 0;

Element.prototype.documentOffsetTop = function () {
  return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
};

Element.prototype.scrollIntoCustomPosition = function () {
  if (customRules(document.activeElement)) {
    var documentOffsetTop = this.documentOffsetTop();
    var elementOffsetHeight = document.activeElement.offsetHeight;
    var resultPosition = documentOffsetTop - window.innerHeight / 2 + elementOffsetHeight / 2;

    if (Math.abs(previousElementOffsetTop - documentOffsetTop) > 100 || elementOffsetHeight > 100) {
      window.scrollTo(0, resultPosition);
      previousElementOffsetTop = documentOffsetTop;
    }
  }
};

function jumpFocusAlt(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode === 9) {
    if (document.body.classList.contains('user-is-tabbing')) {
      document.activeElement.scrollIntoCustomPosition();
    }
  }
}

window.addEventListener('keyup', jumpFocusAlt);
