
Experience = 
	([text]) => text
		.trim()
		.split(/\n{2,}/)
		// each
		.map(role => role
			// trim
			.split(/\n/)
			.map(line => line.trim())
			.join('\n')
			// title
			.replace(/^(.+)(?= \| )/, 
				(text,title) => console.group(title)
					|| `\n<article title="${title}">` )
			// location
			.replace(/ \| (.+)/, 
				(text,url) => console.log(url) 
					|| `\n${url.link(url)}` )
			// duration
			.replace(/\n\s*([-\d]+) \D ([-\d]+)/u, 
				(text,from,to) => console.log(`${from} to ${to}`) 
					|| `\n<time datetime=${(new Date(to) - new Date(from)) / (1e3*60*60*24*365/2080)}h>${from} to ${to}</time>`)
			// items
			.replace(/\n\s*•(.+)/g, 
				(text, item) => console.warn(item) || `\n<li> ${item}`)
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
						|| `<label data=${weight.toFixed(2)}> ${label} </label>`))
			// end
			.replace(/$/, ()=>console.groupEnd()||'\n</article>')
		)
		// join
		.reduce((all, one)=> all.concat(one) , []);
