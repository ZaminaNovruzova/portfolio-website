import { userData } from "../db/data.js";

const expInfosLeft = document.querySelector(".expInfosLeft");
const expInfosRight = document.querySelector(".expInfosRight");

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
