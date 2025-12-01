"use strict";

(function ($, Drupal) {
  Drupal.behaviors.otsukaISI = {
    attach: function attach(context, settings) {
      var first_entry_desktop = localStorage.getItem('firstEntry_desktop');

      if (first_entry_desktop !== '0') {
        $(document).ready(function () {
          $(once('html', '.jsIsiMinimize')).click();
          localStorage.setItem('firstEntry_desktop', '0');
        });
      }
    }
  };
})(jQuery, Drupal);
