"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.patientStorySlider = {
    attach: function attach(context) {
      var $slider = $('.patient--story .slides > .field--name-field-paragraphs:first-of-type', context);
      $(once('patientStorySlider', '.patient--story .slides > .field--name-field-paragraphs:first-of-type', context)).each(function () {
        var $this = $(this);
        var slider = $this.slick({
          dots: false,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          responsive: [{
            breakpoint: 767,
            settings: {
              dots: true
            }
          }]
        });
        $this.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          if (nextSlide >= 1) {
            $this.closest('.slides').addClass('show-prev-button');
          } else {
            $this.closest('.slides').removeClass('show-prev-button');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
