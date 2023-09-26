var searchFormElement= document.querySelector("#search-form");

function handleSearchSubmit(event){
    event.preventDefault()

    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
   
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
      }
    var queryString= './search-results.html?q='+searchInputVal+'&format='+formatInputVal

    location.assign(queryString)
}


searchFormElement.addEventListener('submit', handleSearchSubmit);