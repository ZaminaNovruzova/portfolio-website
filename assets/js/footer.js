import { userData } from "../db/data.js";

const footerText = document.querySelector(".footerText");
const contactList = document.querySelector(".contactList");

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
