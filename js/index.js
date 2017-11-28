var API_URL = 'videos.json';

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('#main');

  program.init(main);
});


const program = (function() {
  let url;
  let container;
  let heading;
  let bigDiv;
  let smallDiv;
  let medDiv;
  let link;
  let nDiv;

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  //nær í data úr videos.json og sýnir þær á síðunni
  function fetchData() {

    url = API_URL;

    document.querySelector('.loading').visible = true;

    const request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function() {
      const data = JSON.parse(request.response);
      empty(main);
      heading.appendChild(document.createTextNode('Myndbandaleigan'));
      main.appendChild(heading);
      main.appendChild(container);
      for(let i = 0; i < data.categories.length; i++) {

        //býr til div sem heldur utan um flokka myndbanda
        createBigDiv(data.categories[i]);

        //býr til línuna á milli flokkanna
        createBottom();

        //býr til div utan um myndböndin í flokki
        createMedDiv();
        for(let j = 0; j < data.categories[i].videos.length; j++)
        {
          let video = (data.categories[i].videos[j])-1;
          show(data.videos[video]);
          timeStamp(data.videos[video].created);
        }
      }
    };

    request.send();
  }

  //býr til div sem heldur utan um flokka myndbanda
  function createBigDiv(data) {
    bigDiv = document.createElement('div');
    let title = document.createElement('h1');
    title.appendChild(document.createTextNode(data.title));
    bigDiv.appendChild(title);
    container.appendChild(bigDiv);
  }

  //býr til línuna á milli flokkanna
  function createBottom() {
    let bottom = document.createElement('div');
    bottom.setAttribute('class','bottom');
    bottom.classList.add('col');
    bottom.classList.add('col-10');
    container.appendChild(bottom);
  }

  //býr til div utan um myndböndin í flokki
  function createMedDiv() {
    medDiv = document.createElement('div');
    medDiv.setAttribute('class','row');
    bigDiv.appendChild(medDiv);
  }

  //býr til div sem er með mynd af myndbandinu og titli þess
  function show(data) {
    //breytir id í streng
    let id = data.id.toString();
    //bætir id við htmlLink-inn fyrir myndbandssíðu myndbandsins
    let htmlLink = "myndband.html?id=";
    url = htmlLink + id;

    //býr til div fyrir hvert myndbandsposter, titil og tíma
    createSmallDiv();

    //býr til link á myndbandið á myndband.html síðunni
    createLink(url);

    //býr til div utan um myndina af myndbandinu
    createNDiv();

    //birtir myndina af myndbandinu
    createImg(data);

    //birtir titil myndbandsins
    createVideoTitle(data);

    //birtir lengd myndbands
    createMiniDiv(data);
  }

  //býr til div fyrir hvert myndbandsposter, titil og tíma
  function createSmallDiv() {
    smallDiv = document.createElement('div');
    smallDiv.setAttribute('class','col');
    smallDiv.classList.add('col-lg-4');
    smallDiv.classList.add('col-md-6');
    smallDiv.classList.add('col-sm-12');
    medDiv.appendChild(smallDiv);
  }

  //býr til link á myndbandið á myndband.html síðunni
  function createLink(url) {
    link = document.createElement('a');
    link.setAttribute('class', 'a');
    smallDiv.appendChild(link);
    link.href = url;
  }

  //býr til div utan um myndina af myndbandinu
  function createNDiv() {
    nDiv = document.createElement('div');
    nDiv.setAttribute('class','div__image');
    link.appendChild(nDiv);
  }

  //birtir myndina af myndbandinu
  function createImg(data) {
    let img = document.createElement('img');
    img.setAttribute('class', 'image');
    img.src = data.poster;
    nDiv.appendChild(img);
  }

  //birtir titil myndbandsins
  function createVideoTitle(data) {
    let videoTitle = document.createElement('p');
    videoTitle.appendChild(document.createTextNode(data.title));
    videoTitle.setAttribute('class','title');
    link.appendChild(videoTitle);
  }

  //birtir lengd myndbands
  function createMiniDiv(data) {
    let miniDiv = document.createElement('div');
    miniDiv.setAttribute('class','duration');
    let time = convertTime(data.duration);
    let textMiniDiv = document.createTextNode(time);
    nDiv.appendChild(miniDiv);
    miniDiv.appendChild(textMiniDiv);
  }

  function convertTime(org) {
    const minute = Math.floor(org/60);
    const second = Math.floor(org%60);
    if (second < 10) {
      return(minute + ':0' + second);
    } else {
      return(minute + ':' + second);
    }
  }

  //sýnir hversu langt er síðan myndbandið var sett inná síðuna
  function timeStamp(dataCreated) {
    let time = new Date().getTime();
    let dataTime = dataCreated;
    let since = time - dataTime;
    let second = since/ 1000;
    let minute = second/60;
    let hour = minute/60;
    let day = hour/24;
    let week = day/7;
    let month = day/30;
    let year = day/365;

    year = year.toString();
    month = month.toString();
    week = week.toString();
    day = day.toString();
    hour = hour.toString();

    //let timeArray = [year, "ári síðan", "árum síðan", week, "viku síðan", "vikum síðan", day, "degi síðan", "dögum síðan", hour, "klukkustund síðan", "klukkustundum síðan"];

    let timeArray = [year, month, week, day, hour];

    for(let i = 0; i < timeArray.length; i++)
    {
      timeArray[i] = Math.floor(timeArray[i]);
    }

    year = timeArray[0];
    month = timeArray[1];
    week = timeArray[2];
    day = timeArray[3];
    hour = timeArray[4];

    let smallP = document.createElement('p');
    link.appendChild(smallP);

    if(year >= 1 )
    {
      if(year < 2)
      {
        smallP.appendChild(document.createTextNode("Fyrir " + year + " ári síðan"));
      }
      else {
        smallP.appendChild(document.createTextNode("Fyrir " + year + " árum síðan"));
      }
    }
    else if(month >= 1)
    {
      if(month < 2)
      {
        smallP.appendChild(document.createTextNode("Fyrir " + month + " mánuði síðan"));
      }
      else
      {
        smallP.appendChild(document.createTextNode("Fyrir " + month + " mánuðum síðan"));
      }
    }
    else if(week >= 1)
    {
      if(week < 2)
      {
        smallP.appendChild(document.createTextNode("Fyrir " + week + " viku síðan"));
      }
      else
      {
        smallP.appendChild(document.createTextNode("Fyrir " + week + " vikum síðan"));
      }
    }
    else if(day >= 1)
    {
      if(day < 2)
      {
        smallP.appendChild(document.createTextNode("Fyrir " + day + " degi síðan"));
      }
      else {
        smallP.appendChild(document.createTextNode("Fyrir " + year + " dögum síðan"));
      }
    }
    else if(hour >= 1)
    {
      if(hour < 2)
      {
        smallP.appendChild(document.createTextNode("Fyrir " + hour + " klukkustund síðan"));
      }
      else {
        smallP.appendChild(document.createTextNode("Fyrir " + hour + " klukkustundum síðan"));
      }
    }
    else {
      smallP.appendChild(document.createTextNode("Fyrir minna en 1 klukkustund síðan"));
    }

    smallP.setAttribute('class','time');
  }

  function init(main) {
    heading = document.createElement('h1');
    container = document.createElement('div');
    fetchData();
  }

  return {
    init: init,
  }
}());
