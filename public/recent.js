var recentButton = document.getElementById("get-recent");

recentButton.addEventListener("click", getRecent);

function getRecent() {
  fetch("http://localhost:3000/api/recent")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        var selectCat = document.getElementById("select-cat");
        var category = selectCat.options[selectCat.selectedIndex].text;
        loadRecentTable(data.data[category]);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function loadRecentTable(data) {
  const tableHead = document.getElementById("table-head");
  show(tableHead);

  const table = document.getElementById("table-body");
  table.innerHTML = "";
  data.forEach((item) => {
    let row = table.insertRow();
    let recallId = row.insertCell(0);
    recallId.innerHTML = `<a href="/details/${item.recallId}" target="_blank">${item.recallId}</a>`;
    let title = row.insertCell(1);
    title.innerHTML = item.title;
    let category = row.insertCell(2);
    category.innerHTML = item.category;
    let date_published = row.insertCell(3);
    date_published.innerHTML = item.date_published;
    let url = row.insertCell(4);
    url.innerHTML = `<a href="/api/details/${item.recallId}" target="_blank">${item.url}</a>`;
  });
}

var show = function (elem) {
  if (!elem.classList.contains("is-visible")) {
    elem.classList.add("is-visible");
  }
};
