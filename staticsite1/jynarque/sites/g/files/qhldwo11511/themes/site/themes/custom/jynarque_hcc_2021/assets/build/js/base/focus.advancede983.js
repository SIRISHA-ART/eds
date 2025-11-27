"use strict";

(function ($, Drupal) {
  Drupal.behaviors.otsukaJynarqueHCCFocusAdvanced = {
    attach: function attach(context) {
      var body = $('body');
      var radios = body.find('input[type="radio"]', context);
      var checkboxes = body.find('input[type="checkbox"]', context);
      var key = {
        'tab': 9,
        'enter': 13,
        'space': 32,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40
      };

      function focusByInterval(selector) {
        var intervalCounter = 0;
        var interval = setInterval(function () {
          if (selector.length) {
            selector.focus();
            clearInterval(interval);
          } else {
            if (intervalCounter >= 50) {
              clearInterval(interval);
            }

            intervalCounter++;
          }
        }, 50);
      }

      function freezeWindow() {
        $('html, body').css({
          overflow: 'hidden',
          height: '100%'
        });
      }

      function unfreezeWindow() {
        $('html, body').css({
          overflow: 'auto',
          height: 'auto'
        });
      }

      var covid19PopUpTrigger = $('a.covid-popup', context);
      var covid19Modal = $('#spb-block-covidpopupblock', context);
      var covid19ModalClose = covid19Modal.find('.spb_close');
      var covid19ModalFirstLink = covid19Modal.find('a').first();
      var covid19ModalLastLink = covid19Modal.find('a').last();
      covid19PopUpTrigger.attr('tabindex', '0');
      covid19ModalClose.attr('tabindex', '0');
      covid19PopUpTrigger.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter].indexOf(keyCode) >= 0) {
          $(this).click();
          freezeWindow();
          focusByInterval(covid19ModalClose);
        }
      });
      covid19PopUpTrigger.click(function () {
        freezeWindow();
      });
      covid19ModalFirstLink.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          if (e.shiftKey) {
            e.preventDefault();
            covid19ModalClose.focus();
          }
        }
      });
      covid19ModalLastLink.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          if (!e.shiftKey) {
            e.preventDefault();
            covid19ModalClose.focus();
          }
        }
      });
      covid19ModalClose.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          e.preventDefault();

          if (!e.shiftKey) {
            covid19ModalFirstLink.focus();
          } else {
            covid19ModalLastLink.focus();
          }
        }

        if ([key.enter].indexOf(keyCode) >= 0) {
          e.preventDefault();
          $(this).click();
          unfreezeWindow();
          covid19PopUpTrigger.focus();
        }
      });
      covid19ModalClose.click(function () {
        unfreezeWindow();
      });
      $('.menu-item--expanded > a', context).on('keyup', function (e) {
        if (e.keyCode === 9) {
          e.preventDefault();
          $('.menu-item--expanded', context).removeClass('expanded');
          var currentMenuItem = $(this).parent('.menu-item');
          currentMenuItem.addClass('expanded');
        }
      });
      $('.menu-main > .menu-item:not(.menu-item--expanded) > a', context).on('keyup', function (e) {
        if (e.keyCode === 9) {
          e.preventDefault();
          $('.menu-item--expanded', context).removeClass('expanded');
        }
      });
      var cookieFocusCounter = 0;
      var cookieFocus = setInterval(function () {
        var cookieAgreeButton = $(document).find('.eu-cookie-compliance-banner .agree-button');

        if (cookieAgreeButton.length) {
          cookieAgreeButton.focus();
        }

        cookieFocusCounter++;

        if (cookieFocusCounter >= 10) {
          clearInterval(cookieFocus);
        }
      }, 50);
      $('input:radio[name="receive_message_toggle"]', context).change(function () {
        if ($(this).is(':checked') && $(this).val() === '1') {
          focusByInterval($('input#edit-mobile', context));
        }
      });
      $('input:radio[name="receive_email_toggle"]', context).change(function () {
        if ($(this).is(':checked') && $(this).val() === '1') {
          focusByInterval($('input#edit-address-1', context));
        }
      });
      $('input:radio[name="taking_jynarque_toggle"]', context).change(function () {
        if ($(this).is(':checked') && $(this).val() === '2') {
          focusByInterval($('input:radio[id="edit-taking-jynarque-text-2"]', context));
        }
      });
      radios.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter, key.space].indexOf(keyCode) >= 0) {
          e.preventDefault();
          $(this).trigger('click');
        }

        if ([key.tab].indexOf(keyCode) >= 0) {
          var radioElementWrapper = $(this).parent();
          var radioContainer = $(this).closest('.js-webform-radios');

          var _radios = radioContainer.find('.form-item');

          var radioIndex = _radios.index(radioElementWrapper[0]);

          var radiosCount = _radios.length;

          if (!e.shiftKey) {
            if (radioIndex < radiosCount - 1) {
              e.preventDefault();
              radioElementWrapper.next().find('input[type="radio"]').focus();
            }
          } else {
            if (radioIndex !== 0) {
              e.preventDefault();
              radioElementWrapper.prev().find('input[type="radio"]').focus();
            }
          }
        }
      });
      $(once('html', 'body input[type="checkbox"]', context)).on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter, key.space].indexOf(keyCode) >= 0) {
          e.preventDefault();
          $(this).trigger('click');
        }
      });
      $(document).ready(function () {
        $('#drawer-isi a, #drawer-isi button', context).attr('tabindex', '-1');
      });

      if (window.location.pathname === '/online-resources') {
        var setTabindexNonCollapsibleAccordion = function setTabindexNonCollapsibleAccordion() {
          if (window.innerWidth >= 960) {
            collapsibleBLinks.attr('tabindex', '-1');
          } else {
            collapsibleBLinks.attr('tabindex', '0');
          }
        };

        var collapsibleBLinks = $('.otsuka-collapsable-b .panel-heading a');
        setTabindexNonCollapsibleAccordion();
        $(window).resize(function () {
          setTabindexNonCollapsibleAccordion();
        });
      }

      var questionnaireForm = $('.webform-submission-questionnaire-form', context);
      questionnaireForm.find('.navigation-button', context).on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter, key.space].indexOf(keyCode) >= 0) {
          var activeWrapperId = questionnaireForm.find('.wrapper-page.active').attr('id');
          var activeWrapperNumber = parseInt(activeWrapperId.substr(21));
          var nextWrapper = questionnaireForm.find("#wrapper-page-wrapper-".concat(activeWrapperNumber + 1));

          if (nextWrapper.length) {
            setTimeout(function () {
              focusByInterval(nextWrapper.find('input').first());
            }, 500);
          }
        }
      });
      var jynarqueInterstitialTrigger = $('#block-jynarqueinterstitial a.interstitial-learn-more', context);
      var jynarqueInterstitialModal = $('#block-jynarqueinterstitialmodal', context);
      var jynarqueInterstitialModalClose = jynarqueInterstitialModal.find('.interstitial-close-button');
      var jynarqueInterstitialModalLearnMore = jynarqueInterstitialModal.find('a.interstitial-learn-more');
      jynarqueInterstitialModal.find('.interstitial-close-button').attr('tabindex', '0');
      jynarqueInterstitialTrigger.click(function () {
        freezeWindow();
        focusByInterval(jynarqueInterstitialModalLearnMore);
      });
      jynarqueInterstitialModalLearnMore.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          e.preventDefault();
          jynarqueInterstitialModalClose.focus();
        }
      });
      jynarqueInterstitialModalClose.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter].indexOf(keyCode) >= 0) {
          $(this).click();
        }
      });
      var patientStoriesPreview = $('.field--name-field-media-poster', context);
      var patientStoriesActiveVideo = null;
      patientStoriesPreview.attr('tabindex', '0');
      patientStoriesPreview.on('keydown', function (e) {
        var keyCode = e.keyCode;

        if ([key.enter].indexOf(keyCode) >= 0) {
          $(this).click();
          patientStoriesActiveVideo = $('this');
          var videoModalClose = $('body').find('.video-modal-opened .ui-dialog-titlebar-close');
          focusByInterval(videoModalClose);
        }
      });
      body.on('keydown', '.video-modal-opened .ui-dialog-titlebar-close', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          if (e.shiftKey) {
            e.preventDefault();
            body.find('.video-modal-opened .vjs-fullscreen-control').first().focus();
          }
        }
      });
      body.on('keydown', '.video-modal-opened .vjs-fullscreen-control', function (e) {
        var keyCode = e.keyCode;

        if ([key.tab].indexOf(keyCode) >= 0) {
          if (!e.shiftKey) {
            e.preventDefault();
            body.find('.video-modal-opened .ui-dialog-titlebar-close').first().focus();
          }
        }
      });
    }
  };
})(jQuery, Drupal);
