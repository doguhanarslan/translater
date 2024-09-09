const fromLang = document.getElementById('from-lang');
const toLang = document.getElementById('to-lang');
const btnTranslate = document.getElementById('btnTranslate');
const fromText = document.getElementById('from-text');
const toText = document.getElementById('to-text');
const exchange = document.querySelector('.exchange');
const icons = document.querySelectorAll('.icons');
for (let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);
    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

for (let icon of icons) {
    icon.addEventListener('click', (element) => {
        if (element.target.classList.contains('fa-copy')) {
            if (element.target.id === 'from') {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        }
        else {
            var utterance;
            if (element.target.id === 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    })
}
btnTranslate.addEventListener('click', () => {
    let text = fromText.value;
    const from = fromLang.value;
    const to = toLang.value;
    if (text !== '') {
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const translatedText = data.responseData.translatedText;
                toText.value = `${translatedText[0].toUpperCase() + translatedText.slice(1)}`;
            })
    }
    else{
        toText.value = '';
    }

})
exchange.addEventListener('click',()=> {
    let text = fromText.value;
    let fromLng = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = fromLng;
    fromText.value = toText.value;
    toText.value = fromText.value;
    if (text !== '') {
        toText.value = '';
        btnTranslate.click();
    }
})