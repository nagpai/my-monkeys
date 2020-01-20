// ==UserScript==
// @name         Hide or Show p2 Comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.wordpress.com/
// @grant        none
// ==/UserScript==

if ([...document.querySelector('body').classList].includes("o2")) {

    const menuBar = document.getElementById('wp-admin-bar-root-default');
    //create Hide Show comments button
    const hideCommentsButton = document.createElement('li');
    hideCommentsButton.innerHTML = '<a class="ab-item" style="cursor: pointer" id="hide-comments"> Hide Comments </a>';
    hideCommentsButton.onclick = hideShowComments;
    menuBar.appendChild(hideCommentsButton);

    //create Hide Show content
    const hideContentsButton = document.createElement('li');
    hideContentsButton.innerHTML = '<a class="ab-item" style="cursor: pointer" id="hide-contents"> Hide Contents </a>';
    hideContentsButton.onclick = hideShowContents;
    menuBar.appendChild(hideContentsButton);
}

//show and hide comments function
function hideShowComments (event) {
    const commentText = document.getElementById('hide-comments');
    const allComments = document.getElementsByClassName('o2-post-comments');

    if ( allComments[1].style.display !== 'none'){

         for ( let i = 0; i <= allComments.length; i++) {
             if(allComments[i]) {allComments[i].style.display = 'none';}
         }
        event.target.innerText = 'Show Comments';

    } else {
        for ( let i = 0; i <= allComments.length; i++) {
            if(allComments[i]){allComments[i].style.display = 'block';}
        }
        event.target.innerText = 'Hide Comments';
    }
}

//show and hide main content function
function hideShowContents (event) {

    let allContents = document.getElementsByClassName('entry-content');
    if( allContents[1].style.display !== 'none'){
        for( let i = 1; i <= allContents.length; i++){
            if(allContents[i]) {allContents[i].style.display = 'none';}
        }
        event.target.innerText = 'Show Content';
    } else {
        for( let i = 1; i <= allContents.length; i++){
            if(allContents[i]){allContents[i].style.display = '';}
        }
        event.target.innerText = 'Hide Content';

    }

}
