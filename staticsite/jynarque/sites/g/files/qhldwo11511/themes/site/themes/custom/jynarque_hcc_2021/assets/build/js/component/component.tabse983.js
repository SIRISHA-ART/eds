"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.componentTabs = {
    attach: function attach(context, settings) {
      var $tabs = $('.custom-wrapper-type-tabs', context);
      $(once('componentTabs', '.custom-wrapper-type-tabs .nav-link', context)).on('click', function () {
        $(this).parent().siblings().removeClass('is-active');
        $(this).parent().addClass('is-active');
        window.location.hash = $(this).attr('data-anchor-link');
      });

      function switchTabs() {
        var currentHash = location.hash.substring(1);
        var $activeButton, $activeTab;

        if (currentHash) {
          $activeButton = $("button[data-anchor-link='".concat(currentHash, "']"), $tabs);
          $activeTab = $("div[data-anchor-link='".concat(currentHash, "']"), $tabs);
        } else {
          $activeButton = $('.nav-link', $tabs).first();
          $activeTab = $('.tab-content .tab-pane', $tabs).first();
        }

        if ($activeButton.length && $activeTab.length) {
          $('.nav-link', $tabs).removeClass('active').parent().removeClass('is-active');
          $('.tab-content .tab-pane', $tabs).removeClass('show active');
          $activeButton.addClass('active').parent().addClass('is-active');
          $activeTab.addClass('show active');
        }
      }

      if (location.hash) {
        switchTabs();
      }

      if (once('componentTabs', 'html').length) {
        $(window).on('popstate', function () {
          switchTabs();
        });
      }
    }
  };
})(jQuery, Drupal);
