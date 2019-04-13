'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allPhotos = [];

Horn.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml)

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
}

Horn.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allPhotos.push(new Horn(item));
        //$('#filter-menu').append(`<option id="${item.keyword}">${item.keyword}</option>`)
      });
      Horn.allPhotos.forEach(horn => {
        $('main').append(horn.render());
      });
    })
    .then(Horn.loadPhotos)
    .then(Horn.handlFilter);
};

Horn.loadPhotos = () => {
  Horn.allPhotos.forEach(horn => horn.render())
}

$(() => Horn.readJson());

// select box filtering
$('select[id="filter-menu"]').on('change', function () {
  let $selection = $(this).val();
  $('img').hide()
  $(`img[data-keyword="${$selection}"]`).show()

})

$(document).ready(function () {
  $('.tab-content').hide()
})

