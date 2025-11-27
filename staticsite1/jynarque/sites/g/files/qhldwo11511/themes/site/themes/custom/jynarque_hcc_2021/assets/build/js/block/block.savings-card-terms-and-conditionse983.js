"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.savingsCardTermsAndConditionsPopup = {
    attach: function attach(context, settings) {
      once('savingsCardTermsAndConditionsPopup', '#savings-card-terms-and-conditions', context).forEach(function (element) {
        if (window.location.hash === '#savings-card-terms-and-conditions') {
          $(element).modal('show');
        }
      });
    }
  };
})(jQuery, Drupal);
