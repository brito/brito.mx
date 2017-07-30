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
				(text,title) => console.group(`<section> ${title}`)||'')
			// location
			.replace(/ \| (.+)/, 
				(text,url) => console.log(url.link(url))||'')
			// dates
			.replace(/\n\s*([-\d]+)[ \D]*([-\d]+)/u, 
				(text,from,to) => console.warn(new Date(from),new Date(to))||'')
			// highlights
			.replace(/\n\s*•.+/g, 
				m => console.warn(m)||'')
			// skills
			.replace(/\[\s([^\]]+)\s\]/, 
				(text,list) => list
					.split`, `
					//
					.reduce((accumulator, label, i, {length}) => 
						accumulator.concat([[ label, (length-i)/length ]])
					, [])
					//
					// .forEach(([label, weight]) => {
					// 	console.error(label, weight)
					// })
			)
			.replace(/$/, ()=>console.log('</section>')||console.groupEnd()||'')
		)
		.reduce((all, one)=> console.log(one) || all.concat(one) , []);
