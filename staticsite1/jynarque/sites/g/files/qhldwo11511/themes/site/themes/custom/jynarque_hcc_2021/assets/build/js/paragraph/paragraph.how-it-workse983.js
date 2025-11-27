"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaParagraphsInlineSVG = {
    attach: function attach(context) {
      var isElementInView = function isElementInView($element, direction) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $element.offset().top;
        var elementBottom = elementTop + $element.height();
        return direction === 'down' && pageBottom > elementBottom || direction === 'up' && pageTop < elementTop;
      };

      var lastScrollTop = 0;
      $(window).on('scroll', function (e) {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        var direction = 'up';

        if (st > lastScrollTop) {
          direction = 'down';
        }

        lastScrollTop = st <= 0 ? 0 : st;
        $.each($('.animate-on-hover', context), function (index, el) {
          var $el = $(el);

          if (isElementInView($el, direction)) {
            $el.addClass('animate');
          } else {
            $el.removeClass('animate');
          }
        });
      });
      var $slider = $('.how-it-works__panels > .field--name-field-panelpanel-how-it-works', context);
      $(once('otsukaParagraphsInlineSVG', '.how-it-works__panels > .field--name-field-panelpanel-how-it-works', context)).each(function () {
        var $this = $(this);
        var slider = $this.slick({
          dots: false,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          fade: true,
          nextArrow: "<button class=\"slick-next slick-arrow\" aria-label=\"Next\" type=\"button\" aria-disabled=\"false\">".concat(Drupal.t("Click to see how JYNARQUE works"), "</button>"),
          responsive: [{
            breakpoint: 959,
            settings: {
              prevArrow: "<button class=\"slick-prev slick-arrow\" aria-label=\"Prev\" type=\"button\" aria-disabled=\"false\">".concat(Drupal.t("Swipe to see previous"), "</button>"),
              nextArrow: "<button class=\"slick-next slick-arrow\" aria-label=\"Next\" type=\"button\" aria-disabled=\"false\">".concat(Drupal.t("Swipe to see more"), "</button>")
            }
          }]
        });
        $this.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          if (nextSlide >= 1) {
            $this.closest('.how-it-works').addClass('slide-2');
            $this.closest('.how-it-works__panels').find('.animate-on-hover').removeClass('animate');
            setTimeout(function () {
              $this.closest('.how-it-works__panels').find('.animate-on-hover-2').addClass('animate');
            }, 400);
          } else {
            $this.closest('.how-it-works').removeClass('slide-2');
            $this.closest('.how-it-works__panels').find('.animate-on-hover-2').removeClass('animate');
            setTimeout(function () {
              $this.closest('.how-it-works__panels').find('.animate-on-hover').addClass('animate');
            }, 400);
          }
        });
      });
    }
  };
})(jQuery, Drupal);
