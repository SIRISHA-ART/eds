/* Source and licensing information for the line(s) below can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/focus.advanced.js. */
"use strict";

var oneTrustSelectorVisible = "#onetrust-banner-sdk:visible, #onetrust-pc-sdk:visible";
var oneTrustButtonSelector = '.ot-floating-button__open';

(function ($) {
  var focusableSelector = "a[href], area[href], input, select, textarea, button, iframe, video, object, embed, [tabindex], *[contenteditable]";
  var notFocusableSelector = '[tabindex=-1], [disabled], :hidden';

  var allFocusableElements = function allFocusableElements(context) {
    return $(focusableSelector, context).not(notFocusableSelector);
  };

  var focusOnFirstIn = function focusOnFirstIn() {
    var wrapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    $(focusableSelector, wrapper).not(notFocusableSelector).first().focus();
  };

  var focusOnLastIn = function focusOnLastIn() {
    var wrapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    $(focusableSelector, wrapper).not(notFocusableSelector).last().focus();
  };

  var focusTrap = function focusTrap(e, $wrapper) {
    var $focusableElements = allFocusableElements($wrapper);
    var isTargetInWrapper = $(e.target).closest($wrapper).length;

    if (isTargetInWrapper) {
      if ($focusableElements.first()[0] === e.target && e.shiftKey) {
        e.preventDefault();
        $focusableElements.last().focus();
      }

      if ($focusableElements.last()[0] === e.target && !e.shiftKey) {
        e.preventDefault();
        $focusableElements.first().focus();
      }
    } else if (e.shiftKey) {
      e.preventDefault();
      focusOnLastIn($wrapper);
    } else {
      e.preventDefault();
      focusOnFirstIn($wrapper);
    }
  };

  Drupal.behaviors.focusAdvancedBehavior = {
    attach: function attach(context) {
      var $body = $('body', context);
      var $firstLink = $body.find('a').first();
      $body.on('keydown', function (e) {
        var $oneTrust = $body.find(oneTrustSelectorVisible);
        var $oneTrustBtn = $body.find(oneTrustButtonSelector);

        if ($oneTrust.length) {
          if (e.key === 'Tab') {
            focusTrap(e, $oneTrust);
          }

          if (e.key === 'Enter') {
            setTimeout(function () {
              if ($("".concat(oneTrustButtonSelector, ":visible")).length) {
                $oneTrustBtn.focus();
              }
            }, 200);
          }
        }

        if (!$oneTrust.length && $oneTrustBtn.length) {
          if ($oneTrustBtn[0] === e.target && e.key === 'Tab') {
            e.preventDefault();

            if (e.shiftKey) {
              focusOnLastIn('body');
            } else {
              focusOnFirstIn('body');
            }
          }
        }
      });
      $firstLink.on('keydown', function (e) {
        if (e.key === 'Tab' && e.shiftKey) {
          e.preventDefault();
          var $oneTrustBtn = $body.find(oneTrustButtonSelector);

          if ($oneTrustBtn.length) {
            $oneTrustBtn.focus();
          }
        }
      });
    }
  };
})(jQuery);

/* Source and licensing information for the above line(s) can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/focus.advanced.js. */