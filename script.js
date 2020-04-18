const key = "quHDK1qxlWkYSY3SmrC1QQ((",
  baseURL = "https://api.stackexchange.com/2.2/questions";
let URL;

const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");

const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");

const section = document.querySelector("section");

searchForm.addEventListener("submit", submitSearch);

function submitSearch(e) {
  pageNumber = 0;
  fetchResults(e);
}

function fetchResults(e) {
  e.preventDefault();

  URL = baseURL + "?api-key=" + key + "&site=stackoverflow&sort=activity";

  if (order.value === "desc") {
    URL += "&order=desc";
  } else {
    URL += "&order=asc";
  }
  if (startDate.value !== "") {
    URL += "&fromdate=" + new Date(startDate.value).getTime() / 1000;
  }
  if (endDate.value !== "") {
    URL += "&todate=" + new Date(endDate.value).getTime() / 1000;
  }
  if (page.value !== "") {
    URL += "&page=" + page.value;
  }
  if (pageSize.value !== "") {
    URL += "&pagesize=" + pageSize.value;
  }
  if (tag.value !== "") {
    URL += "&tagged=" + tag.value;
  }
  console.log(URL);

  fetch(URL)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      console.log(json);
      displayResults(json);
    });
}

function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  const length = Object.keys(json.items).length;

  console.log(pageNumber);
  if (length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results returned.";
    section.appendChild(para);
  } else {
    for (var i = 0; i < length; i++) {
      if ((i + 1) % 10 == 0) {
      }
      const article = document.createElement("article");
      const heading = document.createElement("h4");
      const link = document.createElement("a");
      const para1 = document.createElement("p");
      const clearfix = document.createElement("div");

      let current = json.items[i];

      link.textContent = i + 1 + "." + current.link;
      link.href = current.link;
      para1.textContent = "Tags: ";
      for (let j = 0; j < current.tags.length; j++) {
        const span = document.createElement("span");
        span.textContent += current.tags[j] + ", ";
        para1.appendChild(span);
      }

      clearfix.setAttribute("class", "clearfix");
      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(para1);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }
}
