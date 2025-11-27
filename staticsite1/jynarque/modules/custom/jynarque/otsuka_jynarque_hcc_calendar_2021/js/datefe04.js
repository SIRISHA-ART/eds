/**
* Datepicker for date field.
**/

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaJynarqueHccCalendar = {
    attach: function attach(context, settings) {
      var $context = $(context);

      $(once('datePicker', 'input[name="date"]', context)).each(function () {
        var $input = $(this);
        var datepickerSettings = {
          dateFormat: 'mm/dd/yy'
        };

        if ($input.attr('min')) {
          datepickerSettings.minDate = $input.attr('min');
        }
        if ($input.attr('max')) {
          datepickerSettings.maxDate = $input.attr('max');
        }
        $input.datepicker(datepickerSettings);

        $input.click(function () {
          $input.datepicker('show');
        });

        var match = new RegExp(datepickerSettings.dateFormat
          .replace(/(\w+)\W(\w+)\W(\w+)/, '^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*')
          .replace(/m|d|y/g, '\\d'));
        var replace = '$1/$2/$3$4'
          .replace(/\//g, datepickerSettings.dateFormat.match(/\W/));

        function doFormat(target) {
          target.value = target.value
            .replace(/(^|\W)(?=\d\W)/g, '$10') // padding
            .replace(match, replace) // fields
            .replace(/(\W)+/g, '$1'); // remove repeats
        }

        $(once('datePickerInputFormat', $(this))).keyup(function (e) {
          if (!e.ctrlKey && !e.metaKey && (e.keyCode === 32 || e.keyCode > 46)) {doFormat(e.target);}
        });
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        $(context).find('input[name="date"]').findOnce('datePicker').datepicker('destroy');
      }
    }
  };
})(jQuery, Drupal);
