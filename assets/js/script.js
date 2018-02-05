
const upperCase = (str) => {
    if(!str){
        return '';
    }

    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
};

/*
* Parse all markdown titles tags.
 */
const getDatas = () => {
    const nodes = Array.from(document.querySelectorAll('h2, h3'));
    const firstSubIds = (obj, elm) => {
        if(elm.id.indexOf(obj.id) === -1){
            elm.id = `${obj.id}-${elm.id}`;
        }
        return elm.id;
    };
    return  nodes.reduce(
            (acc,elm) =>{
                if(elm.nodeName === 'H2') {
                    const search = upperCase(elm.innerHTML);
                    const obj = {
                        name: elm.innerHTML,
                        link: `#${elm.id}`,
                        id: elm.id,
                        search,
                        subs : []   
                    }
                    acc.push(obj); 
                } else {
                    const obj = acc[acc.length - 1];
                    const id = firstSubIds(obj, elm);    
                    const search = upperCase(elm.innerHTML);
                    obj.subs.push({
                        name: elm.innerHTML,
                        link: `#${id}`,
                        search
                    })
                }
                return acc;
    }, []);     
    
}

/**
 * Element for summary text.
 */
class MySummary extends HTMLElement {
    attachedCallback () {
        const html = getDatas()
            .reduce((acc, obj) => {
                        const title = `<p><a href="${obj.link}" class="main-link"><i class="mdi mdi-format-list-bulleted"></i>&nbsp;${obj.name}</a></p>`; 
                        const questions = obj.subs.reduce((ac, s) => {
                                const content = `<li><a href="${s.link}" class="main-subs hoverable">${s.name}</a></li>`;
                                return `${ac}${content}`;
                        }, '');
                        return `${acc}${title}<ul class="browser-default">${questions}</ul>`;     
                }, '');
        const main = document.createElement('div');
        main.innerHTML= html;
        this.appendChild(main)
        
    }
}

/*
Element which show filter result
 */
class MyResults extends HTMLElement {

    initializeList() {
        const arr = getDatas()
            .map(obj => obj.subs)
            .reduce((acc, a) => {
                return acc.concat(a);    
            }, []);
        const html = arr.reduce((acc, s) => {
                const content = `<li class="main-result" ><a href="${s.link}" class="main-subs">${s.name}</a></li>`;
                return `${acc}${content}`;
            }, '');    
        const main = document.createElement('div');
        main.innerHTML= `<ul class="browser-default">${html}</ul>`;
        this.appendChild(main)
        this.style.display = 'none';
    }

    /*
        Handler when user type key in filter input
    */
    setInputFilterHandler(){
        document.querySelector('#filter').addEventListener("keydown", function(event) {
            setTimeout(()=>{
                const val = event.target.value;
                const ms = document.querySelector('my-summary');
                const mr = document.querySelector('my-results');
                if(!val || '' === val.trim()) {
                    ms.style.display='block';
                    mr.style.display='none';    
                    return;     
                }
                const s = upperCase(val);
                ms.style.display='none';
                mr.style.display='block';         
                const arr = Array.from(document.querySelectorAll('my-results .main-result'));
                arr.forEach(elm => {
                        if(upperCase(elm.innerHTML).indexOf(s) !== -1){
                            elm.style.display='block';
                        } else {
                            elm.style.display='none';
                        }
                    }
                );
            }, 200);
        });
    }

    attachedCallback () {
        this.initializeList();
        this.setInputFilterHandler();
    }
}

document.registerElement('my-summary', MySummary);
document.registerElement('my-results', MyResults);