// ==UserScript==
// @name         HappySchedule Card selector
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Nagesh and Niels
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

// Check DOM every 5s and add HE-filter if not available yet
window.onload = () => {
    setInterval( function() {
        // Fetch current HE-filter if available
        const he_filter = document.querySelector( '.global-filter-he' );

        // Add HE filter if not available yet
        if ( ! he_filter ) createDropdown();
    }, 5000 );
}

// Initialse HE-filter when selecting different group or team
window.addEventListener( 'change', ( event ) => {
    if ( event.target.matches('.global-filter-project > select') || event.target.matches('.global-filter-team > select') ) {
        // Fetch current HE-filter
        const he_filter = document.querySelector( '.global-filter-he' );

        // Delete current HE-filter
        he_filter.parentNode.removeChild(he_filter);

        // Initialse new HE-filter
        createDropdown();
    }
});

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
