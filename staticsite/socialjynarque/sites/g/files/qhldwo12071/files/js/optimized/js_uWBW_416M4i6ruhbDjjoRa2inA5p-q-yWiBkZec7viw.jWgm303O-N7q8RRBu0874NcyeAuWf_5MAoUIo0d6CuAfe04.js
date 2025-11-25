/* Source and licensing information for the line(s) below can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/analytics.js. */
"use strict";

(function ($, Drupal, once) {
  Drupal.behaviors.AnalyticsVirtualPageView = {
    attach: function attach(context) {
      if (context !== document) {
        return;
      }

      $(document).trigger('virtualPageView');
    }
  };
  Drupal.behaviors.AddWysiwigLinksAnalytics = {
    attach: function attach(context) {
      once('AddWysiwigLinksAnalytics', '.add-analytics', context).forEach(function (link) {
        var $link = $(link);
        var position = $link.data('analytics-position');

        if (position == undefined) {
          position = $link.closest('footer, header, body').first().prop('tagName').toLowerCase();
        }

        var href = $link.attr('href').startsWith('http') ? $link.attr('href') : window.location.origin + $link.attr('href');
        var analytics = {
          'name': $link.text().trim(),
          'position': position,
          'group': $link.attr('data-analytics-group'),
          'href': href
        };

        if ($link.attr('target') && $link.attr('target') === '_blank') {
          analytics.exitmodal = "" + !$link.hasClass('external-link-popup-disabled');
        }

        $link.attr('data-analytics-link', JSON.stringify(analytics));
      });
    }
  };
})(jQuery, Drupal, once);

/* Source and licensing information for the above line(s) can be found at https://social.jynarque.com/sites/g/files/qhldwo12071/themes/site/themes/custom/jynhcc_social/assets/build/js/analytics.js. */