/**/// WIP intended to replace skills.js when finished
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

		.reduce((section, article) => {
		    section.appendChild(article);
		    return section;
		}, document.createElement`section`);

/** /
Experience =
	([text]) => text
		.split(/\n{2,}/)
		// each
		.map(role => role
			// trim whole
			.trim()
			// ...and each line
			.split(/\n/)
			.map(line => line
				.trim()
				// title
				.replace(/^(.+)(?= \| )/, 
					(text,title) => console.group(title)
						|| `\n<article title="${title}">` )
				// location
				.replace(/ \| (.+)/, 
					(text,url) => console.log(url) 
						|| `\n${url.link(url)}` )
				// duration
				.replace(/([-\d]+) \D ([-\d]+)/u, 
					(text,from,to) => console.log(`${from} to ${to}`) 
						|| `<time datetime=${(new Date(to) - new Date(from)) / (1e3*60*60*24*365/2080)}h>${from} to ${to}</time>`)
				// items
				.replace(/•(.+)/g, 
					(text, item) => console.warn(item) || `<li> ${item}`)
				// tags
				.replace(/\[\s([^\]]+)\s\]/, 
					(text,list) => list
						.split`, `
						// assign decreasing relative values
						.reduce((accumulator, label, i, {length}) => 
							accumulator.concat([[ label, (length-i)/length ]])
						, [])
						// map output
						.map(([label, weight]) => console.log(label, weight) 
							|| `<label data=${ weight.toFixed(2) }> ${label} </label>`))
			)
			.join('\n')
			// end
			.replace(/$/, ()=>console.groupEnd()||'\n</article>')
		)
		// join
		.reduce((all, one)=> all.concat(one), [])
		.join('\n').
		replace(/^[\w\W]+$/, m => {
			let section = document.createElement`section`;
				section.className = 'Experience';
			section.innerHTML = m; 
			document.body.replaceChild(section, document.querySelector`script:not([src])`)
		});
/**/