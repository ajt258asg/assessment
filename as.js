'use strict';
const unIn = document.getElementById('un');
const asbutton = document.getElementById('as');
const rediv = document.getElementById('result-area');
const twdiv = document.getElementById('tweet-area');
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
asbutton.onclick = () => {
    const uN = unIn.value;
    if(uN.length===0){
        return;
    }
    removeAllChildren(rediv);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    rediv.appendChild(header);
    const par = document.createElement('p');
    const result = as(uN);
    par.innerText = result;
    rediv.appendChild(par);

    removeAllChildren(twdiv);
    const anchor = document.createElement('a');
    const hrefvalue = 
    'https://twitter.com/intent/tweet?button_hashtag='+
    encodeURIComponent('職業診断')+ '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefvalue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText ='Tweet #職業診断';
    twdiv.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    twdiv.appendChild(script);

    
};
unIn.onkeydown = event => {
    if(event.key === 'Enter'){
        asbutton.onclick();
    }
}
const answers = [
'{uN}さんはIT系エンジニア。',
'{uN}さんは公務員。',
'{uN}さんはパン屋さん。',
'{uN}さんはスポーツ選手。',
'{uN}さんはアーティスト。',
'{uN}さんはYouTuber。',
'{uN}さんは美容師。'
];
/*
@param {string} uN
@return {string} 診断結果
*/
function as(uN){
    let sumofchr = 0;
    for (let i =0;i<uN.length;i++){
        sumofchr = sumofchr + uN.charCodeAt(i);
    }
    const index = sumofchr % answers.length;
    let result = answers[index];
    result = result.replace(/\{uN\}/g,uN);
    return result;
}
console.assert(
    as('小谷')==='小谷さんはパン屋さん。',
    '処理が正しくありません'
);
console.assert(
    as('小谷')===as('小谷'),
    '処理が正しくありません'
);
