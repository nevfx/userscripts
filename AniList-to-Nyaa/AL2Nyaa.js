// ==UserScript==
// @name         AniList to Nyaa.si search
// @namespace    none
// @version      1.0
// @description  Search the English and Romaji title of an anime/manga from AniList on Nyaa.si
// @author       nevfx
// @match        https://anilist.co/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Function to search the titles on Nyaa.si
    function searchOnNyaa(englishTitle, romajiTitle) {
        const searchQuery = `https://nyaa.si/?f=0&c=0_0&q="${englishTitle}"%7C"${romajiTitle}"&s=seeders&o=desc`;
        window.open(searchQuery, '_blank');
    }

    // Get the English and Romaji titles from the page
    function getTitles() {
        const titleElement = document.querySelector('h1');
        const englishTitle = titleElement ? titleElement.textContent.trim() : '';

        const romajiTitle = document.head.querySelector("meta[property='og:title']").content;

        return {
            englishTitle,
            romajiTitle
        };
    }

    // Create the search button and add it to the page
    function addSearchButton() {
        const button = document.createElement('button');
        button.innerText = 'Search on Nyaa';
        button.style.marginLeft = '10px';
        button.onclick = function() {
            const { englishTitle, romajiTitle } = getTitles();
            searchOnNyaa(englishTitle, romajiTitle);
        };

        const container = document.querySelector('h2');
        if (container) {
            container.appendChild(button);
        }
    }

    // Add the search button when the page is fully loaded
    window.addEventListener('load', function() {
        addSearchButton();

        // Listen for the "Ctrl+Alt+G" key combination
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.altKey && event.key === 'g') {
                const { englishTitle, romajiTitle } = getTitles();
                searchOnNyaa(englishTitle, romajiTitle);
            }
        });
    });
})();
