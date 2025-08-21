import { userData } from "../db/data.js";
import { hireButtonToHtml } from "./main.js";

const hireRow = document.querySelector(".whyHire .row");

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
hireButtonToHtml();
