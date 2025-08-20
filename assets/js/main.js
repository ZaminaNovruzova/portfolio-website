import { userData } from "../db/data.js";

const aboutText = document.querySelector(".aboutText");
const personImgIcons = document.querySelector(".personDetails .personImgIcons");
const serviceHeading = document.querySelector(".serviceHeading .titleWhite");
const serviceCards = document.querySelector(".serviceCards");
const expInfosLeft = document.querySelector(".expInfosLeft");
const expInfosRight = document.querySelector(".expInfosRight");
const hireRow = document.querySelector(".whyHire .row");
const footerText = document.querySelector(".footerText");
const contactList = document.querySelector(".contactList");
const buttons = document.querySelectorAll(".buttons .btn");

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    buttons.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
    item.classList.add("active");
  });
});

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

const footerWriteToHtml = () => {
  footerText.innerHTML = "";
  footerText.innerHTML = `<a href="index.html">
                            <div class="btn logo"><a href="index.html">
                                    <div class="logoPng"><img src="assets/images/logo.png" alt="logo-png"></div>
                                    <div class="logoName"><img src="assets/images/logo-name.png" alt="logo-name"></div>
                                    <div class="logoAuthor">
                                        <span class="madeBy">Made by</span>
                                        <h5 class="authorName">Jayesh Patil</h5>
                                    </div>
                                </a></div>
                        </a>
                        <p>${userData.footer_text}</p>
                        <ul class="socials"></ul>`;
                        
  const socials = document.querySelector(".socials"); //* bele edende kod isleyir bes bu ne derecede duzgundur 

  socials.innerHTML = "";
  userData.social_links.map((item) => {
    socials.innerHTML += `<li class="socialItem" id="${item.social_media_id}"><a href="${item.social_platform}" target="_blank">${item.social_media_icon}</a></li>`;
  });

  contactList.innerHTML = "";
  userData.contact.map((item) => {
    contactList.innerHTML += ` <li class="contactItem" id="${item.contact_id}"> <a href="${item.contact_url}" target="_blank">${item.contact_details}</a>`;
  });
};

footerWriteToHtml();
