var API_URL = '/videos.json?id=';

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

  //nær í data úr videos.json og sýnir þær á síðunni
  function fetchData() {

    url = API_URL;

    console.log('url' + url);

    const request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function() {
      const data = JSON.parse(request.response);
      for(let i = 0; i < data.categories.length; i++) {
        bigDiv = document.createElement('div');
        let title = document.createElement('h1');
        title.appendChild(document.createTextNode(data.categories[i].title))
        bigDiv.appendChild(title);
        container.appendChild(bigDiv);
        medDiv = document.createElement('div');
        medDiv.setAttribute('class','container');
        bigDiv.appendChild(medDiv);
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

  //býr til div sem er með mynd af myndbandinu og titli þess
  function show(data) {
    let id = data.id.toString();
    let htmlLink = "myndband.html?id=";
    url = htmlLink + id;
    smallDiv = document.createElement('div');
    smallDiv.setAttribute('class', 'flex-item');
    let link = document.createElement('a');
    link.appendChild(smallDiv);
    link.href = url;
    medDiv.appendChild(link);
    let img = document.createElement('img');
    img.src = data.poster;
    smallDiv.appendChild(img);
    let videoTitle = document.createElement('p');
    videoTitle.appendChild(document.createTextNode(data.title))
    smallDiv.appendChild(videoTitle);
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
    let year = day/365;

    year = year.toString();
    week = week.toString();
    day = day.toString();
    hour = hour.toString();

    //let timeArray = [year, "ári síðan", "árum síðan", week, "viku síðan", "vikum síðan", day, "degi síðan", "dögum síðan", hour, "klukkustund síðan", "klukkustundum síðan"];

    let timeArray = [year, week, day, hour];

    for(let i = 0; i < timeArray.length; i++)
    {
      timeArray[i] = Math.floor(timeArray[i]);

      // let i2 = i+1;
      // console.log(i2);
      // let i3 = i+2;
      // console.log(i3);
      //
      // if(timeArray[i] >= 1)
      // {
      //   if(timeArray[i] < 2)
      //   {
      //     smallDiv.appendChild(document.createTextNode("Fyrir " + timeArray[i] + " " + timeArray[i2]));
      //   }
      //   else
      //   {
      //     smallDiv.appendChild(document.createTextNode("Fyrir " + timeArray[i] + " " + timeArray[i3]));
      //   }
      // }
      // else break;
    }

    year = timeArray[0];
    week = timeArray[1];
    day = timeArray[2];
    hour = timeArray[3];

    let smallP = document.createElement('p');
    smallDiv.appendChild(smallP);

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
    init: init,
  }
}());
