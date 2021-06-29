// ==UserScript==
// @name         Update URL in Reset tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy site URL to text field in reset (revert) tool
// @author       Nagesh
// @match        https://mc.a8c.com/automated-transfer/revert.php?blog_id=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const url = document.querySelector("#at-reset-site__prerequisites > label > strong").innerText.slice(0,-1);
    const checkBox = document.querySelector("#at-reset-site__prerequisites > label > input[type=checkbox]");
    const urlField = document.querySelector("#at-reset-site__form > label > input[type=text]");

    checkBox.addEventListener('click', updateUrlField);

    function updateUrlField(){
        checkBox.checked == true ? urlField.value = url : urlField.value = "";
    }
   
})();
