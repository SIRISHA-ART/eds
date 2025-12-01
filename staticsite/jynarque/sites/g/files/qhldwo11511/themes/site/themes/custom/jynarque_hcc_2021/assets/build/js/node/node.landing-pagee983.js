"use strict";
jQuery(document).ready(function($) {
var $section = $('.hero-section');
var $videos = $('video', $section);
var fields = {
  'desktop': '.field--name-field-hero-media-desktop',
  'mobile': '.field--name-field-hero-media-mobile'
};
$section.addClass('loaded');
var heroVideoItemHome = localStorage.getItem('heroVideoItemHome') ? localStorage.getItem('heroVideoItemHome') : '0';

for (var type in fields) {
  var $items = $(fields[type], $section).children('.field--item');
  var quantity = $items.length;

  if ($videos.length) {
    if (quantity === 4) {
      $section.addClass('hero-' + type + '-' + heroVideoItemHome);

      if (heroVideoItemHome === '0') {
        localStorage.setItem('heroVideoItemHome', '1');
      } else {
        localStorage.setItem('heroVideoItemHome', '0');
      }
    } else {
      $section.addClass('hero-' + type + '-0');
    }
  } else if (!$videos.length) {
    if (quantity === 2) {
      if (heroVideoItemHome === '0') {
        $section.addClass('hero-' + type + '-3');
        localStorage.setItem('heroVideoItemHome', '1');
      } else {
        $section.addClass('hero-' + type + '-4');
        localStorage.setItem('heroVideoItemHome', '0');
      }
    } else {
      $section.addClass('hero-' + type + '-2');
    }
  }
}

if ($videos.length) {
  $videos.each(function (index, video) {
    if ($(video).is(":visible")) {
      video.play();
      $(video).on('ended', function () {
        $section.addClass('video-ended');
      });
    }
  });
} else {
  $section.addClass('video-ended');
}
});