const inputTextValidation = /^(?=(?:.*[a-zA-Z]){6,}).+$/;
const urlValidation =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.(com|org|net|gov|edu|az|ru|info|io|co)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
const emailValidation =
  /^[A-Za-z0-9._%+-]+@(gmail\.com|icloud\.com|mail\.ru|yahoo\.com|outlook\.com|hotmail\.com)$/;

export function showError(element, message) {
  let next = element.nextElementSibling;
  while (next && next.classList?.contains("error")) {
    const toRemove = next;
    next = next.nextElementSibling;
    toRemove.remove();
  }
  let error = document.createElement("p");
  error.className = "error";
  error.textContent = message;
  element.after(error);
}

//*validation yoxlayaq

export const inputValidation = (root = document) => {
  const inputs = document.querySelectorAll("input"); //*butun inputlardan sonra error mesaji cixara bilmek ucun
  let isValid = true;
  inputs.forEach((item) => {
    if (item.nextElementSibling?.classList.contains("error")) {
      item.nextElementSibling.remove();
    }
    let val = item.value.trim();

    if (!val) {
      showError(item, "Bu hisse bos ola bilmez!!!");
      isValid = false;
      return;
    }

    if (item.type === "text") {
      if (!inputTextValidation.test(val)) {
        showError(item, "Zehmet olmasa duzgun input daxil edin!");
        isValid = false;
        return;
      }
    } else if (item.type === "url") {
      if (!urlValidation.test(val)) {
        showError(item, "Zehmet olmasa duzgun url daxil edin!");
        isValid = false;
        return;
      }
    } else if (item.type === "email") {
      if (!emailValidation.test(val)) {
        showError(item, "Zehmet olmasa duzgun email daxil edin!");
        isValid = false;
        return;
      }
    } else if (item.type === "file") {
      const validFileTypes = ["jpg", "jpeg", "png", "webp"];
      const file = item.files[0]; //*browserde file secende inputun daxilinde fileList adli xususi obyekt yaranir ki bu da da files adli property saxlayir ve buda list saxlayir ozunde ilk element de bizim secdiyimiz elementdir
      const maxSizeMb = 2;

      if (!file) {
        showError(item, "Şəkil seçilməyib!");
        isValid = false;
        return;
      }

      const extension = file.name.split(".").pop().toLowerCase(); //* filename fileListde saxlanir

      if (!validFileTypes.includes(extension)) {
        showError(item, "Yalnız JPG, JPEG, PNG, WEBP fayllarına icazə var!");
        isValid = false;
        return;
      }

      if (file.size > maxSizeMb * 1024 * 1024) {
        showError(item, `Fayl ${maxSizeMb} MB-dan böyükdür!`);
        isValid = false;
        return;
      }
    }
  });

  return isValid;
};
