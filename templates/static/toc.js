'use strict';
$(document).ready(function($) {
  
  $(document).foundation();

  var featureLinks = $('.feature-link');
  var featureContent = $('.feature-content');
  featureLinks.click(function() {
    featureContent.hide();
    $($(this).attr('href')).show();
  });
  var hash = window.location.hash;
  if (hash != '') {
    var item = $('[data-accordion-menu] [href="' + hash + '"]');
    item.click()
        .parents('.is-accordion-submenu-parent')
        .children('a')
        .click()
  }
});


