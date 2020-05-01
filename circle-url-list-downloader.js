/**
 * You need gold account for get all favorite list.
 * Open https://webcatalog.circle.ms/User/Favorites or https://webcatalog-free.circle.ms/User/Favorites and enter this script in DevTools's console
 * You will get list of favorite URL string with JS array format and paste it to arrLink in circle-detail-downloader.js
 */

const strQueryFavoriteList = '#mainSection > section > div.m-favorite-base > div.m-section-body > div.m-base--inner > div > table td.infotable-circlename a';

//Query and filter get only favorite list
const arrFavoriteList = Array.from(document.querySelectorAll(strQueryFavoriteList))
                            .filter(ele => ele.href.startsWith('https://webcatalog.circle.ms/Circle/') || ele.href.startsWith('https://webcatalog-free.circle.ms/Circle/'))
                            .map(ele => ele.href);

//Formatting to JS array format
const arrFavoriteListToString = arrFavoriteList.map(ele => "\'" + ele + "\'\n");

//Print
console.info('[' + arrFavoriteListToString + ']');