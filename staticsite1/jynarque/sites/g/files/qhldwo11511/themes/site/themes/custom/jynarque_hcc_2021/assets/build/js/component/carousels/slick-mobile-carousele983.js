"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaCarouselWrapperParagraph = {
    attach: function attach(context) {
      var $window = $(window);
      var $slick = $('[data-slider="doses"] > div');
      var slickIsActive = false;

      var slickInit = function slickInit() {
        slickIsActive = true;
        $slick.slick({
          dots: true,
          infinite: false,
          speed: 300,
          autoplay: false,
          autoplaySpeed: 5000,
          fade: false,
          cssEase: 'linear',
          pauseOnHover: true,
          arrows: false,
          slidesToShow: 1,
          mobileFirst: true,
          centerMode: true,
          variableWidth: true,
          responsive: [{
            breakpoint: 959,
            settings: "unslick"
          }]
        });
      };

      var fixUnslick = function fixUnslick() {
        slickIsActive = false;
        $slick.find('[role="tabpanel"]').each(function () {
          var $this = $(this);
          $this.removeAttr('tabindex');
          $this.removeAttr('aria-describedby');
          $this.removeAttr('id');
        });
      };

      var sizeCheck = function sizeCheck() {
        var windowWidth = $window.width();

        if (windowWidth < 960 && slickIsActive === false) {
          slickInit();
        } else if (windowWidth >= 959 && slickIsActive === true) {
          fixUnslick();
        }
      };

      var endResizeEvent;
      $window.on('resize', function () {
        clearTimeout(endResizeEvent);
        endResizeEvent = setTimeout(function () {
          sizeCheck();
        }, 100);
      });
      sizeCheck();
    }
  };
})(jQuery, Drupal);
