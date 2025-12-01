"use strict";

(function ($, Drupal) {
  Drupal.behaviors.otsukaJynarqueHCCErrors = {
    attach: function attach(context, settings) {
      $(document).on('click keypress', '[aria-invalid="true"]', function () {
        var errorWrapper = $(this).parent('.form-item--error');
        errorWrapper.removeClass('form-item--error');
        errorWrapper.find('.form-item--error-message').remove();
        $(this).removeAttr('aria-invalid');
      });
      $(document).on('click keypress', '.option', function () {
        var errorWrapper = $(this).closest('.form-group');
        errorWrapper.removeClass('has-error');
        errorWrapper.find('.alert-danger').remove();
      });
      $(document).on('click keypress', '[id*="edit-resident"] .form-item:last-child label', function () {
        var radiosWrapper = $(this).closest('.fieldset-wrapper');
        var radiosFieldGroup = $(this).closest('.fieldgroup');
        radiosFieldGroup.addClass('has-error');
        radiosWrapper.prepend('<div class="alert alert-danger" role="alert">' + 'This site is intended for US residents only. ' + 'That is because it reflects the way that JYNARQUE is approved for use in the US.' + '</div>');
      });
    }
  };
})(jQuery, Drupal);
