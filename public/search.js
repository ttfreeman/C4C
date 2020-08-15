var searchForm = document.getElementById("search-form");
var selectCat = document.getElementById("select-cat");

function canSubmit(form) {
  if (
    searchForm.searchtext.value != null &&
    searchForm.searchtext.value != ""
  ) {
    var search = searchForm.searchtext.value;
    var category = selectCat.options[selectCat.selectedIndex].value;

    var url = `http://localhost:3000/api/search?search=${search}&cat=${category}`;
    getSearch(url);
  }
  return false;
}

searchForm.onsubmit = function () {
  return canSubmit(searchForm);
};

searchForm.onkeydown = function () {
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
        loadPage(data.data);
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
}
