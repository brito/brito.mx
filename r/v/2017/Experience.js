Experience =
	([text]) => text
		.split(/\n{2,}/)

		.map(article => {
		    let el = document.createElement`article`;
		    [   // location / title		      
                [/(.+) \/ (.+?)\n/,
                    (text, href, title)=>{
                        el.title = title;
                        el.innerHTML = href.link(`https://${href}`);
                    }],

                // duration
                [/([-\d]+) \D ([-\d]+)\n/u, 
                    (text, from, to) => {
                    	let time = document.createElement`time`,
                    		duration  = new Date(to) - new Date(from);
                    	//w3c.github.io/html/infrastructure.html#duration-time-component-scale
                    	const W = 6048e5;
                        time.setAttribute('datetime', `${duration / W} W`);
                        time.innerText = `${from} — ${to}`;
                        el.appendChild(time);
                        let years = Math.ceil(duration/W/52);
                        time.parentNode.setAttribute('data', Array(1 + years).join('/'));
                    }],

                // remarks
                [/•\s+(.+)\n/g, 
                    (text, remark) => {
                    	let ul = el.querySelector`ul` || document.createElement`ul`,
                    		li = document.createElement`li`;
                    	li.innerText = remark;
                    	ul.appendChild(li);
                    	el.appendChild(ul);
                    }],

                // skills
                [/\[\s([^\]]+)\s\]/, 
                    (text, skills) => { 
                    	skills
                    		.split`, `
                    		// assign decreasing relative values
                    		.reduce((accumulator, label, i, {length}) =>
                    			accumulator.concat([[label, (length-i)/length ]])
                    		, [])
                    		// map output
                    		.map(([label, weight]) => {
                    			let data = document.createElement`data`;
								data.setAttribute('value', weight);
								data.innerText = label;
								el.appendChild(data);
                    		});
                    }]
            ]
            // transform succinctly
            .reduce((text, [re,fn]) => {
                return text.replace(re, fn);
            }, article);
		    return el;
		})
		// group into section
		.reduce(([section], article) => {
		    section.appendChild(article);
		    return [section];
		}, [document.createElement`section`].map(el => {
			el.className = 'Experience';
			return el;
		}))
		// replace node
		.forEach(section => {
			let script = document.querySelector`script:not([src])`;
			script.parentNode.replaceChild(section, script);
		});
