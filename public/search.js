var limit = 5;
var searchForm = document.getElementById("search-form");
var selectCat = document.getElementById("select-cat");

function canSubmit(form, offset) {
  if (!offset) {
    offset = 0;
  }
  if (
    searchForm.searchtext.value != null &&
    searchForm.searchtext.value != ""
  ) {
    var search = searchForm.searchtext.value;
    var category = selectCat.options[selectCat.selectedIndex].value;

    var url = `http://localhost:3000/api/search?search=${search}&cat=${category}&off=${offset}&lim=${limit}`;
    getSearch(url);
  }
  return false;
}

searchForm.onsubmit = function () {
  return canSubmit(searchForm);
};

searchForm.onkeyup = function () {
  if (canSubmit(searchForm)) {
    searchForm.submit();
  }
};

selectCat.onchange = function () {
  if (canSubmit(searchForm)) {
    searchForm.submit();
  }
};

function getSearch(url) {
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        window.nextPageToken = data.nextPageToken;
        if (data.data.length > 0) {
          loadPage(data.data);
        }
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function loadPage(dataArray) {
  var resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = "";
  dataArray.forEach((result) => {
    var resultContent = `
    <div class="search-panel">
        <h4>${result.title}</h4>
        <p>${result.department}</p>
        <p>${result.pageurl}</p>
        <p>${result.url}</p>
        <a href="/details/${result.recallId}" target="_blank" ><button class="give-padding search-button">View</button></a>
    </div>
        `;

    resultsDiv.innerHTML += resultContent;
  });
  var pagDiv = `
  <div class="relative">
    <button id="more-results" class="main-button" onclick="getPrev()"><<<</button>
    <button id="more-results" class="main-button" onclick="getNext()">>>></button>
    <p class="search-page give-padding">Page ${window.nextPageToken / limit}
  </div>
  `;
  resultsDiv.innerHTML += pagDiv;
}

function getPrev() {
  if (window.nextPageToken > limit) {
    var offset = Number(window.nextPageToken) - limit * 2;
    if (canSubmit(searchForm, offset)) {
      searchForm.submit();
    }
  }
}

function getNext() {
  var offset = Number(window.nextPageToken);
  window.nextPageToken = offset;
  if (canSubmit(searchForm, offset)) {
    searchForm.submit();
  }
}
