// import { userData } from "../db/data.js";
// const serviceBox = document.querySelector(".serviceBox"); //*htmle kartlari yazmaq ucun
// const add = document.querySelector(".add"); //*add butonuna basanda modal window acilmasi ucun
// const modalWindow = document.querySelector(".modalWindow"); //*modal window acilmasi ucun
// const input = document.querySelectorAll(".addServiceWindow input"); //*butun inputlardan sonra error mesaji cixara bilmek ucun
// const submit = document.querySelector(".submit"); //*submite klik edende yoxlanis olmasi ve liste elave olunmasi ucun
// const cancel = document.querySelector(".cancel"); //*cancel basanda sehife baglanmasi ucun
// const serviceTitle = document.querySelector("#serviceTitle"); //*add metodunda isletdim
// const url = document.querySelector("#url");  //*add metodunda isletdim
// const image = document.querySelector("#image"); //*add metodunda isletdim
// const overlay = document.querySelector(".overlay"); //*bunu cancel butonunun altenativi kimi istifade edeceyik
// const inputTextValidation = /^(?=(?:.*[a-zA-Z]){6,}).+$/; 
// const urlValidation =
//   /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
// // const deleteObject = document.querySelector(".delete");
// const form = document.querySelectorAll("form"); //*form prevent default etmek ucun
// // const change=document.querySelector(".change")
// // console.log(change)

// form.forEach((form) => {
//   form.addEventListener("submit", (e) => e.preventDefault());
// });
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

// //*yeni service elave etmek ucun button

// add.addEventListener("click", () => {
//   modalWindow.classList.add("active");
//   overlay.classList.add("active");
// });

// //! 1. overlay funksiya islemir active silinmir

// overlay.addEventListener("click", () => {
//   modalWindow.classList.remove("active");
//   overlay.classList.remove("active");
// });

// cancel.addEventListener("click", () => {
//   modalWindow.classList.remove("active");
//   overlay.classList.remove("active");
//   input.forEach((item) => (item.value = ""));
// });

// function showError(element, message) {
//   let error = document.createElement("p");
//   error.className = "error";
//   error.textContent = message;
//   element.after(error);
// }

// //*validation yoxlayaq

// let isValid = true;

// const inputValidation = () => {
//   input.forEach((item) => {
//     if (item.nextElementSibling?.classList.contains("error")) {
//       item.nextElementSibling.remove();
//     }

//     let val = item.value.trim();

//     if (!val) {
//       showError(item, "Bu hisse bos ola bilmez!!!");
//       isValid = false;
//       return;
//     }

//     if (item.type === "text") {
//       if (!inputTextValidation.test(val)) {
//         showError(item, "Zehmet olmasa duzgun input daxil edin!");
//         isValid = false;
//         return;
//       }
//     } else if (item.type === "url") {
//       if (!urlValidation.test(val)) {
//         showError(item, "Zehmet olmasa duzgun url daxil edin!");
//         isValid = false;
//         return;
//       }
//     }
//     if (item.type === "file") {
//       const validFileTypes = ["jpg", "jpeg", "png", "webp"];
//       const file = item.files[0]; //*browserde file secende inputun daxilinde fileList adli xususi obyekt yaranir ki bu da da files adli property saxlayir ve buda list saxlayir ozunde ilk element de bizim secdiyimiz elementdir
//       const maxSizeMb = 2;
//       if (!file) {
//         showError(item, "Şəkil seçilməyib!");
//         isValid = false;
//         return;
//       }
//       const extension = file.name.split(".").pop().toLowerCase(); //* filename fileListde saxlanir
//       if (!validFileTypes.includes(extension)) {
//         showError(item, "Yalnız JPG, JPEG, PNG, WEBP fayllarına icazə var!");
//         isValid = false;
//         return;
//       }
//       if (file.size > maxSizeMb * 1024 * 1024) {
//         showError(item, `Fayl ${maxSizeMb} MB-dan böyükdür!`);
//         isValid = false;
//         return;
//       }
//     }
//   });

//   return isValid;
// };

// //! 2.xidmetin movcudlugunu yoxlayanda diger errorlari gostermir input validationdan return silende de validation yoxlamir
// //! ele edim ki eyni vaxtda cixarsin erorlari bunun ucun yeqin ki
// //! title eynilyini de validation da yoxlamalidir

// function addService() {
//   if (!inputValidation()) return;

//   let titleInput = serviceTitle.value.trim();
//   let imgInput = image;
//   let urlInput = url.value.trim();
//   let file = imgInput.files[0];

//   const imagePreviewUrl = file ? URL.createObjectURL(file) : "";

//   const existingservice = userData.services.find(
//     (item) => item.title.toLowerCase() === titleInput?.toLowerCase()
//   );
//   if (existingservice) {
//     showError(serviceTitle, "Bu xidmet artiq movcuddur"); //! duzelis
//     return;
//   } else {
//     userData.services.push({
//       id: userData.services.length + 1,
//       title: titleInput,
//       image: imagePreviewUrl,
//       url: urlInput,
//     });
//   }

//   modalWindow.classList.remove("active");
//   input.forEach((item) => (item.value = ""));
//   saveServiceCard();
//   writeToHtml();
// }

// submit.addEventListener("click", addService);

// // function setService (){}




// function deleteService(id) {
//   // const updatedServices = userData.services.filter((item) => item.id !== id);
//   // // console.log(updatedServices);
//   // userData.services = updatedServices;
//   // // console.log(userData.services);
//   // saveServiceCard();
//   // writeToHtml();
//   console.log("salam");
// }
// // deleteObject.addEventListener("DOMContentLoaded",deleteService)

// //*prevent default vere bilemdiiym ucun domda buttonlara type button verdim

// const writeToHtml = () => {
//   serviceBox.innerHTML = "";
//   userData.services.map((item) => {
//     serviceBox.innerHTML += `<div class="card">
//                             <h4 class="cardTitle">${item.title}</h4>
//                             <div class="cardImg">
//                                 <div class="img"><img src="${item.image}" alt="services"></div>
//                                 <div class="cardImgShadow dark"></div>
//                                 <div class="cardImgShadow light"></div>
//                                 <div class="arrowCircle">
//                                     <a href="${item.url}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
//                                             <path d="M7.17 17L17 7" stroke-width="2" stroke-linecap="round"
//                                                 stroke-linejoin="round" />
//                                             <path d="M7 7H17V17" stroke-width="2" stroke-linecap="round"
//                                                 stroke-linejoin="round" />
//                                         </svg>
//                                     </a>
//                                 </div>
//                             </div>
//                             <div class="changeCard">
//                                 <form class="setItem">
//                                     <button id="${item.id}" class="change" type="button">Change</button>
//                                     <button  id="${item.id}" class="delete" type="button">Delete</button>
//                                 </form>
//                             </div>
//                         </div>`;
//   });
// };
// writeToHtml();
