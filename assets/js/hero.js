import { userData } from "../db/data.js";
import { experienceYearCalculate } from "./main.js";

const aboutText = document.querySelector(".aboutText");
const personImgIcons = document.querySelector(".personDetails .personImgIcons");

experienceYearCalculate()

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
