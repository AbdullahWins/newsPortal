//spinner

const spinnerStatus = document.getElementById("spinner");

const toggleSpinner = (isOn) => {
  try {
    if (isOn === true) {
      spinnerStatus.classList.remove("d-none");
      spinnerStatus.classList.add("d-block");
    } else {
      spinnerStatus.classList.add("d-none");
      spinnerStatus.classList.remove("d-block");
    }
  } catch (error) {
    console.log("spinner did not load properly");
  }
};

const numberOfNews = (numbers) => {
  const numberContainer = document.getElementById("number-of-news");
  numberContainer.innerHTML = `
      <p class="fs-3 fw-bold text-center border rounded m-3 p-3"> Total ${numbers} news were found. <p/>
      `;
};

const primaryLoad = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/08`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPrimaryNews(data.data);
    numberOfNews(data.data.length);
  } catch (error) {
    console.log("no response from the server");
  }
};

const displayPrimaryNews = (catagories) => {
  toggleSpinner(true);
  const catagoryNewsContainer = document.getElementById(
    "catagory-news-container"
  );
  catagoryNewsContainer.innerHTML = "";
  if (catagories.length < 1) {
    catagoryNewsContainer.innerHTML = `<p class="text-center fs-4"> No News Found</p>`;
  }
  try {
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
      toggleSpinner(false);
      catagoryList.classList.add("row");
      catagoryList.classList.add("m-5");
      catagoryNewsContainer.appendChild(catagoryList);
    });
  } catch (error) {
    console.log("default page loading failed");
  }
};

primaryLoad();
