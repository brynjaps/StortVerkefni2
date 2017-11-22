var API_URL = '/videos.json?id=';

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('#main');

  program.init(main);
});

/**
 * Bílaleit. Sækir gögn með Ajax á apis.is.
 */
const program = (function() {
  let url;
  let container;
  let heading;

  function fetchData() {

    url = API_URL;

    console.log('url' + url);

    const request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function() {
      const data = JSON.parse(request.response);
      for(let i = 0; i < data.categories.length; i++) {
        let bigDiv = document.createElement('div');
        let title = document.createElement('h1');
        title.appendChild(document.createTextNode(data.categories[i].title))
        bigDiv.appendChild(title);
        container.appendChild(bigDiv);
        for(let j = 0; j < data.categories[i].videos.length; j++)
        {
          let smallDiv = document.createElement('div');
          bigDiv.appendChild(smallDiv);
          let video = (data.categories[i].videos[j])-1;
          let img = document.createElement('img');
          img.src = data.videos[video].poster;
          smallDiv.appendChild(img);
          let videoTitle = document.createElement('p');
          videoTitle.appendChild(document.createTextNode(data.videos[video].title))
          smallDiv.appendChild(videoTitle);
        }
      }
    };

    request.send();
  }

  function show() {
    let catData = fetchData(categories, 1,'');
    console.log('title: ' + catData.title);

    // console.log('title: ' + data.title);
    //
    // var dataArray = ['Title',data.title,'Created',data.created];
    //
    // for(let i=0; i<data.length; i++) {
    //   var dl = document.createElement('dl');
    //   var dt = document.createElement('dt');
    //   var dd = document.createElement('dd');
    //   container.appendChild(dl);
    //   dl.appendChild(dt);
    //   dt.appendChild(document.createTextNode(dataArray[i]));
    //   dl.appendChild(dd);
    //   dd.appendChild(document.createTextNode(dataArray[i+1]));
    //   i++;
    // }
  }

  function init(main) {
    heading = document.createElement('h1');
    heading.appendChild(document.createTextNode('Myndbandaleigan'));
    main.appendChild(heading);

    container = document.createElement('div');
    main.appendChild(container);
    fetchData();
  }

  return {
    init: init
  }
})();
