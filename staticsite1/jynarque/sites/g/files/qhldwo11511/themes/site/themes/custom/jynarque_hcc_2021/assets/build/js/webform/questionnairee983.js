"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaJynarqueQuestionnaire = {
    attach: function attach(context, settings) {
      var $form = $('.webform-submission-questionnaire-form', context);
      var $wrapper = $('.wrapper-page', $form);
      var page_quantity = $wrapper.length;
      var current_page = $form.data('current');
      var $el = $('.radio input[type="radio"]', $wrapper);
      var $trackers = $('.webform-progress-tracker > li', $form);
      var complete = 1;

      var checkDisabled = function checkDisabled(page) {
        var $input = $('.wrapper-page-wrapper-' + page + ' .radio input[type="radio"]', context);

        if ($input.is(':checked')) {
          $form.find('.webform-button--next').removeAttr('disabled');
        }
      };

      var checkRadio = function checkRadio() {
        if ($el.is(':checked')) {
          var page = $form.attr('data-current');
          $form.find('.webform-button--next').removeAttr('disabled');

          if (page == settings.jynarque_hcc_2021.pages) {
            $form.find('.webform-button--submit').removeAttr('disabled');
          }
        }
      };

      $el.on('change', checkRadio);
      var $swipedEl = $('.webform-submission-questionnaire-form > .wrapper-page', context);
      $swipedEl.on('swipeleft', function (e, touch) {
        var $next = $el.parents('.webform-submission-form').find('.webform-button--next');

        if (!$next.is('[disabled]')) {
          $next.trigger('click');
        }
      }).on('swiperight', function (e, touch) {
        var $prev = $el.parents('.webform-submission-form').find('.webform-button--previous');
        $prev.trigger('click');
      });

      var setPage = function setPage(page) {
        if (page > complete) {
          $('.progress-step-' + complete, $form).addClass('is-complete');
          complete = page;
        }

        $form.attr('data-current', page);
        $wrapper.removeClass('active');
        $trackers.removeClass('is-active');
        $('.wrapper-page-wrapper-' + page, $form).addClass('active');
        $('.progress-step-' + page, $form).addClass('is-active');
        checkDisabled(page);
      };

      $('.webform-button--previous', $form).on('click', function (e) {
        e.preventDefault();

        if (current_page > 1) {
          current_page--;
          setPage(current_page);
        }
      });
      $('.webform-button--next', $form).on('click', function (e) {
        e.preventDefault();
        $(this).attr('disabled', 'disabled');

        if (current_page < page_quantity) {
          current_page++;
          setPage(current_page);
        }
      });
      $trackers.on('click', function (e) {
        e.preventDefault();
        var $tracker = $(this);
        var page = $tracker.data('page');

        if (page < complete && page < current_page) {
          setPage(page);
          current_page = page;
        }
      });
      $('.js-webform-element-help', $form).each(function () {
        var helpContent = $(this).data('webform-help');
        var contentElement = $('<div>').html(helpContent).find('.webform-element-help--content').html().trim();
        $(this).attr('data-webform-help', contentElement);
      });
    }
  };
})(jQuery, Drupal);
