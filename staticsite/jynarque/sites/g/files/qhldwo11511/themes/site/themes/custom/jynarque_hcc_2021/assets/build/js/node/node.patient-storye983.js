"use strict";

(function ($, Drupal, drupalSettings, OtsukaPCM) {
  'use strict';

  Drupal.behaviors.otsukaPatientStory = {
    attach: function attach(context) {
      var data = drupalSettings.jynarque_hcc_2021.patient_stories,
          originalTitle = document.title,
          $modal = $('.modal', context);

      function openVideo(id) {
        var playerWrapper = $("#video-modal-form-".concat(id.nid, " .modal-body"));
        $(playerWrapper[0]).empty().append("<div class=\"video-holder\" id=\"video-".concat(id.nid, "\"></div>")).removeClass('p-0');
        var consent_category = OtsukaPCM.getConsentCategoryForProvider(OtsukaPCM.providers.VIMEO);
        var isConsentedPromise = OtsukaPCM.isConsentedToCategory(consent_category);
        isConsentedPromise.then(function (isConsentedResult) {
          if (!isConsentedResult) {
            setTimeout(() => {
              const modalContent = playerWrapper[0].closest('.modal-content');
              const modalWidth = modalContent.clientWidth;
              const modalHeight = modalContent.clientHeight;
              OtsukaPCM.getThumbnailImgForVideo(OtsukaPCM.providers.VIMEO, parseInt(id.vimeo_id), {width: modalWidth, height: modalHeight}).then(function(img) {
                playerWrapper[0].append(img);
              });
            }, 15);
          }
        });
        OtsukaPCM.doConsentModal({
          target: playerWrapper[0],
          provider: OtsukaPCM.providers.VIMEO,
          consentCallback: function consentCallback() {
            $(playerWrapper[0]).find('.otsuka-pcm-video-thumbnail').remove();
            $(playerWrapper[0]).addClass('p-0');
            var e = new Event("loadPlayer");
            e.id = id.vimeo_id;
            document.dispatchEvent(e);
            var options = {
              id: parseInt(id.vimeo_id),
              autoplay: true,
              autopause: true,
              responsive: true
            };

            if (typeof Vimeo !== 'undefined') {
              var player = new Vimeo.Player('video-' + id.nid, options);
            }
          },
          cancelCallback: function cancelCallback() {
            $(playerWrapper[0]).closest('[role="dialog"]').modal('hide');
          }
        });
      }

      if (data) {
        $(once('otsukaPatientStory', '.modal', context)).each(function (i, el) {
          var $el = $(el);
          $el.on('show.bs.modal', function (e) {
            if (typeof e.relatedTarget !== 'undefined') {
              location.hash = $(e.relatedTarget).attr('href');
            }
          });
          $el.on('shown.bs.modal', function (e) {
            $(document).trigger('virtualVideoView', {
              data: {
                'video_type': 'vimeo'
              }
            });
            var id = $(this).data('id'),
                articleItem = data.articles.find(function (item) {
              return parseInt(item.nid) === id;
            }),
                videoItem = data.videos.find(function (item) {
              return parseInt(item.nid) === id;
            });

            if (articleItem) {
              document.title = articleItem.meta_title;
            }

            if (videoItem) {
              openVideo(videoItem);
              document.title = videoItem.meta_title;
            }
          });
          $el.on('hide.bs.modal', function () {
            var frame = $(this).find('iframe');
            document.title = originalTitle;

            if (history.pushState) {
              history.pushState('', '/', location.pathname);
            } else {
              location.hash = '';
            }

            if (frame.length) {
              frame.html('');
              frame.attr('src', '');
            }
          });
          $('.video--popup', context).each(function (i, el) {
            var hash = $(el).attr('href'),
                videoItem = data.videos.find(function (item) {
              return item.hash === hash;
            });
            $(el).attr('data-toggle', 'modal');
            $(el).attr('data-target', '#video-modal-form-' + videoItem.nid);
            $(el).attr('data-node-id', videoItem.nid);
          });
        });

        if (location.hash) {
          var articleItem = data.articles.find(function (item) {
            return item.hash === location.hash;
          }),
              videoItem = data.videos.find(function (item) {
            return item.hash === location.hash;
          });

          if (articleItem) {
            $("#article-modal-form-".concat(articleItem.nid)).modal('show');
          }

          if (videoItem) {
            $("#video-modal-form-".concat(videoItem.nid)).modal('show');
          }
        }

        $('.article--popup', context).on('click', function () {
          var hash = $(this).attr('href'),
              articleItem = data.articles.find(function (item) {
            return item.hash === hash;
          });
          $("#article-modal-form-".concat(articleItem.nid)).modal('show');
        });
      }

      var $form = $('form[name="patient_stories"]', context),
          $slides = $('.paragraph--type--patient-story .slides', context);
      $form.on('submit', function (e) {
        e.preventDefault();
        var articles = data.articles;
        var videos = data.videos;
        var checkedItems = [];
        setCategoryClasses();
        $form.find('input[type="checkbox"]:checked').each(function () {
          checkedItems.push(parseInt($(this).attr("value")));
        });
        articles = itemsFilterSort(checkedItems, articles);
        $(".items-article_content").empty();
        $(articles).each(function (index, value) {
          if (index > 2) {
            $(articles[index].card).hide().appendTo(".items-article_content");
          } else {
            $(articles[index].card).appendTo(".items-article_content");
          }
        });
        videos = itemsFilterSort(checkedItems, videos);
        $(".items-video_content").empty();
        $(videos).each(function (index, value) {
          if (index > 2) {
            $(videos[index].card).hide().appendTo(".items-video_content");
          } else {
            $(videos[index].card).appendTo(".items-video_content");
          }
        });
        $slides.addClass('category');
        $(".patient-story-container").show();
        $(".card__bottom-text").hide();
        $('#see-more-items').show();

        if (articles.length < 4 || videos.length < 4) {
          $('#see-more-items').hide();
        }

        $('#collapseFilter').collapse('hide');
        var container = $('.patient-story-container');
        $('html, body').animate({
          scrollTop: container.offset().top
        }, 1000);
        Drupal.attachBehaviors($(".patient-story-container"));
      });

      function setCategoryClasses() {
        var $checkboxes = $('input[type="checkbox"]', $form);
        $checkboxes.each(function (index, checkbox) {
          var checkboxId = checkbox.id;

          if (checkbox.checked) {
            $('.slides', context).addClass('category-' + checkboxId);
          } else {
            $('.slides', context).removeClass('category-' + checkboxId);
          }
        });
      }

      $('#see-more-items').click(function () {
        $('.items-article_content article').show();
        $('.items-video_content article').show();
        $(this).hide();
        $('.items-article_content article:nth-of-type(3) .article--teaser__button a').focus();
      });

      function itemsFilterSort(categoriesToInclude, data) {
        if (categoriesToInclude.length !== 0) {
          data = data.filter(function (item) {
            return item.categories.some(function (category) {
              return categoriesToInclude.includes(parseInt(category.category));
            });
          });
        }

        if (categoriesToInclude.length === 1) {
          var categoryToSort = categoriesToInclude[0];
          data = data.sort(function (a, b) {
            var categoryA = a.categories.find(function (c) {
              return parseInt(c.category) === categoryToSort;
            });
            var categoryB = b.categories.find(function (c) {
              return parseInt(c.category) === categoryToSort;
            });

            if (categoryA && categoryB) {
              if (parseInt(categoryA.order) < parseInt(categoryB.order)) {
                return -1;
              }

              if (parseInt(categoryA.order) > parseInt(categoryB.order)) {
                return 1;
              }

              return 0;
            }
          });
        } else {
          data = data.sort(function (a, b) {
            return a.order - b.order;
          });
        }

        return data;
      }

      $(once('switcher', ".patient-story-switcher input[type='checkbox']", context)).change(function () {
        if (this.checked) {
          $(".switch-article").removeClass('active');
          $(".switch-video").addClass('active');
          $(".items-article").hide();
          $(".items-video").show();
        } else {
          $(".switch-video").removeClass('active');
          $(".switch-article").addClass('active');
          $(".items-article").show();
          $(".items-video").hide();
        }
      });
      $('.patient--story__filter').click(function () {
        checkboxPosition();
      });

      if ($form.is(":visible")) {
        checkboxPosition();
      }

      function checkboxPosition() {
        setTimeout(function () {
          var $filter = $('#collapseFilter');
          var $filterLabels = $filter.find('.patient--story__filter-item label');
          var firstLabelHeight = $filterLabels.eq(0).height();
          var checkboxHeight = 16;
          var checkBoxTopValue = (firstLabelHeight - checkboxHeight) / 2;
          $filterLabels.addClass('offset-top-' + Math.floor(checkBoxTopValue));
        }, 300);
      }
    }
  };
})(jQuery, Drupal, drupalSettings, OtsukaPCM);
