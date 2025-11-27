"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaTalkToMentorForm = {
    attach: function attach(context) {
      var fieldsMapping = {
        'edit-first-name': 'edit-sfmc-contact-info-first-name',
        'edit-last-name': 'edit-sfmc-contact-info-last-name',
        'edit-email': 'edit-sfmc-email-personal-email-address',
        'edit-phone-number': 'edit-sfmc-phone-home-phone-number'
      };

      var _loop = function _loop(sourceId) {
        var targetId = fieldsMapping[sourceId];
        $('input[data-drupal-selector=' + sourceId + ']', context).on('change', function (e) {
          $('input[data-drupal-selector=' + targetId + ']', context).val($(this).val());
        });
      };

      for (var sourceId in fieldsMapping) {
        _loop(sourceId);
      }

      $('select[data-drupal-selector="edit-state"]', context).on('change', function () {
        var selectedStateCode = $(this).val();
        $('input[data-drupal-selector=edit-sfmc-survey-response-state-answer-text]').val(selectedStateCode);
      });
      $('[data-drupal-selector*=edit-would-you-like-to-register-to-receive-future-communications]').on('change', function () {
        var $input = $(this).find('input:checked');
        var $text = $input.next('label').text();
        $('input[data-drupal-selector=edit-sfmc-survey-response-q1-answer-text]').val($text);
        $('input[data-drupal-selector=edit-sfmc-survey-response-q1-answer-code]').val($input.val());
        var optValue = $input.val() === '1';
        $('[data-drupal-selector="edit-sfmc-opt-status-optb2000-opt-value"]').prop('checked', optValue);
        $('[data-drupal-selector="edit-sfmc-opt-status-optb2001-opt-value"]').prop('checked', optValue);
        $('[data-drupal-selector="edit-sfmc-opt-status-optb2002-opt-value"]').prop('checked', optValue);
        $('[data-drupal-selector="edit-sfmc-opt-status-optb2006-opt-value"]').prop('checked', optValue);
      });
      $(once('html', '.start-over-button', context)).on('click', function (event) {
        event.preventDefault();
        window.location.href = '/sign-up';
      });
      $(once('talk_to_your_mentor', '.back-button', context)).on('click', function (event) {
        event.preventDefault();

        if ($('form').find('[data-drupal-selector="edit-second-step"]').length) {
          $('[id*=edit-actions-wizard-prev]').trigger('click');
        } else {
          window.location.href = '/sign-up';
        }
      });

      if ($('.webform-progress-tracker > li.is-complete').length) {
        $('.webform-progress').find('.notice-message').css('display', 'none');
      }

      var captcha_message = Drupal.t('The answer you entered for the CAPTCHA was not correct.');

      if ($('.alert-wrapper').text().search(captcha_message) !== -1) {
        $('.captcha').append('<div class="captcha-error">Please verify you are not a robot</div>');
        $('.captcha').css('border', '1px solid red');
      }

      if ($('.form-item-email .form-item--error-message').length) {
        $('.form-item-email .form-item--error-message').html($('.form-item-email .form-item--error-message').html().replace("Use the format user@example.com.", '').trim());
      }

      if ($('.webform-confirmation', context).length) {
        $('.back-button', context).css('background-image', 'none');
      }
    }
  };
})(jQuery, Drupal);
