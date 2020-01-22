// ==UserScript==
// @name         HappySchedule Card selector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://schedule.happy.tools/reports/user-week-summary
// @grant        none
// ==/UserScript==

// initial script to set event listener after full page loads

function createDropdown() {
    const dropdownDiv = document.createElement("div");
    dropdownDiv.classList.add("global-filter__wrapper", "global-filter-he");
    //insert the main dropdown placeholder
    const teamDropDown = document.querySelector(".global-filter-project");
    teamDropDown.insertAdjacentElement("beforebegin", dropdownDiv);

    //create a dropdown element to select team member
    dropdownDiv.innerHTML = `
<select name="team-mates" id="he-dropdown">
<option value=""> --- Select ---- </option>
</select>
`;

    const memberList = [...document.querySelectorAll('.user-week-summary__stats-card-user-name')].map(function(a){return a.innerText;});

    memberList.forEach((memberName) => {
        const optionDiv = document.createElement("option");
        optionDiv.setAttribute("value",`${memberName}`);
        optionDiv.innerText = `${memberName}`;
        const selectDiv = document.getElementById("he-dropdown");
        selectDiv.appendChild(optionDiv);
    });

    const selectDiv = document.getElementById("he-dropdown");
    selectDiv.addEventListener('change', readDropdown);
}


function readDropdown(event) {
    const memberName = event.srcElement.value;
    hideMembers(memberName);
}

function hideMembers(name){
    const allCards = document.querySelectorAll(".user-week-summary__stats-card-user-name");
    allCards.forEach( card => {
        if(card.innerText !== name){
            card.parentElement.parentElement.style.display="none";
        } else {
            card.parentElement.parentElement.style.display="block";
        }
    });

}

//const teamSelector = document.getElementsByName('teamId')[0];
//teamSelector.addEventListener('change', function() {setTimeout(createDropdown, 1000)});

window.onload = () => {
    setTimeout( createDropdown, 3000);
}


