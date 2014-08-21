/**
jquery.imageSlider.js

Copyright (C) 2014 Alexander Duml

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
**/

;(function($) {
    $.fn.imageSlider = function() {
        return this.each(function() {
            var $self = $(this),
                offset = $self.offset().left,
                $photo = $self.find(".image-left"),
                $img = $photo.find("img");

            // set width and height
            function setInitalParms() {
                $self
                    .addClass("image-slider-wrapper")
                    .css("width", $img.width())
                    .css("height", $img.height());

                    // init left image
                    $photo.css('max-width', $img.width() + "px");
                    setDivWidth($img.width() / 2);
                }

                // set left image-divs width
                function setDivWidth(pixel) {
                    $photo.width(pixel + "px");
                }

                // check if image is already loaded
                if ($img[0].complete) {
                    setInitalParms();
                } else {
                    $img.load(setInitalParms);
                }

                // add mouse listeners
                $self
                    .mousemove(function(e) {
                        setDivWidth(e.pageX - offset);
                    })
                    .mouseleave(function(e) {
                        setDivWidth(e.pageX - offset);
                    })
                    .bind("dragstart", function(e) {
                        return false;
                    });
        });
    };
})($);
