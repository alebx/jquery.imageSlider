/**
* jquery.imageSlider.js
* MIT licensed
* Copyright (C) 2014 Alexander Duml
**/

;(function($) {
    "use strict";

    /**
     * Appends jQuery.imageSlider
     * @param {Object} options  imageSlider options {left: 'left image-url', right: 'right image-url'}
     * @returns {jQuery}
     */
    $.fn.imageSlider = function(options) {
        return this.each(function() {
            if (!options.left || !options.right) {
                throw "option image url is missing!";
            }

            // create dom structure
            var $self = $(this)
                    .empty()
                    .addClass("image-slider-wrapper"),
                $divLeft = $('<div>')
                    .addClass('image-left')
                    .append($('<img>').attr('src', options.left))
                    .appendTo($self);
            $('<div>')
                .addClass('image-right')
                .append($('<img>').attr('src', options.right))
                .appendTo($self);

            // get image information
            var offset = $self.offset().left,
                $img = $divLeft.find("img");

            /**
             * init imageSlider
             */
            function init() {
                // init wrapper's width and height
                $self
                    .css("width", $img.width())
                    .css("height", $img.height());

                // init left image div
                $divLeft.css('max-width', $img.width() + "px");
                setDivWidth($img.width() / 2);
            }

            /**
             * Set left image-divs width
             * @param {int} width
             */
            function setDivWidth(width) {
                $divLeft.width(width + "px");
            }

            // check if image is already loaded
            if ($img[0].complete) {
                init();
            } else {
                $img.load(init);
            }

            // add mouse listeners
            $self
                .mousemove(function(e) {
                    setDivWidth(e.pageX - offset);
                })
                .mouseleave(function(e) {
                    setDivWidth(e.pageX - offset);
                })
                // disable drag and drop
                .bind("dragstart", function() {
                    return false;
                });
        });
    };
})(jQuery);
