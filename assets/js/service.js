import { userData } from "../db/data.js";

const serviceHeading = document.querySelector(".serviceHeading .titleWhite");
const serviceCards = document.querySelector(".serviceCards");

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
