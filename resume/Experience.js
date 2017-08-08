/** /// WIP intended to replace skills.js when finished
Experience =
	([text]) => [
    [/^(.+)(?= \| )/, 
        (text,title) => S({ [title]: 'article[title]' })],
    [/ \| (.+)\n/, 
        (text, href) => S({ [href]: 'a[href]' })],
    [/([-\d]+) \D ([-\d]+)\n/u, 
        (text, from, to) => S({ [`${from} — ${to}`]: 'time[datetime]' })],
    [/•(.+)\n/g, 
        (text, li) => S({ [li]: 'li'})],
    [/\[\s([^\]]+)\s\]/, 
        (text, label) => S({ [label]: 'label[data]' })]
]

.reduce((items, [re, fn]) => items
    .map(item => item.trim().replace(re, fn))
, text.split(/\n{2,}/))

.reduce((a,b)=> console.log(b));







function Q(s){ console.debug(`Q(${s})`);
    return document.querySelectorAll(s) }
function S(j){ console.debug(j);
    return JSON.stringify(j) }
/**/
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
