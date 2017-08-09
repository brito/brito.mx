/**/// WIP replacing skills.js
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
                        time.datetime = `${duration * W} W`;
                        time.innerText = `${from} — ${to}`;
                        el.appendChild(time);
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
								data.setAttribute('data', weight);
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

		.reduce(([section], article) => {
		    section.appendChild(article);
		    return [section];
		}, [document.createElement`section`].map(el => {
			el.className = 'Experience';
			return el;
		}))

		.forEach(section => {
			let script = document.querySelector`script:not([src])`;
			script.parentNode.replaceChild(section, script);
		});
