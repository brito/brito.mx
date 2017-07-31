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
			// highlights
			.replace(/\n\s*•(.+)/g, 
				(text, highlight) => console.warn(highlight) || `\n<li> ${highlight}`)
			// skills
			.replace(/\[\s([^\]]+)\s\]/, 
				(text,list) => list
					.split`, `
					//
					.reduce((accumulator, label, i, {length}) => 
						accumulator.concat([[ label, (length-i)/length ]])
					, []))
			// end
			.replace(/$/, ()=>console.groupEnd()||'\n</article>')
		)
		// end
		.reduce((all, one)=> console.log(one) || all.concat(one) , []);
