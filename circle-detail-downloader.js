/**
 * You need to change "arrLink" variable for circle list
 * then enter this script in DevTools's console when you open circle page like https://webcatalog.circle.ms/Circle/15130724
 * Notes that url may become webcatalog-free.circle.ms if you get links via webcatalog-free's console.
 */

//WebCatalog circle link list
const arrLink = ['https://webcatalog.circle.ms/Circle/15130724'];

//Query selector list
const strQueryCircleName = '#mainSection > div.m-media.m-circletable > div.m-media__body.md-circleinfo > div.item > table > tbody > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)';
const strQueryCircleDayPos = '#mainSection > div.m-media.m-circletable > div.m-media__body.md-circleinfo > div.item > table > tbody > tr:nth-child(1) > td:nth-child(4)';
const strQueryWriterName = '#mainSection > div.m-media.m-circletable > div.m-media__body.md-circleinfo > div.item > table > tbody > tr:nth-child(2) > td:nth-child(2)';
const strQueryECList = '#mainSection > div.m-media.m-circletable > div.m-media__body.md-circleinfo > div.item > table > tbody > tr:nth-child(4) > td > div > ul > li';
const strQueryECLink = 'div > a';

// Iterate link list
for(const strLink of arrLink) {
    //Fetch Data
    let objResponse = await fetch(strLink);
    //Check Reponse
    if(objResponse.ok) {
        //For save link as object
        let objLink = new Object();

        //Parse DOM
        let domParser = new DOMParser();
        let objParsedDOC = domParser.parseFromString(await objResponse.text(), 'text/html');

        //Circle name
        let strCircleName = objParsedDOC.querySelector(strQueryCircleName).innerText.trim();
		
		//Circle position and day
		let strCircleDayPos = objParsedDOC.querySelector(strQueryCircleDayPos).innerText.trim();

        //Writer name
        let strWriterName = objParsedDOC.querySelector(strQueryWriterName).innerText.trim();

        //Online shop list
        let arrECList = objParsedDOC.querySelectorAll(strQueryECList);
        //Check does it has online shop link
        if(arrECList.length > 0) {
            //Iterate shop link
            for(const eleEC of arrECList) {
                //Online shop link query
                let strECLink = eleEC.querySelector(strQueryECLink).href;
                //Filtering link
                if(strECLink.startsWith('https://ec.toranoana.jp')){
                    //Tora no ana
                    objLink.toranoana = strECLink;
                }else if(strECLink.startsWith('https://www.melonbooks.co.jp')){
                    //Melonbooks
                    objLink.melonbooks = strECLink;
                }else if(strECLink.startsWith('https://www.dlsite.com')){
                    //DLsite
                    objLink.dlsite = strECLink;
                }else if(strECLink.endsWith('booth.pm/')){
                    //BoothPM
                    objLink.boothpm = strECLink;
                }else if(strECLink.startsWith('http://www.dmm.co.jp')){
                    //Fanza
                    objLink.fanza = strECLink;
                }
            }
        }
        //Print
        console.info(`${strCircleName}\t${strCircleDayPos}\t${strWriterName}\t${strLink}\t${objLink.toranoana === undefined ? '' : objLink.toranoana}\t${objLink.melonbooks === undefined ? '' : objLink.melonbooks}\t${objLink.dlsite === undefined ? '' : objLink.dlsite}\t${objLink.boothpm === undefined ? '' : objLink.boothpm}\t${objLink.fanza === undefined ? '' : objLink.fanza}`);
    }
}