"use strict";

(function ($, Drupal) {
  Drupal.behaviors.analyticsFormSettings = {
    attach: function attach(context) {
      var formsList = [{
        formSelector: '.doctor-finder-tool',
        resultSelector: '.geolocation-map-wrapper',
        errorSelector: '.error',
        formName: 'jynarque|dtc|nephrologist finder form',
        formType: 'locator|non-dynamic',
        ajax: true,
        formFieldPopulated: ['field_geo_proximity-zip'],
        simpleErrorsFormat: true
      }, {
        formSelector: '.webform-submission-webinar-registration-form',
        resultSelector: '.confirmation-message',
        errorSelector: '.form-item--error-message, .alert-danger:not(.fade), .captcha-error',
        formName: 'jynarque|dtc|adpkd peer conversations form',
        formType: 'signup form|non-dynamic form',
        ajax: true,
        stepsSelectors: {
          1: '[data-webform-key="step_1"]',
          2: '[data-webform-key="step_2"]',
          3: '[data-webform-key="step_3"]',
          4: '[data-webform-key="step_4"]'
        },
        simpleErrorsFormat: true
      }, {
        formSelector: '.webform-submission-talk-with-a-peer-mentor-form',
        resultSelector: '.confirmation-message',
        errorSelector: '.form-item--error-message, .alert-danger:not(.fade), .captcha-error',
        formName: 'jynarque|dtc|adpkd peer mentor program form',
        formType: 'signup form|non-dynamic form',
        ajax: true,
        stepsSelectors: {
          2: '[data-webform-key="second_step"]',
          3: '[data-webform-key="third_step"]',
          4: '[data-webform-key="fourth_step"]'
        },
        simpleErrorsFormat: true
      }, {
        formSelector: '.webform-submission-questionnaire-form',
        resultSelector: '.webform-confirmation-content',
        formName: 'jynarque|dtc|is jynarque right for you form',
        formType: 'talk to your doctor|non-dynamic form',
        ajax: true,
        newPageConfirmation: true,
        formResult: '.webform-result__message h1',
        addCustomClasses: {
          '.radios--wrapper.fieldgroup': 'data-analytics-form-questionblock',
          '.radios--wrapper .fieldset-legend': 'data-analytics-form-question',
          '.radios--wrapper .js-webform-radios input': 'data-analytics-form-answer'
        },
        simpleErrorsFormat: true
      }, {
        formSelector: '.otsuka-jynarque-hcc-calendar-form',
        resultSelector: '',
        formName: 'jynarque|dtc|lab test reminder calendar form',
        formType: 'reminder form|non-dynamic form',
        simpleErrorsFormat: true
      }];
      Drupal.analytics.initForm(formsList);
    }
  };
})(jQuery, Drupal);
