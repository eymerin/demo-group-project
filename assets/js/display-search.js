var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams(){
    var searchParms=document.location.search.split("&")

    var query=searchParms[0].split('=').pop()
    var format=searchParms[1].split('=').pop()

    searchApi(query,format)
}

function printResults(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.date + '<br/>';
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> No subject for this entry.';
    }
  
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong> ' + resultObj.description[0];
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this entry.';
    }
  
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    resultContentEl.append(resultCard);
  }
  

function  searchApi(query,format){
    var fetchURL='https://www.loc.gov/search/?fo=json';

    if(format){
        fetchURL = 'https://www.loc.gov/' + format + '/?fo=json';
    }

    fetchURL=fetchURL+ '&q=' + query

    fetch(fetchURL).then(function(response){
        if(!response.ok){
            throw response.json()
        }
        return response.json()
    }).then(function(data){
        resultTextEl.textContent=data.search.query

        console.log(data)

        if(!data.results.length){
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {

        for(var i=0; i<data.results.length;i++){
            printResults(data.results[i])
        }
         }

    })
    .catch(function (error) {
        console.error(error);
      });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal, formatInputVal);
  }

  searchFormEl.addEventListener('submit', handleSearchFormSubmit);


getParams();