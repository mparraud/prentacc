"use strict";

// Global variables
var $doc = $(document),
    $thisPage = $('html, body');

// Document ready event
$doc.ready(function() {
    var $maskVideo = $('.maskVideo'),
        $fancyBox = $('.fancybox');

    $doc.imagesLoaded(function() {
        // Page loader
        var $pageLoader = $('.page-loader'),
            $pageLoaderIcon = $pageLoader.find('.iconLoad');

        $pageLoaderIcon.delay(800).fadeOut();
        $pageLoader.delay(1200).fadeOut(600);

        // Init caroufredsel gallerys
        initCaroufredselGallerys();

        // Init masonry
        var $masonryGrid = $('.js-masonry');

        $masonryGrid.isotope({
            itemSelector: '.list-blog__item',
            layoutMode: 'masonry'
        });

    // FILTERS
        // Init isotope
        var $grid = $('.js-filter-grid').isotope({
            itemSelector: '.filter-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.8s',
            // only opacity for reveal / hide transition
            hiddenStyle: {
                opacity: 0
            },
            visibleStyle: {
                opacity: 1
            }
        });

        var $filtersButtons = $('.js-filters-buttons');

        $filtersButtons.on('click', '.list-section__link', function(e) {
            e.preventDefault();

            var $this = $(this);
            var filterValue = $this.attr('data-filter');

            $grid.isotope({
                filter: function() {
                    var $this = $(this);
                    var value = $this.data('category');
                    return value === filterValue || filterValue === '*';
                }
            });
        });

        $filtersButtons.each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);

            $buttonGroup.on('click', '.list-section__link', function() {
                var $this = $(this);

                $buttonGroup.find('.active').removeClass('active');
                $this.parent().addClass('active');
            });
        });
    // FILTERS END
    });

    // Hide video background on tablet and mobile devices
    if (device.desktop()) {
        ytbg("###"); // there should be youTube video ID (for example: https://docs.joeworkman.net/rapidweaver/stacks/youtube/video-id)
    } else {
        $maskVideo.hide();
    }

    // Init fancybox
    if ($fancyBox.length) {
        $fancyBox.fancybox({
            helpers: {
                overlay: {
                    css: {
                        'background': 'rgba(58, 42, 45, 0.5)'
                    }
                }
            },
            preload: true
        });
    }
});

// Animated slider function
function animatedSlider(slide, bool) {
    $.each(slide, function() {
        var $currentBlock = $(this);
        var $item = $currentBlock.find('.item');
        var durationClass = 'duration-' + $currentBlock.data('duration');
        var itemCounter = 0;

        $.each($item, function() {
            var $this = $(this);
            var currentDelay = $currentBlock.data('delay') * itemCounter++;

            if (bool) {
                setTimeout(function() {
                    $this
                        .addClass('animate')
                        .addClass(durationClass)
                        .addClass($this.data('effect-in'))
                        .css('opacity', 1);
                }, currentDelay);
            } else {
                $this
                    .removeClass('animate')
                    .removeClass($this.data('effect-in'))
                    .css('opacity', 0);
            }
        });
    });
}

