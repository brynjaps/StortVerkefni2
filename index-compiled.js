'use strict';

var API_URL = '/videos.json?id=';

document.addEventListener('DOMContentLoaded', function () {
  // TODO keyra upp forrit
  var form = document.querySelector('#form');
  var results = document.querySelector('.results');

  program.init(form, results);
});

/**
 * Bílaleit. Sækir gögn með Ajax á apis.is.
 */
var program = function () {
  var input;
  var url;
  var container;

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function fetchData(e) {
    e.preventDefault();

    url = API_URL + input.value;

    console.log('url' + url);

    empty(container);

    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function () {
      var data = JSON.parse(request.response);

      // fáum eitt stak af
      show(data.categories[1]);
    };

    request.send();
  }

  function show(data) {
    empty(container);

    console.log('title: ' + data.title);

    var dataArray = ['Title', data.title, 'Created', data.created];

    for (var i = 0; i < dataArray.length - 1; i++) {
      var dl = document.createElement('dl');
      var dt = document.createElement('dt');
      var dd = document.createElement('dd');
      container.appendChild(dl);
      dl.appendChild(dt);
      dt.appendChild(document.createTextNode(dataArray[i]));
      dl.appendChild(dd);
      dd.appendChild(document.createTextNode(dataArray[i + 1]));
      i++;
    }
  }

  function init(form) {
    container = document.querySelector('div');
    input = form.querySelector('#number');
    form.addEventListener('submit', fetchData);
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=index-compiled.js.map