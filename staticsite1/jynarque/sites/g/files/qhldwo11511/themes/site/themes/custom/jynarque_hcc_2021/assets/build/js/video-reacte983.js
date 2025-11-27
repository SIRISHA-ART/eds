"use strict";

(function ($, Drupal) {
  Drupal.behaviors.videoReactVideos = {
    attach: function attach(context) {
      var event = new Event('videoStop');
      $('.modal .react-player-preview, .inline-react-video .react-player-preview', context).on('click', function (e) {
        document.dispatchEvent(event);
        var $iframe = $(this).siblings('.hidden').find('iframe');

        if ($iframe.length) {
          var player = new Vimeo.Player($iframe, {
            autopause: 1,
            autoplay: 1
          });
          player.play();
        }
      });
      once("videoReactVideos", ".react-player-wrapper", context).forEach(function (reactPlayerWrapper) {
        OtsukaPCM.initReactPlayer(reactPlayerWrapper, {
          withDefaultOverlay: false
        });
      });
      $(document).on('keydown', '.otsuka-pcm-consent-button', function (e) {
        if (e.key === 'Enter') {
          $('.skip-link').hide();
        }
      });
      $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
          var $focusedElement = $(document.activeElement);
          var isPlayButtonFocused = $focusedElement.hasClass('react-player-preview') || $focusedElement.hasClass('play-button');
          var $popup = $focusedElement.closest('.otsuka-pcm-consent-modal');
          var isInsidePopup = $popup.length > 0;

          if (isPlayButtonFocused || isInsidePopup) {
            $popup.find('.otsuka-pcm-consent-close').trigger('click');
          }
        }
      });
    }
  };
  Drupal.behaviors.playButtonLabel = {
    attach: function attach(context) {
      $(once('play-button-label', '.react-player-preview button.play', context)).each(function () {
        var button = $(this);
        var label = button.attr('aria-label');

        if (!label) {
          button.attr('aria-label', 'Play button');
        }
      });
    }
  };
})(jQuery, Drupal);
