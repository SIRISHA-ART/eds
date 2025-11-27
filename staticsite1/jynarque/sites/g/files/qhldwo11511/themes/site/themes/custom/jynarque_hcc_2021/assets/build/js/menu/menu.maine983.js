"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaMenuMain = {
    attach: function attach(context, settings) {
      var headerHeight = $('header').height();
      var windowHeight = $(window).height();
      $(once('html', '.mobile-menu-open-btn', context)).click(function (e) {
        e.preventDefault();
        $('body').addClass('mobile-menu-opened');
        $('#mobile-menu').css('max-height', windowHeight - headerHeight);
      });
      $(once('html', '.mobile-menu-close-btn', context)).click(function (e) {
        e.preventDefault();
        $('body').removeClass('mobile-menu-opened');
      });
      $(once('html', '.menu-item--expanded > a', context)).click(function (e) {
        e.preventDefault();
        var currentMenuItemExpandedState = $(this).parent('.menu-item').hasClass('expanded');
        $('.menu-item').removeClass('expanded');

        if (!currentMenuItemExpandedState) {
          $(this).parent('.menu-item').addClass('expanded');
        }
      });
      $(once('html', '.region-mobile-menu .menu-item--expanded > span', context)).click(function (e) {
        e.preventDefault();
        $(this).parent('.menu-item').toggleClass('expanded');
      });
      $(once('html', '.region-header-bottom .menu-item--expanded > span', context)).click(function (e) {
        e.preventDefault();
        var $parent = $(this).parent('.menu-item');
        $parent.siblings().removeClass('expanded');
        $(this).parent('.menu-item').toggleClass('expanded');
      });
    }
  };
})(jQuery, Drupal);
