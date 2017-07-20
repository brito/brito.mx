let Skills = {},
    Experience = [
        {
            at: 'Appian',
            from: 'December 2002',
            to: 'March 2007',
            skills: 'JS/ES6 jQuery CSS3 HTML5 Recruiting Regex REST/JSON Git/SVN/Hg/P4 Java/J2EE BPM XML a11y/WCAG2 i18n/l16n'
        },{
            at: 'Google',
            from: 'March 2007',
            to: 'September 2009',
            skills: 'JS/ES6 CSS3 HTML5 bash C++ Git/SVN/Hg/P4 UX latency Recruiting Python'
        },{
            at: 'Phiveleven',
            from: 'April 2009',
            to: 'April 2013',
            skills: 'JS/ES6 jQuery CSS3 HTML5 Regex Git/SVN/Hg/P4 PHP Wordpress REST/JSON ops/sysadmin'
        },{
            at: 'Gravity',
            from: 'November 2009',
            to: 'February 2011',
            skills: 'JS/ES6 jQuery CSS3 HTML5 PHP Git/SVN/Hg/P4 dataviz REST/JSON'
        },{
            at: 'Small Demons',
            from: 'October 2011',
            to: 'November 2012',
            skills: 'JS/ES6 jQuery CSS3 HTML5 Git/SVN/Hg/P4 Typography Python'
        },{
            at: 'Intertrust',
            from: 'December 2012',
            to: 'April 2013',
            skills: 'JS/ES6 CSS3 HTML5 Git/SVN/Hg/P4 BackboneJS'
        },{
            at: 'Oracle',
            from: 'April 2013',
            to: 'July 2017',
            skills: 'UX Sales MAF/MCS Typography CSS3 HTML5 JS/ES6 Java/J2EE Git/SVN/Hg/P4 FCPX WCP Cordova Nodejs SaaS/PaaS a11y/WCAG2 BPM'
        }
    ]
    //
    .map(place => {
        ['from', 'to'].map(prop => 
            place[prop] = new Date(place[prop]));

        place.hours = 
            ((place.to - place.from) / 1e3 / 60 / 60 / 3)|0;

        place.skills
            .split` `
            .forEach((skill, i, a) => {
                Skills[skill] = Skills[skill] || 0;
                Skills[skill]+= (place.hours * (a.length - i) / a.length)|0;
            });

        return place;
    });
    //

Object.entries(Skills)
    .sort((a, b) => b[1] - a[1])
    .forEach((skill, i) => {
        let color = 137.5 * i,
            h = (skill[1]/1000)|0 + 1,
        
            label = document.createElement`label`;
            text = document.createElement`span`;
            
        text.innerText = skill[0];

        label.style.cssText = `display:inline-block; width:100px; 
            background:white; padding:.3em; margin:1px;
            text-align:right`;
        text.style.cssText = ``;


        while (h--){
            let el = document.createElement`data`;
            el.style.cssText = `float:left;
                width:6px; height:4px; margin:.5px;
                background:hsl(${color},62%,50%)`;
            label.appendChild(el);   
        }

        label.appendChild(text);
        viz.appendChild(label);
    });