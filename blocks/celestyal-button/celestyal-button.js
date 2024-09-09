export default function decorate(block) {
    const details = [...block.children];
    const button = !!details[0].innerText.trim() ? document.createElement('a') : document.createElement('button');
    details.forEach((detail, i) => {
        if (!!detail.innerText.trim() && i===0) button.setAttribute("href", detail.innerText.trim());
        switch(i){
            case 1: button.innerHTML = detail.innerText.trim(); break;
            case 2: button.setAttribute("title", detail.innerText.trim()); break;
            case 3: button.className = `button ${detail.innerText.trim()}`; break;
        }
    });
    block.textContent = '';
    block.append(button);
}