/* WIP migrating this to Experience.js, 
to reuse the text inside the script tag 
and data does not have to be re-declared */
let accumulator = {},
    Experience = [
        {
            at: 'Appian',
            from: '2002-12',
            to: '2007-03',
            skills: 'JS/ES6 jQuery UX CSS3 HTML5 Recruiting Regex REST/JSON Git/SVN/Hg/P4 Java/J2EE Portal BPM XML a11y/WCAG2 i18n/l16n'
        },{
            at: 'Google',
            from: '2007-03',
            to: '2009-09',
            skills: 'CSS3 HTML5 JS/ES6 UX bash C++ Git/SVN/Hg/P4 UX latency Python Recruiting'
        },{
            at: 'Gravity',
            from: '2009-11',
            to: '2011-02',
            skills: 'JS/ES6 jQuery CSS3 HTML5 PHP UX Git/SVN/Hg/P4 dataviz REST/JSON'
        },{
            at: 'Small Demons',
            from: '2011-10',
            to: '2012-11',
            skills: 'jQuery CSS3 HTML5 UX JS/ES6 Git/SVN/Hg/P4 Python Typography'
        },{
            at: 'Intertrust',
            from: '2012-12',
            to: '2013-04',
            skills: 'JS/ES6 CSS3 HTML5 UX Git/SVN/Hg/P4 BackboneJS'
        },{
            at: 'Oracle',
            from: '2013-04',
            to: '2017-07',
            skills: 'UX Sales MADP/MBaaS Typography HTML5 CSS3 JS/ES6 Java/J2EE Git/SVN/Hg/P4 SVG bash FCPX Portal dataviz a11y/WCAG2 Cordova Nodejs SaaS/PaaS BPM'
        }
    ]
    //
    .map(work => {
        // human-readable to computable time
        ['from', 'to'].map(prop => 
            work[prop] = new Date(work[prop]));

        work.hours =
             2080 * (work.to - work.from) / 1e3 / 60 / 60 / 24 / 365;

        // build Skills matrix
        work.skills
            .split` `
            .forEach((skill, i, a) => {
                accumulator[skill] = accumulator[skill] || [];
                // Weight
                accumulator[skill].push(work.hours * (a.length - i) / a.length);
            });

        return work;
    });

// I. BARS
Object.entries(accumulator)
    .sort((a,b) => b[1].reduce((c,d)=>c+d) - a[1].reduce((c,d)=>c+d))
    .forEach((skill, i, S) => {
        let color = 137.5 * i,
            weight = skill[1].reduce((a,b) => a + b) / 1e3,
        
            label = document.createElement`label`,
            data = document.createElement`data`;

        label.innerHTML = ` ${skill[0]}`;
        data.innerHTML = `${Array(Math.ceil(weight)).join('&#9632;')} ${weight > 5 ? Math.floor(weight) : ''}`;
        data.style.cssText = `color:hsl(${color},62%,50%); white-space:nowrap; margin-left:1ex`;
        label.appendChild(data);

        document.querySelector`.Skills`.appendChild(label);
    });

// II. 
