import { userData } from "../db/data.js";
import { inputValidation } from "./check_validation.js";

const headerButtons = document.querySelectorAll(".buttons .btn");
const footerButtons = document.querySelectorAll(".footerButtons .btn");
const infoBtn = document.querySelector(".infoBtn");
const email = document.querySelector("#email");

//*header ve footer ucun

function findHeaderBtnByHref(href) {
  return [...headerButtons].find(
    (btn) => btn.querySelector("a")?.getAttribute("href") === href
  );
}

headerButtons.forEach((item) => {
  item.addEventListener("click", () => {
    headerButtons.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
    item.classList.add("active");
  });
});

footerButtons.forEach((item) => {
  item.addEventListener("click", () => {
    headerButtons.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });

    let href = item.querySelector("a")?.getAttribute("href");
    console.log(href, "oxu");
    const headerBtn = findHeaderBtnByHref(href);
    if (headerBtn) {
      headerBtn.classList.add("active");
    }
    footerButtons.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");
  });
});

export const hireButtonToHtml = () => {
  const hireBtns = document.querySelectorAll(".hire");
  hireBtns.forEach((item) => {
    const hireBtn = document.createElement("a");
    hireBtn.href = userData.hireButton;
    hireBtn.target = "_blank";
    hireBtn.textContent = "Hire me";
    item.prepend(hireBtn); //*ilk bunu elave edir hire classin icine
  });
};

export const experienceYearCalculate = () => {
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

//*email form
userData.emailList = [];

function addEmail() {
  if (!inputValidation()) return;

  let emailValue = email.value.trim();
  userData.emailList.push({
    email_id: userData.emailList.length + 1,
    email_addres: emailValue,
  });
  emailValue = "";

}
infoBtn.addEventListener("click", addEmail);
