"use strict";

(function ($, Drupal, once) {
  Drupal.behaviors.analyticsCustom = {
    attach: function attach(context) {
      document.addEventListener('dialog:aftercreate', function (e) {
        var cancel = e.target.closest('[role="dialog"]').querySelector('button.ui-dialog-titlebar-close');
        Drupal.analytics.addDataAnalyticsLink(cancel, {
          name: 'Cancel'
        });
      });
      $(once('analyticsCustom', '.webform-button--submit', context)).each(function () {
        Drupal.analytics.addDataAnalyticsLink(this, {
          name: 'submit'
        });
        $(this).addClass('data-analytics-click-link');
      });
      $(once('analyticsCustom', '.otsuka-jynarque-hcc-calendar-form .form-submit', context)).each(function () {
        Drupal.analytics.addDataAnalyticsLink(this, {
          name: 'download'
        });
        $(this).addClass('data-analytics-click-link');
      });
      $(once('analyticsCustom', '.react-player-preview button.play', context)).each(function () {
        Drupal.analytics.addDataAnalyticsLink(this, {
          name: 'Play'
        });
      });
    }
  };
})(jQuery, Drupal, once);