// Caroufredsel function
function initCaroufredselGallerys() {
    var $testimonialsGallery = $('#testimonials-gal'),
        $partnersGallery = $('#gal_partners'),
        $bgSlider = $('#bg_slider'),
        $galleryOne = $('#gal_1'),
        $galleryTwo = $('#gal_2'),
        $galleryThree = $('#gal_3'),
        $advantagesGallery = $('#gal_advantages');

    // Testimonials page
    if ($testimonialsGallery.length) {
        $testimonialsGallery.carouFredSel({
            width: '100%',
            responsive: true,
            prev: '#testimonials_prev',
            next: '#testimonials_next',
            pagination: "#pager",
            swipe: {
                onTouch: true
            },
            items: {
                visible: {
                    min: 1,
                    max: 1
                }
            }
        });
    }

    // Partners
    if ($partnersGallery.length) {
        $partnersGallery.carouFredSel({
            width: '100%',
            height: 'auto',
            responsive: false,
            pagination: {
                container: "#pager_partners"
            },
            auto: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            items: {
                visible: {
                    min: 1,
                    max: 5
                }
            }
        });
    }

    // Bg slider
    if ($bgSlider.length) {
        $bgSlider.carouFredSel({
            width: '100%',
            height: '100%',
            responsive: true,
            auto: true,
            scroll: {
                duration: 1600
            },
            items: {
                visible: {
                    min: 1,
                    max: 1
                }
            }
        });
    }

    // Gallery #1
    $galleryOne.carouFredSel({
        width: '100%',
        height: 'auto',
        responsive: true,
        prev: '#prev1',
        next: '#next1',
        auto: false,
        items: {
            visible: {
                min: 1,
                max: 1
            }
        }
    });

    // Gallery #2
    $galleryTwo.carouFredSel({
        width: '100%',
        height: 'auto',
        responsive: true,
        pagination: {
            container: "#pager2"
        },
        prev: '#prev2',
        next: '#next2',
        auto: true,
        items: {
            visible: {
                min: 1,
                max: 1
            }
        },
        scroll: {
            onAfter: function() {
                var $this = $(this);
                var items = $this.triggerHandler("currentVisible");
                animatedSlider(items, true);
            },
            onBefore: function() {
                var $this = $(this);
                var items = $this.triggerHandler("currentVisible");
                animatedSlider(items, false);
            }
        },
        onCreate: function() {
            var $this = $(this);
            var items = $this.triggerHandler("currentVisible");
            setTimeout(function() {
                animatedSlider(items, true);
            }, 1000);
        }
    });

    // Gallery #3
    $galleryThree.carouFredSel({
        width: '100%',
        height: 'auto',
        responsive: true,
        pagination: {
            container: "#pager3"
        },
        auto: false,
        items: {
            visible: {
                min: 1,
                max: 1
            }
        },
        scroll: {
            duration: 1500
        }
    });

    // Advantages gallery
    $advantagesGallery.carouFredSel({
        width: '100%',
        height: 'auto',
        responsive: false,
        scroll: 1,
        prev: '#prev4',
        next: '#next4',
        auto: false,
        swipe: {
            onMouse: true,
            onTouch: true
        },
        items: {
            visible: {
                min: 1,
                max: 4
            }
        }
    });
}

// MOBILE MENU
(function(){
    var $buttonMobileMenu = $('.button-mobile-menu');

    $buttonMobileMenu.on('click', function() {
        var $this = $(this);

        $this.parent().find('.menu').slideToggle();
        $this.toggleClass('active');
        return false;
    });
})();

// SWITCH TABS
(function(){
    var $tabsStandar = $('.list-tabs-standart'),
        $tabsStandartBtn = $tabsStandar.find('li');

    $tabsStandartBtn.on('click', 'a', function() {
        var $this = $(this),
            $boxTabs = $this.parents('.box-tabs'),
            id = $(this).attr('href'),
            $id = $(id);

        $boxTabs
            .find('.tab-content2').addClass('hide-tab');
        $boxTabs
            .find('.list-tabs-standart__item').removeClass('active');

        $id.removeClass('hide-tab');
        $this.parent().addClass('active');
        return false;
    });
})();

// AСCORDIONS
(function(){
    var $droplist = $('.drop-list'),
        $droplistItem = $droplist.find('.drop-list__item');

    $droplistItem.on('click', 'a', function() {
        var $this = $(this),
            $item = $this.parent();

        $this.addClass('active');
        $item.find('.open-block').slideDown();

        $item.siblings('li')
            .find('.drop-list__link').removeClass('active');
        $item.siblings('li')
            .find('.open-block').slideUp();
        return false;
    });
})();

// BLOG SIDEBAR TREELIST
(function(){
    var $blogTreelist = $('.blog-treelist');

    $blogTreelist.on('click', '.blog-treelist_trigger', function() {
        var $this = $(this);

        $this.siblings('.blog-treelist_box').slideToggle();
        $this.parent('.blog-treelist_item').toggleClass('active');
        return false;
    });
})();

// SCROLL TO TOP BUTTON LISTENER
(function(){
    var $btnTop = $('.button-top');

    $btnTop.on('click', function() {
        $thisPage.animate({ scrollTop: 0 }, 1000);
        return false;
    });

    // Show / hide scroll to top button
    $(window).scroll(function() {
        var $scrollNum = $(window).scrollTop();

        if ($scrollNum > 800) {
            $btnTop.addClass('button-top_showed');
        } else {
            $btnTop.removeClass('button-top_showed');
        }
    });
})();

