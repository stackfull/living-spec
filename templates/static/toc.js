'use strict';
$(document).ready(function($) {
  
  $(document).foundation();

  var featureLinks = $('.feature-link');
  var featureContent = $('.feature-content');
  featureLinks.click(function() {
    featureContent.hide();
    $($(this).attr('href')).show();
  });
  $('.search-toggle').click(function() {
    $('#toc').toggleClass('browsing').toggleClass('searching');
  });
  $('#search-box').on('input propertychange past', function() {
    var search = this.value;
    $('#search-list li').each(function() {
      var el = $(this);
      el.toggle(el.text().includes(search));
    });
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


