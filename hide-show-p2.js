// ==UserScript==
// @name         Hide or Show p2 Comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nagesh
// @match        https://*.wordpress.com/
// @grant        none
// ==/UserScript==

if (document.querySelector('body').classList[7] === 'o2') { //check if the site is a p2

    let menuBar = document.getElementById('wp-admin-bar-root-default');

    //create Hide Show comments button
    let hideCommentsButton = document.createElement('li');
    hideCommentsButton.innerHTML = '<a id="hide-comments" href="#"> Hide Comments </a>';
    hideCommentsButton.onclick = hideShowComments;
    menuBar.appendChild(hideCommentsButton);

    //create Hide Show content
    let hideContentsButton = document.createElement('li');
    hideContentsButton.innerHTML = '<a id="hide-contents" href="#"> Hide Contents </a>';
    hideContentsButton.onclick = hideShowContents;
    menuBar.appendChild(hideContentsButton);
}

//show and hide comments function
function hideShowComments (event) {
    let commentText = document.getElementById('hide-comments');
    let allComments = document.getElementsByClassName('o2-post-comments');

    if ( allComments[1].style.display !== 'none'){

        for ( let i = 0; i <= allComments.length; i++) {
            allComments[i].style.display = 'none';
        }

        console.log(commentText.innerText);

        commentText.innerText = 'Show Comments';

    } else {
        for ( let i = 0; i <= allComments.length; i++) {
            allComments[i].style.display = 'block';
        }
        commentText.innerText = 'Hide Comments';
    }
}

//show and hide main content function
function hideShowContents (event) {

    let allContents = document.getElementsByClassName('entry-content');
    if( allContents[1].style.display !== 'none'){
        for( let i = 1; i <= allContents.length; i++){
            allContents[i].style.display = 'none';
        }
    } else {
        for( let i = 1; i <= allContents.length; i++){
            allContents[i].style.display = '';
        }

    }

}
 