// MAIN MENU
(function(){
    var $menu = $('.menu'),
        $menuItem = $('.menu__item_with-drop'),
        $subMenuItem = $('.drop-menu_with-drop');

    // Prevent default actions on menu
    $menuItem.on('click', '> .menu__link', function(e) {
        e.preventDefault();
    });

    $subMenuItem.on('click', '> .drop-menu__link', function(e) {
        e.preventDefault();
    });

    $subMenuItem.on('click', function() {
        var $this = $(this);

        $subMenuItem.not($this).removeClass('is-hover');
        $this.addClass('is-hover');
    });

    $menuItem.on('click', function() {
        var $this = $(this);

        $menuItem.not($this).removeClass('is-hover');
        $this.addClass('is-hover');
    });

    // Hovers if is desktop version
    if (device.desktop()) {
        var hide;

        $menu.on('mouseleave', '.menu__item_with-drop.is-hover', function() {
            var $this = $(this);
            hide = setTimeout(function() {
                $this.removeClass('is-hover');
            }, 800);
        });
        $menu.on('mouseenter', '.menu__item_with-drop.is-hover', function() {
            clearTimeout(hide);
        });
    }

    // Remove hover classes
    $doc.on("click", function(e) {
        if ($(e.target).closest($menuItem).length === 0) {
            $menuItem.removeClass('is-hover');
        }
        if ($(e.target).closest($subMenuItem).length === 0) {
            $subMenuItem.removeClass('is-hover');
        }
    });
})();

// CONTACT FORM VALIDATION
(function() {

    var $contactsForms = $('.js-contacts-form');
    var $messBlock = $contactsForms.find('.js-success');
    var $spinner = $contactsForms.find('.js-spinner');
    var alerts = {
        success: 'Thanks, you message has been sent.'
    };

    $contactsForms.each(function() {
        var $this = $(this);

        $this.validate({
            submitHandler: function() {
                $spinner.fadeIn(300);
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $this.serialize()
                }).done(function() {
                    $messBlock.fadeIn(500).text(alerts.success);
                    setTimeout(function() {
                        $contactsForms.trigger("reset");
                        $spinner.fadeOut(300);
                    }, 500);
                    setTimeout(function() {
                        $messBlock.fadeOut(500);
                    }, 8000);
                });
                return false;
            }
        });
    });
})();

