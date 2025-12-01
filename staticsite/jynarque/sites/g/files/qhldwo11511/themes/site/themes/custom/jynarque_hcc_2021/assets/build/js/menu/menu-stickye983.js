"use strict";

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.otsukaStickyHeader = {
    attach: function attach(context, settings) {
      var $mainHeader = $('header.header', context);

      if ($(once('scroll-hide', 'header.header', context)).length) {
        var menuBehavior = drupalSettings.jynarque_hcc_2021.menu_behavior;

        if (menuBehavior !== 'Sticky') {
          return;
        }

        var prevScrollpos = window.pageYOffset;
        var scrollOffset = 200;
        var scrolling = false;
        var $copyHeader = $mainHeader.clone(true).addClass('position-fixed').addClass('js--header-hidden').css('display', 'none');
        $copyHeader.find('[data-test]').each(function () {
          $(this).removeAttr('data-test');
        });
        $('#mobile-menu', context).find('[data-test="main-menu"]').attr('data-test', 'mobile-main-menu');
        $(document.body).prepend($copyHeader);
        $copyHeader.find('a').attr('tabindex', '-1');

        var autoHideHeader = function autoHideHeader() {
          var currentScrollPos = window.pageYOffset;

          if (currentScrollPos <= 0) {
            $copyHeader.hide();
          } else if (currentScrollPos > scrollOffset) {
            $copyHeader.addClass('js--header-hidden');
            $copyHeader.show();
          }

          if (prevScrollpos > currentScrollPos) {
            $copyHeader.removeClass('js--header-hidden');
          } else {
            if (currentScrollPos > scrollOffset) {
              $copyHeader.addClass('js--header-hidden');
            }
          }

          prevScrollpos = currentScrollPos;
          scrolling = false;
        };

        $(window).on('scroll', function () {
          if (!scrolling) {
            scrolling = true;

            if (!window.requestAnimationFrame) {
              setTimeout(autoHideHeader, 250);
            } else {
              requestAnimationFrame(autoHideHeader);
            }
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
