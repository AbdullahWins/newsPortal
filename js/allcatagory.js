//all catagories fetch

const loadCatagoryNames = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryNames(data.data.news_category);
  } catch (error) {
    //if the server is down or url is invalid, this will throw an error message
    const catagoryNameContainer = document.getElementById(
      "catagory-name-container"
    );
    catagoryNameContainer.innerHTML = `<p class="mx-auto my-auto rounded fs-2 fw-bold bg-danger"> Error While loading (server issues)<p/>`;
  }
};

//catagories news numbers

const displayCatagoryNames = (catagories) => {
  toggleSpinner(true);
  const catagoryNameContainer = document.getElementById(
    "catagory-name-container"
  );
  try {
    catagories.forEach((catagory) => {
      const catagoryList = document.createElement("li");
      catagoryList.innerHTML = `
      <p onclick="loadCatagory('${catagory.category_id}')" class="btn"> ${catagory.category_name}</p>
      `;
      catagoryList.classList.add("text-decoration-none");
      catagoryList.classList.add("d-flex");
      catagoryList.classList.add("justify-content-between");
      catagoryList.classList.add("align-items-center");
      catagoryNameContainer.appendChild(catagoryList);
      toggleSpinner(false);
    });
  } catch (error) {
    console.log("cannot load catagories");
  }
};

const loadCatagory = async (catagory) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${catagory}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryNews(data.data);
    numberOfNews(data.data.length);
  } catch (error) {
    console.log("can't load catagory");
  }
};

const displayCatagoryNews = (catagories) => {
  toggleSpinner(true);
  const catagoryNewsContainer = document.getElementById(
    "catagory-news-container"
  );
  catagoryNewsContainer.innerHTML = "";
  try {
    if (catagories.length < 1) {
      toggleSpinner(true);
      catagoryNewsContainer.innerHTML = `<p class="text-center fs-4"> No News Found</p>`;
      toggleSpinner(false);
    }
    catagories.forEach((catagory) => {
      const catagoryList = document.createElement("li");
      catagoryList.innerHTML = `
      <div class="col-md-4">
        <img src="${
          catagory.image_url
        }" class="img-fluid rounded p-0" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title mt-2">${
            catagory.title ? catagory.title : "Title Not Found"
          }</h5>
          <p class="card-text text-truncate">Details: ${
            catagory.details ? catagory.details : "Details Unavailable"
          }</p>
          
          <p class="card-text text-truncate">Rating: ${
            catagory.rating.number
              ? catagory.rating.number
              : "Rating Unavailable"
          }</p>
          <div class="col-md-1">
        <img src="${
          catagory.author.img
        }" class="img-fluid rounded d-none d-md-block w-50" alt="...">
        </div>
        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <p class="card-text"><small class="text-muted">Author: ${
            catagory.author.name ? catagory.author.name : "Author Not Found"
          }</small></p>
          <p class="card-text text-truncate">Views: ${
            catagory.total_view ? catagory.total_view : "No Data Found"
          }</p>
          <p class="btn btn-primary" 
          data-bs-toggle="modal"
          data-bs-target="#newsModal">See Details</p>
          </div>
        </div>
      </div>
      <div
            class="modal fade"
            id="newsModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Headline: ${
                    catagory.title ? catagory.title : "Title Not Found"
                  }</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                <div class="d-flex justify-content-center">
                <img src="${
                  catagory.image_url
                }" class="img-fluid rounded" alt="...">
                </div>
                ${catagory.details ? catagory.details : "Details Unavailable"}
                <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <p class="card-text"><small class="text-muted">Author: ${
              catagory.author.name ? catagory.author.name : "Author Not Found"
            }</small></p>
            <p class="card-text text-truncate">Views: ${
              catagory.total_view ? catagory.total_view : "No Data Found"
            }</p>
                </div>
                <div class="modal-footer"></div>
              </div>
        `;
      catagoryList.classList.add("row");
      catagoryList.classList.add("m-5");
      catagoryNewsContainer.appendChild(catagoryList);
      toggleSpinner(false);
    });
  } catch (error) {
    console.log();
  }
};

loadCatagoryNames();
displayCatagoryNews();
