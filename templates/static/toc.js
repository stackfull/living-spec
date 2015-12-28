'use strict';
$(document).foundation();

var featureLinks = $('.feature-link');
var featureContent = $('.feature-content');
featureLinks.click(function() {
  featureContent.hide();
  $($(this).attr('href')).show();
});


