import { userData } from "../db/data.js";

//*arrowcircle her bir service in url in saxlayir basanda hemin service sehifesine gedir bu ya portfolio ya da blogpost olacaq

//*arrowcircle basanda get portfoliodan ux desing buttonu nun islerini goster
const aboutText = document.querySelector(".aboutText");
const personImgIcons = document.querySelector(".personDetails .personImgIcons");
const serviceHeading = document.querySelector(".serviceHeading .titleWhite");
const serviceCards = document.querySelector(".serviceCards");
const expInfosLeft = document.querySelector(".expInfosLeft");
const expInfosRight = document.querySelector(".expInfosRight");
const hireRow = document.querySelector(".whyHire .row");
const portfolioCards = document.querySelector(".portfolioCards");
const portfolioLinks = document.querySelector(".portfolioLinks");
const aboutBrand = document.querySelector(".aboutBrand");


//*herodaki experience year dinamike cevrildi done

const experienceYearCalculate = () => {
  const dates = userData.experience.flatMap((item) => {
    return item.date
      .split("-")
      .map((item) => item.trim())
      .map((item) => new Date(item));
  });
  let minDate = new Date(Math.min(...dates));
  let today = new Date();
  let experienceYear = today.getTime() - minDate.getTime();
  let years = Math.round(experienceYear / 1000 / 60 / 60 / 24 / 365);
  return (userData.experienceYear = years);
};

experienceYearCalculate();

const heroWriteToHtml = () => {
  aboutText.innerHTML = "";
  aboutText.innerHTML = `<div class="quoteCard">
                            <div class="quoteUp"><img src="assets/images/quote-up.png" alt="quote"></div>
                            <p class="text">${userData.heroText}</p>
                        </div>
                        <div class="experienceCard">
                            <div class="stars"><img src="assets/images/stars-five.png" alt="stars"></div>
                            <div class="experienceText">
                                <span class="year"> ${userData.experienceYear} Years</span>
                                <p class="experience">Experience</p>
                            </div>
                        </div>`;

  const newDiv = document.createElement("div");
  newDiv.classList.add("personImg");
  newDiv.innerHTML = `<img src="${userData.personImg}" alt="woman">`;
  personImgIcons.insertAdjacentElement("afterend", newDiv);
};
heroWriteToHtml();

const serviceWriteToHtml = () => {
  serviceCards.innerHTML = "";
  userData.services.map((item) => {
    serviceCards.innerHTML += `<div class="card swiper-slide" id="${item.id}">
                                <h4 class="cardTitle">${item.title}</h4>
                                <div class="cardImg">
                                    <div class="img"> <img src="${item.image}" alt="services">
                                    </div>
                                    <div class="cardImgShadow dark"></div>
                                    <div class="cardImgShadow light"></div>
                                    <div class="arrowCircle">
                                        <a href="${item.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="none">
                                                <path d="M7.17 17L17 7" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path d="M7 7H17V17" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>`;
  });

  let text = document.createElement("p");
  text.classList.add("text");
  text.innerText = userData.serviceText;
  serviceHeading.insertAdjacentElement("afterend", text);
};

serviceWriteToHtml();

const experienceWriteToHtml = () => {
  expInfosLeft.innerHTML = "";
  userData.experience.map((item) => {
    expInfosLeft.innerHTML += `<div class="expData">
                                <h3 class="job">${item.place}</h3>
                                <p class="date">${item.date}</p>
                            </div>`;
  });
  expInfosRight.innerHTML = "";
  userData.experience.map((item) => {
    expInfosRight.innerHTML += `<div class="expData">
                                <h3 class="job">${item.job}</h3>
                                <p class="date">${item.about}</p>
                            </div>`;
  });
};
experienceWriteToHtml();

const hireWriteToHtml = () => {
  hireRow.innerHTML = "";
  hireRow.innerHTML = `<div class="photoMask">
                        <div class="womanImg">
                            <img src="${userData.hireImgHover}" alt="woman">
                        </div>
                        <div class="womanImgHover"><img src="${userData.hireImg}" alt="woman"></div>
                    </div>
                    <div class="hireTextCard">
                        <h2 class="title">Why <span class="orange">Hire me</span>?</h2>
                        <p class="hireText">${userData.hireText}</p>
                        <div class="statistics">
                            <div class="completedProject">
                                <p class="number">${userData.portfolioDatas.length}</p>
                                <p class="completedText">Project Completed</p>
                            </div>
                        </div>
                        <div class="btn hire">
                        </div>
                    </div>`;
};
hireWriteToHtml();

//*button link js le elave olundu

const hireButtonToHtml = () => {
  const hireBtns = document.querySelectorAll(".hire");
  hireBtns.forEach((item) => {
    const hireBtn = document.createElement("a");
    hireBtn.href = userData.hireButton;
    hireBtn.target = "_blank";
    hireBtn.textContent = "Hire me";
    item.prepend(hireBtn); //*ilk bunu elave edir hire classin icine
  });
};

hireButtonToHtml();

const portfolioToHtml = () => {
  portfolioCards.innerHTML = "";
  userData.portfolioDatas.map((item) => {
    portfolioCards.innerHTML += ` <div class="card">
                                <div class="arrowRight">
                                    <a href="${item.brand_url}" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
                                            viewBox="0 0 34 34" fill="none">
                                            <path
                                                d="M5.66667 15.5833C4.88426 15.5833 4.25 16.2176 4.25 17C4.25 17.7824 4.88426 18.4167 5.66667 18.4167L25.6215 18.4167L18.8316 25.2066C18.2784 25.7598 18.2784 26.6568 18.8316 27.2101C19.3848 27.7633 20.2818 27.7633 20.8351 27.2101L29.0417 19.0035C30.1481 17.897 30.1482 16.103 29.0417 14.9965L20.8351 6.78993C20.2818 6.23669 19.3848 6.23669 18.8316 6.78993C18.2784 7.34318 18.2784 8.24016 18.8316 8.7934L25.6215 15.5833L5.66667 15.5833Z" />
                                        </svg>
                                    </a>
                                </div>
                                <div class="lirante">
                                    <h3 class="liranteTitle">${item.brand_name}</h3>
                                    <p class="liranteText">${item.about_brand}</p>
                                </div>
                            </div>`;
  });
  portfolioLinks.innerHTML = "";
  userData.categories.map((item) => {
    portfolioLinks.innerHTML += `<li class="grayBtn" id=${item.id}><a href="#">${item.category_name}</a></li>`;
  });
};

portfolioToHtml();

const lastProjectToHtml = (id) => {
  aboutBrand.innerHTML = "";
  userData.portfolioDatas.find((item) => {

    if(item.id===id){
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
    }
 
  });
};

lastProjectToHtml()