// Init jPlayer
(function() {
    // TMP For testing on standard browsers.
    // $.jPlayer.platform.android = true;

    var $jPlayer = $('.jp-jplayer');

    // if page without player not to execute code
    if (!$jPlayer.length) {
        return;
    }

    var jPlayerAndroidFix = (function($) {
        var fix = function(id, media, options) {
            this.playFix = false;
            this.init(id, media, options);
        };
        fix.prototype = {
            init: function(id, media, options) {
                var self = this;

                // Store the params
                this.id = id;
                this.media = media;
                this.options = options;

                // Make a jQuery selector of the id, for use by the jPlayer instance.
                this.player = $(this.id);

                // Make the ready event to set the media to initiate.
                this.player.on($.jPlayer.event.ready, function(event) {
                    // Use this fix's setMedia() method.
                    self.setMedia(self.media);
                });

                // Apply Android fixes
                if ($.jPlayer.platform.android) {

                    // Fix playing new media immediately after setMedia.
                    this.player.on($.jPlayer.event.progress, function(event) {
                        if (self.playFixRequired) {
                            self.playFixRequired = false;

                            // Enable the contols again
                            // self.player.jPlayer('option', 'cssSelectorAncestor', self.cssSelectorAncestor);

                            // Play if required, otherwise it will wait for the normal GUI input.
                            if (self.playFix) {
                                self.playFix = false;
                                $(this).jPlayer("play");
                            }
                        }
                    });
                    // Fix missing ended events.
                    this.player.on($.jPlayer.event.ended, function(event) {
                        if (self.endedFix) {
                            self.endedFix = false;
                            setTimeout(function() {
                                self.setMedia(self.media);
                            }, 0);
                            // what if it was looping?
                        }
                    });
                    this.player.on($.jPlayer.event.pause, function(event) {
                        if (self.endedFix) {
                            var remaining = event.jPlayer.status.duration - event.jPlayer.status.currentTime;
                            if (event.jPlayer.status.currentTime === 0 || remaining < 1) {
                                // Trigger the ended event from inside jplayer instance.
                                setTimeout(function() {
                                    self.jPlayer._trigger($.jPlayer.event.ended);
                                }, 0);
                            }
                        }
                    });
                }

                // Instance jPlayer
                this.player.jPlayer(this.options);

                // Store a local copy of the jPlayer instance's object
                this.jPlayer = this.player.data('jPlayer');

                // Store the real cssSelectorAncestor being used.
                this.cssSelectorAncestor = this.player.jPlayer('option', 'cssSelectorAncestor');

                // Apply Android fixes
                this.resetAndroid();

                return this;
            },
            setMedia: function(media) {
                this.media = media;

                // Apply Android fixes
                this.resetAndroid();

                // Set the media
                this.player.jPlayer("setMedia", this.media);
                return this;
            },
            play: function() {
                // Apply Android fixes
                if ($.jPlayer.platform.android && this.playFixRequired) {
                    // Apply Android play fix, if it is required.
                    this.playFix = true;
                } else {
                    // Other browsers play it, as does Android if the fix is no longer required.
                    this.player.jPlayer("play");
                }
            },
            resetAndroid: function() {
                // Apply Android fixes
                if ($.jPlayer.platform.android) {
                    this.playFix = false;
                    this.playFixRequired = true;
                    this.endedFix = true;
                    // Disable the controls
                    // this.player.jPlayer('option', 'cssSelectorAncestor', '#NeverFoundDisabled');
                }
            }
        };
        return fix;
    })(jQuery);

    var id = "#jquery_jplayer_1";

    var bubble = {
        mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
        oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
    };

    var lismore = {
        mp3: "http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
        oga: "http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
    };

    var options = {
        swfPath: "js",
        supplied: "mp3,oga",
        wmode: "window",
        smoothPlayBar: true,
        keyEnabled: true
    };

    var myAndroidFix = new jPlayerAndroidFix(id, bubble, options);

    $('#setMedia-Bubble').on('click', function() {
        myAndroidFix.setMedia(bubble);
        $('.jp-title ul li').text('Bubble');
    });
    $('#setMedia-Bubble-play').on('click', function() {
        myAndroidFix.setMedia(bubble).play();
        $('.jp-title ul li').text('Bubble');
    });

    $('#setMedia-Lismore').on('click', function() {
        myAndroidFix.setMedia(lismore);
        $('.jp-title ul li').text('Lismore');
    });
    $('#setMedia-Lismore-play').on('click', function() {
        myAndroidFix.setMedia(lismore).play();
        $('.jp-title ul li').text('Lismore');
    });
})();


// GOOGLE MAPS
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    var myLatlng = new google.maps.LatLng(59.42686, 24.783671);
    var myOptions = {
        zoom: 12,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        styles: [{
            featureType: "landscape",
            stylers: [{
                saturation: -100
            }, {
                lightness: 65
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "poi",
            stylers: [{
                saturation: -100
            }, {
                lightness: 51
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road.highway",
            stylers: [{
                saturation: -100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                saturation: -100
            }, {
                lightness: 30
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "road.local",
            stylers: [{
                saturation: -100
            }, {
                lightness: 40
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "transit",
            stylers: [{
                saturation: -100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "administrative.province",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "administrative.locality",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "administrative.neighborhood",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -25
            }, {
                saturation: -100
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                hue: "#ffff00"
            }, {
                lightness: -25
            }, {
                saturation: -97
            }]
        }]
    };

    var mapBlock = document.getElementById("map_canvas");

    if(!mapBlock) {
        return;
    }

    var map = new google.maps.Map(mapBlock, myOptions);
    var markerImage = new google.maps.MarkerImage(
        'img/marker_map.png',
        new google.maps.Size(26, 45)
    );

    var marker = new google.maps.Marker({
        icon: markerImage,
        position: myLatlng,
        map: map
    });
}
