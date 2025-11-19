/* Source and licensing information for the line(s) below can be found at https://social.jynarque.com/modules/contrib/google_tag/js/gtag.ajax.js. */
(function (Drupal) {
  /**
   * Command to attach data using jQuery's data API.
   *
   * @param {Drupal.Ajax} [ajax]
   *   {@link Drupal.Ajax} object created by {@link Drupal.ajax}.
   * @param {object} response
   *   The response from the Ajax request.
   * @param {string} response.event_name
   *   The event name
   * @param {object} response.data
   *   The value of the event.
   */
  Drupal.AjaxCommands.prototype.gtagEvent = function (ajax, response) {
    gtag('event', response.event_name, response.data);
  };
})(Drupal);

/* Source and licensing information for the above line(s) can be found at https://social.jynarque.com/modules/contrib/google_tag/js/gtag.ajax.js. */