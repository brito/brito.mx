/**/// WIP intended to replace skills.js when finished
Experience =
	([text]) => text
		.split(/\n{2,}/)
		.reduce((list, text) => {
		    // transform text into item of list
			let item = {},
			    // text is matched and substituted
				substitutions = 
				[
				    // location / title
				    [/(.+) \/ (.+?)\n/,
				        (text, href, title)=>({
				            'article[title]': title,
				            'a[href]': href
				        })],

				    // duration
			        [/([-\d]+) \D ([-\d]+)\n/u, 
			            (text, from, to) => ({ 'time[datetime]': `${from} — ${to}` })],

			        // remarks
			        [/•\s+(.+)\n/g, 
			            (text, li) => ({ 'li': li })],

			        // skills
			        [/\[\s([^\]]+)\s\]/, 
			            (text, label) => ({ 'label[data]': label })]
			    ]

			    // consume text substitutions
			    .reduce((text, [re, fn]) => 
			         text.replace(re, (...values) => {
			    		let result = fn(...values);
			    		Object
			    		   .entries(result)
			    		   .forEach(([selector, value]) => {
                                   item[selector] = item[selector] ?
                                    [].concat(item[selector], value)
                                    : value;
			    		   });
			    		return result;
			    	})
			    , text);

			return list.concat(item);
		}
		,[])
		//
		.map(item => {
		    let root;
		    Object
		      .entries(item)
		      .forEach(([selector, value], i) => {
		          const [, name, attr] = /^(\w+)\[?([^\]]*)\]?/.exec(selector);
		          let el = document.createElement(name);
		          if (attr)
		              el.setAttribute(attr, value);
		          else if (Array.isArray(value))
		              ;
		          else
		              el.innerHTML = value;

		          if (!i)
		              root = el;
		          else
		              root.appendChild(el);
		      });
		    console.info(item)
		    return root;
		});

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