"use strict";

(function ($, Drupal) {
  Drupal.behaviors.otsukaTooltip = {
    attach: function attach(context) {
      $(once('tooltip', '.tooltip')).each(function () {
        var $tooltip = $(this);
        var $icon = $tooltip.find('.tooltip-icon');
        var $closeButton = $tooltip.find('.tooltip-close');
        $icon.on('click mouseover', function () {
          $('.tooltip.active').removeClass('active');
          $tooltip.addClass('active');
        });
        $closeButton.on('click', function (e) {
          $tooltip.removeClass('active');
        });
      });
    }
  };
})(jQuery, Drupal);
