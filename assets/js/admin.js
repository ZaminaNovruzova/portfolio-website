import { userData } from "../db/data.js";
import { showError, inputValidation, createError } from "./check_validation.js";

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

form.forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});

//* localStorage de saxla

const checkSavedServices = () => {
  const saved = JSON.parse(localStorage.getItem("services"));
  if (saved) {
    userData.services = saved;
  }
};

//*evvelce data varmi yoxmu yoxla;
//*varsa avtomatik getir mene

checkSavedServices();

//*yoxdursa yadda saxla

const saveServiceCard = () => {
  localStorage.setItem("services", JSON.stringify(userData.services));
};

//*yeni service elave etmek ucun button

function openModalWindow() {
  modalWindow.classList.add("active");
  overlay.classList.add("active");
}
function closeModalWindow() {
  modalWindow.classList.remove("active");
  overlay.classList.remove("active");
  input.forEach((item) => (item.value = ""));
}

add.addEventListener("click", openModalWindow);
overlay.addEventListener("click", closeModalWindow);
cancel.addEventListener("click", closeModalWindow);

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

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function deleteService(id) {
  const finded = userData.services.find((item) => item.id === id);
  if (finded) {
    let isDelete = confirm("Silmek istediyinize eminsiz?");
    if (isDelete) {
      userData.services = userData.services.filter((item) => item.id !== id);
    }
  }
  saveServiceCard();
  writeToHtml();
}

function addService() {
  if (!inputValidation()) return;

  let titleInput = serviceTitle.value.trim();
  let urlInput = url.value.trim();
  let file = image.files[0]; //*file obyektinden 0ci indexi yeni sekli getir

  openModalWindow();

  const imagePreviewUrl = file ? URL.createObjectURL(file) : "";
  //*seklin muveqqeti url i muveqqeti oldugu ucun qalmir tez bir zamanda yoxa cixir daimi url lazimdir

  const existingservice = userData.services.find(
    (item) => item.title.toLowerCase() === titleInput?.toLowerCase()
  );
  //*men isteyirem ki bu error diger setirlerde xeta olanda da qalmaga davam etsin amma yoxa cixir

  if (existingservice) {
    createError(serviceTitle, "Bu xidmet artiq movcuddur");
    return;
  } else {
    userData.services.push({
      id: userData.services.length + 1,
      title: capitalize(titleInput),
      image: imagePreviewUrl,
      url: urlInput,
    });
  }
  saveServiceCard();
  closeModalWindow();
  writeToHtml();
}

let currentEditId = null;

function getServiceİnfo(id) {
  //*yalniz formu doldurur
  let finded = userData.services.find((item) => item.id === id); //*tapildi
  if (!finded) return;

  currentEditId = finded.id;
  serviceTitle.value = finded.title; //*bunlarin hamsini tekrar doldurur open modalda gorunmesi ucun
  url.value = finded.url;
  document.querySelector("#image").src = finded.image;
  openModalWindow();
}

function editService(id) {
  const finded = userData.services.find((item) => item.id === id);
  if (!finded) return;

  if (!inputValidation()) return;

  const file = image.files?.[0];
  if (file) {
    finded.image = URL.createObjectURL(file);
  }
  finded.title = capitalize(serviceTitle.value.trim());
  finded.url = url.value.trim();

  saveServiceCard();
  closeModalWindow();
  writeToHtml();
}

serviceBox.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    //*eger deletebtn varsa
    deleteService(Number(deleteBtn.id)); //*id string oldugu ucun numbere cevirdim
    //*ve bu idli deletebtn a click edende  getsin funksiyani isletsin
    return;
  }
  const changeBtn = e.target.closest(".change");
  if (changeBtn) {
    currentEditId = Number(changeBtn.id);
    getServiceİnfo(currentEditId);
    return;
  }
  writeToHtml();
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentEditId) {
    editService(currentEditId);
    currentEditId = null;
  } else {
    addService();
  }
});
//*unutma her click in ozunun funksiyasi olmalidir
