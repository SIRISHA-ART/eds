"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.detectBrowser = {
    attach: function attach(context, settings) {
      $(once('safariBrowserDetect', 'body')).each(function () {
        var appleExpression = /Apple/i;
        var safariExpression = /Safari/i;

        var isAppleSafari = function isAppleSafari() {
          return appleExpression.test(navigator.vendor) && safariExpression.test(navigator.userAgent);
        };

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          $('body').addClass('firefox');
        }

        if (isAppleSafari()) {
          $('body').addClass('safari');
        }
      });
    }
  };
  Drupal.behaviors.otsukaJynarqueHCC = {
    attach: function attach(context, settings) {
      $(window).on('scroll', function (e) {
        $('body').toggleClass('scrolled', window.scrollY > 0);
      });
      var $bji = $('.block-content-jynarque-interstitial', context);
      var $bjm = $('.block-content-jynarque-interstitial-modal', context);
      $('p.interstitial-minified, p.interstitial-collapse', context).attr('tabindex', '0');

      if ($bji.length && $bjm.length) {
        $bji.show();
        var $bjmLearnMore = $('.interstitial-learn-more', $bjm);
        var $bjmClose = $('.interstitial-close-button', $bjm);
        var $bjiOpen = $('.interstitial-learn-more', $bji);
        var $bjiClose = $('.interstitial-collapse', $bji);
        var $bjiInterstitialMinified = $('.interstitial-minified', $bji);

        var closeBjm = function closeBjm() {
          $('html, body').css({
            overflow: 'auto',
            height: 'auto'
          });
          $bjm.removeClass('active');
          $bjiOpen.focus();
        };

        $bjmLearnMore.on('click', function (e) {
          if ($(this).attr('href').indexOf(window.location.pathname) !== -1 && window.location.pathname.length > 1) {
            $bjmClose.triggerHandler('click');
          }
        });

        var minifyInterstitial = function minifyInterstitial() {
          var minifyTemporarily = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          $bji.addClass('minified');
          $bji.find('.show').removeClass('show').addClass('hidden');
          $bjiInterstitialMinified.addClass('show').removeClass('hidden');

          if (!minifyTemporarily) {
            localStorage.setItem('bjiInterstitial_minified', '1');
          }
        };

        var expandInterstitial = function expandInterstitial() {
          $bji.removeClass('minified');
          $bji.find('.hidden').removeClass('hidden').addClass('show');
          $bjiInterstitialMinified.removeClass('show').addClass('hidden');
          localStorage.setItem('bjiInterstitial_minified', '0');
        };

        if (localStorage.getItem('bjiInterstitial_minified') === '1') {
          minifyInterstitial();
        }

        $bjiClose.on('click', function () {
          minifyInterstitial();
        });
        $bjiClose.attr('tabindex', '0');
        $bjiClose.on('keypress', function (e) {
          if (e.which == 13) {
            minifyInterstitial();
          }
        });
        $bjiInterstitialMinified.on('click', function () {
          expandInterstitial();
        });
        $bjiOpen.on('click', function () {
          $bjm.addClass('active');
        });
        $bjmClose.on('click', function () {
          closeBjm();
        });
        $('.isi-btn.jsIsiMinimize', context).click(function () {
          setInterval(function () {
            if ($('#drawer-isi', context).hasClass('isi-drawer-expanded')) {
              minifyInterstitial(true);
            }
          }, 400);
        });
        $('p.interstitial-minified', context).click(function (e) {
          if (!$('#drawer-isi', context).hasClass('isi-drawer-collapsed')) {
            $('.isi-btn', context).trigger('click');
          }

          expandInterstitial();
        });
        $('p.interstitial-minified', context).on('keypress', function (e) {
          if (e.which == 13) {
            if (!$('#drawer-isi', context).hasClass('isi-drawer-collapsed')) {
              $('.isi-btn', context).trigger('click');
            }

            expandInterstitial();
          }
        });
        $(document).on("keydown", function (evt) {
          evt = evt || window.event;
          var isEscape = false;

          if ("key" in evt) {
            isEscape = evt.key == "Escape" || evt.key == "Esc";
          } else {
            isEscape = evt.keyCode == 27;
          }

          if (isEscape && $bjm.hasClass('active') === true) {
            closeBjm();
          }
        });
        var isi_position = $('#inline-isi-wrapper').offset().top;
        var window_height = window.innerHeight;
        window.addEventListener("scroll", function () {
          var y_scroll_pos = window.pageYOffset;

          if (y_scroll_pos > isi_position - window_height) {
            if (!$('body').hasClass('user-is-tabbing')) {
              $bji.fadeOut();
            }
          } else {
            $bji.fadeIn();
          }
        });
      }
    }
  };
})(jQuery, Drupal);
