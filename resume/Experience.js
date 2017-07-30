Experience = 
	([text]) => text
		.trim().split(/\n{2,}/)
		// each
		.map(role => role
			// trim
			.split(/\n/).map(line => line.trim()).join('\n')
			// title
			.replace(/^.+ \| /, m => console.warn(m)||'')
			// locations
			.replace(/.+\n/, m => console.warn(m)||'')
			// dates
			.replace(/^\d.+\n/u, m => console.warn(m)||'')
			// highlights
			.replace(/•.+\n/g, m => console.warn(m)||'')
			// skills
			.replace(/\[\s([^\]]+)\s\]/, skills)
	)


function skills(all, list){
	return console.warn(list.split` `)
}