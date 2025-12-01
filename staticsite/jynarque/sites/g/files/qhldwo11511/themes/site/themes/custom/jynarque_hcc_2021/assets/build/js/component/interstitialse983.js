'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.interstitials = {
    attach: function attach(context, settings) {
      $(window).on('dialog:aftercreate', function (event, dialog, $element) {
        if ($element.hasClass('external-link-popup-content')) {
          var $parent = $element.closest('.external-link-popup');

          if ($parent.length) {
            $parent.attr('data-test', 'modal');
            $('.external-link-popup-body', $parent).attr('data-test', 'modal-body');
            $('.external-link-popup-body h2', $parent).attr('data-test', 'modal-title');
            $('.ui-dialog-buttonset button', $parent).attr('data-test', 'modal-accept');
            $('.ui-dialog-titlebar-close', $parent).attr('data-test', 'modal-cancel');
            $('button.close', $parent).attr('data-test', 'modal-close');
          }
        }
      });
    }
  };
})(jQuery, Drupal);
