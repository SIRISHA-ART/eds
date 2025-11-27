/*
 * @file:  pharma_isi.js
 * boilerplate js for pharma_isi module block and page templates
 */


var $ = jQuery.noConflict();

$(document).ready(
    function() {

        //console.log('pharma_isi js file loaded');

        //auto scroll behavior for ISI jumplinks
        var isi = $("#isi-top");
        var vertOffset = 20; // top padding to leave above ISI when scrolling into focus
        $('.isi-jump-link').on(
            'click',
            function() {
                $('html, body').animate({ scrollTop: isi.offset().top - vertOffset }, 500);
            }
        );

        //auto hide/reveal drawer or sticky footer on scroll into view
        $(document).on(
            'scroll',
            function() {

            }
        );

    }
);