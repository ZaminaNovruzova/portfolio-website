import { userData } from "../db/data.js";
import { showError, inputValidation } from "./check_validation.js";

const form = document.querySelectorAll("form"); //*form prevent default etmek ucun
const serviceBox = document.querySelector(".serviceBox"); //*htmle kartlari yazmaq ucun
const add = document.querySelector(".add"); //*add butonuna basanda modal window acilmasi ucun
const modalWindow = document.querySelector(".modalWindow"); //*modal window acilmasi ucun
const overlay = document.querySelector(".overlay"); //*bunu cancel butonunun altenativi kimi istifade edeceyik
const cancel = document.querySelector(".cancel"); //*cancel basanda sehife baglanmasi ucun
const input = document.querySelectorAll(".addServiceWindow input"); //*butun inputlardan sonra error mesaji cixara bilmek ucun
const submit = document.querySelector(".submit"); //*submite klik edende yoxlanis olmasi ve liste elave olunmasi ucun
const serviceTitle = document.querySelector("#serviceTitle"); //*add metodunda isletdim
const url = document.querySelector("#url"); //*add metodunda isletdim
const image = document.querySelector("#image"); //*add metodunda isletdim

let editingId = null;

form.forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});

// //* localStorage de saxla

// const checkSavedServices = () => {
//   const saved = JSON.parse(localStorage.getItem("services"));
//   if (saved) {
//     userData.services = saved;
//   }
// };

// //*evvelce data varmi yoxmu yoxla;
// //*varsa avtomatik getir mene

// checkSavedServices();

// //*yoxdursa yadda saxla

// const saveServiceCard = () => {
//   localStorage.setItem("services", JSON.stringify(userData.services));
// };

//*yeni service elave etmek ucun button

function openModalWindow() {
  add.addEventListener("click", () => {
    modalWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

function closeModalWindow() {
  overlay.addEventListener("click", () => {
    modalWindow.classList.remove("active");
    overlay.classList.remove("active");
    input.forEach((item) => (item.value = ""));
    editingId = null;
  });

  cancel.addEventListener("click", () => {
    modalWindow.classList.remove("active");
    overlay.classList.remove("active");
    input.forEach((item) => (item.value = ""));
  });
}

function addService() {
  if (!inputValidation()) return;

  let titleInput = serviceTitle.value.trim();
  let imgInput = image;
  let urlInput = url.value.trim();
  let file = imgInput.files[0];

  const imagePreviewUrl = file ? URL.createObjectURL(file) : "";

  const existingservice = userData.services.find(
    (item) => item.title.toLowerCase() === titleInput?.toLowerCase()
  );
  if (existingservice) {
    showError(serviceTitle, "Bu xidmet artiq movcuddur");
    return;
  } else {
    userData.services.push({
      id: userData.services.length + 1,
      title: titleInput,
      image: imagePreviewUrl,
      url: urlInput,
    });
  }

  closeModalWindow();
  //   saveServiceCard();
  writeToHtml();
}

submit.addEventListener("click", addService);

function writeToHtml() {
  serviceBox.innerHTML = "";
  userData.services.map((item) => {
    serviceBox.innerHTML += `<div class="card" >
                            <h4 class="cardTitle">${item.title}</h4>
                            <div class="cardImg">
                                <div class="img"><img src="${item.image}" alt="services"></div>
                                <div class="cardImgShadow dark"></div>
                                <div class="cardImgShadow light"></div>
                                <div class="arrowCircle">
                                    <a href="${item.url}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                            <path d="M7.17 17L17 7" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M7 7H17V17" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="changeCard">
                                <form class="setItem">
                                    <button id="${item.id}" class="change" type="button">Change</button>
                                    <button  id="${item.id}" class="delete" type="button">Delete</button>
                                </form>
                            </div>
                        </div>`;
  });
}
writeToHtml();

function editService(id) {
  let finded = userData.services.find((item) => item.id === id); //*tapildi
  if (!finded) return;
  editingId = finded.id; //*finded id ni editing idye menimsetdi
  serviceTitle.value = finded.title; //*bunlarin hamsini tekrar doldurur open modalda gorunmesi ucun
  url.value = finded.url;
  image.value = finded.image;
  console.log("salam", serviceTitle.value);
  console.log("salam", url.value);
  console.log("salam", image.value);
  console.log("salam");

  //   openModalWindow();
  // serviceBox.addEventListener("click", openModalWindow())

  // submit.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   if (!inputValidation()) return;
  //   const index = userData.services.findIndex((item) => {
  //     console.log(item.id, editingId);
  //     if (index === -1) return;
  //     console.log(index);
  //   });

  //   userData.services[index].title = serviceTitle.value.trim();
  //   userData.services[index].url = url.value.trim();
  //   const file = image.files?.[0];
  //   if (file) {
  //     userData.services[index].image = URL.createObjectURL(file);
  //     // əgər gerçek faylı saxlamaq istəyirsənsə:
  //     // userData.services[idx].image = file;  // amma renderdə src kimi işləməyəcək
  //   }
  // });

  //*change basanda modalWinodw acilsin, boxun datalari icinde olmaq serti ile
  writeToHtml();
  closeModalWindow();
}

function deleteService(id) {
  const finded = userData.services.find((item) => item.id === id);
  if (finded) {
    let isDelete = confirm("Silmek istediyinize eminsiz?");
    if (isDelete) {
      userData.services = userData.services.filter((item) => item.id !== id);
    }
  }
  writeToHtml();
}

serviceBox.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    //*eger deletebtn varsa
    deleteBtn.addEventListener("click", deleteService(Number(deleteBtn.id))); //*id string oldugu ucun numbere cevirdim
  } //*ve bu idli deletebtn a click edende  getsin funksiyani isletsin

  const changeBtn = e.target.closest(".change");
  if (changeBtn) {
    changeBtn.addEventListener("click", editService(Number(changeBtn.id)));
  }
  writeToHtml();
});
