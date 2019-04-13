'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.all = [];

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
      data.forEach(horn => {
        Horn.all.push(new Horn(horn));
      });

      Horn.all.forEach(horn => {
        $('main').append(horn.render());
      });
    })
    .then(Horn.populateFilter)
    .then(Horn.handleFilter);
};



Horn.populateFilter = () => {
 let filterKeywords = [];
 
 $('option').not(':first').remove();

 Horn.all.forEach(horn => {
   if (!filterKeywords.includes(horn.keyword))
   filterKeywords.push(horn.keyword);
 });

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
    });
};


Horn.handleFilter = () => {
  $('select').on('change', function () {
    let $selected = $(this).val();
    if ($selected !== 'default') {
      $('div').hide();

      Horn.all.forEach(horn => {
        if ($selected === horn.keyword) {
          $(`div[class="${$selected}"]`).addClass ('filtered').fadeIn();
        }
      });

      $(`option[value=${$selected}]`).fadeIn();
    } else {
      $('div').removeClass('filtered').fadeIn();
      $(`option[value=${$selected}]`).fadeIn();
    }
  });
};





// Horn.loadPhotos = () => {
//   Horn.all.forEach(horn => horn.render())
// }

$(() => Horn.readJson());




        //$('#filter-menu').append(`<option id="${item.keyword}">${item.keyword}</option>`)




// // select box filtering
// $('select[id="filter-menu"]').on('change', function () {
//   let $selection = $(this).val();
//   $('img').hide()
//   $(`img[data-keyword="${$selection}"]`).show()

// })

// $(document).ready(function () {
//   $('.tab-content').hide()
// })

