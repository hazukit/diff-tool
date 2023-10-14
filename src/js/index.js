// Importing necessary CSS and JS libraries
import 'normalize.css';
import 'diff2html/bundles/css/diff2html.min.css';
import '../css/style.css';
import * as JsDiff from 'diff';
import { html } from 'diff2html';

/**
 * This function extracts the parameters from the URL query string and returns them as an object.
 * @returns {Object} An object containing the parameters extracted from the URL query string.
 */
function gerParameters(){
    const url = location.search.substring(1).split('&');
    const parameter = {};
    for (let i = 0; url[i]; i++) {
        const k = url[i].split('=');
        parameter[k[0]] = k[1];
    }
    return parameter;
}

/**
 * This function decodes the URI text and replaces the '+' character with a space.
 * @param {string} text - The URI text to be decoded.
 * @returns {string} The decoded text with '+' replaced by a space.
 */
function decodeURIText(text) {
    if (!text) return '';
    return decodeURIComponent(text).replace(/\+/g, ' ');
}

/**
 * This function displays the difference between two texts using JsDiff and diff2html libraries.
 * @param {string} left - The left text to be compared.
 * @param {string} right - The right text to be compared.
 */
function displayDiff(left, right) {
    const diff = JsDiff.createTwoFilesPatch('diff', 'diff', left, right, '', '');
    const diffHtml = html(diff, { drawFileList: true, matching: 'lines', outputFormat: 'side-by-side' });

    document.getElementById('diffViewer').innerHTML = diffHtml;
}

// Wait for the DOM to be loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    const parameters = gerParameters();
    const leftText = decodeURIText(parameters.left);
    const rightText = decodeURIText(parameters.right);
    document.getElementById('left').innerHTML = leftText;
    document.getElementById('right').innerHTML = rightText;
    if (leftText && rightText) {
        displayDiff(leftText, rightText);
    }
});
