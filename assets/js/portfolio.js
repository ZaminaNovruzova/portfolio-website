import { userData } from "../db/data.js";
const portfolioCards = document.querySelector(".portfolioCards");
const portfolioLinks = document.querySelector(".portfolioLinks");
const aboutBrand = document.querySelector(".aboutBrand");
const seeAll=document.querySelector(".portfolioHeading .seeAll")
const portfolioBox=document.querySelector(".portfolioBox")
const initDatas = () => {
  const twoDatas = userData.portfolioDatas.slice(0, 2);
  showInitDatas(twoDatas);
};
const showInitDatas = (items) => {
  portfolioCards.innerHTML = "";
  items.map((item) => {
    portfolioCards.innerHTML += ` <div class="card" id="${item.category_id}">
                                    <div class="cardImg"><img src="${item.brand_image}" alt="image"></div>
                                    <div class="arrowRight">
                                        <a href="${item.brand_url}" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
                                                viewBox="0 0 34 34" fill="none">
                                                <path
                                                    d="M5.66667 15.5833C4.88426 15.5833 4.25 16.2176 4.25 17C4.25 17.7824 4.88426 18.4167 5.66667 18.4167L25.6215 18.4167L18.8316 25.2066C18.2784 25.7598 18.2784 26.6568 18.8316 27.2101C19.3848 27.7633 20.2818 27.7633 20.8351 27.2101L29.0417 19.0035C30.1481 17.897 30.1482 16.103 29.0417 14.9965L20.8351 6.78993C20.2818 6.23669 19.3848 6.23669 18.8316 6.78993C18.2784 7.34318 18.2784 8.24016 18.8316 8.7934L25.6215 15.5833L5.66667 15.5833Z" />
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="brand">
                                        <h3 class="brandTitle">${item.brand_name}</h3>
                                        <p class="brandText">${item.about_brand}</p>
                                    </div>
                                </div>`;
  });
};

initDatas();

const portfolioToHtml = (items) => {
  portfolioCards.innerHTML = "";
  items.map((item) => {
    portfolioCards.innerHTML += ` <div class="card" id="${item.category_id}">
                                    <div class="cardImg"><img src="${item.brand_image}" alt="image"></div>
                                    <div class="arrowRight">
                                        <a href="${item.brand_url}" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
                                                viewBox="0 0 34 34" fill="none">
                                                <path
                                                    d="M5.66667 15.5833C4.88426 15.5833 4.25 16.2176 4.25 17C4.25 17.7824 4.88426 18.4167 5.66667 18.4167L25.6215 18.4167L18.8316 25.2066C18.2784 25.7598 18.2784 26.6568 18.8316 27.2101C19.3848 27.7633 20.2818 27.7633 20.8351 27.2101L29.0417 19.0035C30.1481 17.897 30.1482 16.103 29.0417 14.9965L20.8351 6.78993C20.2818 6.23669 19.3848 6.23669 18.8316 6.78993C18.2784 7.34318 18.2784 8.24016 18.8316 8.7934L25.6215 15.5833L5.66667 15.5833Z" />
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="brand">
                                        <h3 class="brandTitle">${item.brand_name}</h3>
                                        <p class="brandText">${item.about_brand}</p>
                                    </div>
                                </div>`;
  });
};

const categoriesToHtml = () => {
  portfolioLinks.innerHTML = "";
  userData.categories.map((item) => {
    portfolioLinks.innerHTML += `<li class="grayBtn" id="${item.category_id}"><a href="#portfolio">${item.category_name}</a></li>`;
  });
};
categoriesToHtml();

const grayButtonsActive = () => {
  const grayBtns = document.querySelectorAll(".portfolioLinks .grayBtn");
  grayBtns.forEach((grayBtn) => {
    grayBtn.addEventListener("click", () => {
      grayBtns.forEach((btn) => {
        if (btn.classList.contains("active")) {
          btn.classList.remove("active");
        }
      });
      grayBtn.classList.add("active");
      const filteredItems = userData.portfolioDatas.filter(
        (item) => item.category_id === parseInt(grayBtn.id)
      );
      const firstTwoItems = filteredItems.slice(0, 2);
      portfolioToHtml(firstTwoItems);
    });
  });
};

grayButtonsActive();

const lastProjectToHtml = () => {
  aboutBrand.innerHTML = "";
  userData.portfolioDatas.find((item) => {
    aboutBrand.innerHTML = `<div class="subtitle" id="${item.portfolio_id}">
                                <h4>${item.brand_name} - ${item.brand_service}</h4>
                                <div class="arrowOrange">
                                    <a href="${item.brand_url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="none">
                                            <path d="M7.17 17L17 7" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M7 7H17V17" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <p>${item.about_brand}</p>`;
  });
};

lastProjectToHtml();

// const getAllPortfolioCards = () => {
//   portfolioBox.innerHTML = "";
//   userData.portfolioDatas.map((item) => {
//     portfolioBox.innerHTML += `<div class="card" id="${item.portfolio_id}">
//                                     <div class="cardImg"><img src="${item.brand_image}" alt="image"></div>
//                                     <div class="arrowRight">
//                                         <a href="${item.brand_url}" target="_blank">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
//                                                 viewBox="0 0 34 34" fill="none">
//                                                 <path
//                                                     d="M5.66667 15.5833C4.88426 15.5833 4.25 16.2176 4.25 17C4.25 17.7824 4.88426 18.4167 5.66667 18.4167L25.6215 18.4167L18.8316 25.2066C18.2784 25.7598 18.2784 26.6568 18.8316 27.2101C19.3848 27.7633 20.2818 27.7633 20.8351 27.2101L29.0417 19.0035C30.1481 17.897 30.1482 16.103 29.0417 14.9965L20.8351 6.78993C20.2818 6.23669 19.3848 6.23669 18.8316 6.78993C18.2784 7.34318 18.2784 8.24016 18.8316 8.7934L25.6215 15.5833L5.66667 15.5833Z" />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                     <div class="brand">
//                                         <h3 class="brandTitle">${item.brand_name}</h3>
//                                         <p class="brandText">${item.about_brand}</p>
//                                     </div>
//                                 </div>`;
//   });
// };
// seeAll.addEventListener("click",getAllPortfolioCards)