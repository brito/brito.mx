[...document.querySelectorAll`article data`]

    .reduce(([skills], data) => {
        let label = data.innerHTML,
            weight = +data.getAttribute('value'),
            [, duration] = /([\d.]+) W/.exec(data.parentNode.querySelector`time`.getAttribute`datetime`);
        skills[label] = ~~skills[label] + (weight * duration/52);
        // remove data node
        data.parentNode.removeChild(data);
        return [skills];
    }, [{}])

    .reduce((_, skills) => Object
            .entries(skills)
            .sort(([,a], [,b]) => b - a), null)
    
    .map(([label, weight]) => {
        let data = document.createElement`data`,
            scaled = Math.ceil(weight);
        data.innerHTML = `${label.replace('/',', ')} ${Array(1 + scaled).join('&nbsp;')}`;
        data.setAttribute('value', weight);
        data.setAttribute('title', `${scaled}`);
        Array(scaled).fill('/').forEach((c, i) => setTimeout(() => 
            data.innerHTML = data.innerHTML.replace('&nbsp;', c) , i * 1e2 ));
        return data; 
    })

    .reduce(([figure], data) => {
        figure.appendChild(data);
        return [figure];
    }, [document.createElement`figure`].map(el => {
        el.className = 'Skills';
        let figcaption = document.createElement`figcaption`;
        figcaption.innerText = '/ years';
        el.appendChild(figcaption);
        return el;
    }))

    .forEach(figure => document.body.insertBefore(figure, 
        document.querySelector`aside`));
