sources = ([text]) => {
  // 1. csv to table
  document.querySelector`#sources`.outerHTML =
    '<table id=sources>' + text.replace(/^\n|\n$/,'').split(/\n/)
      .map((row,rn) => 
      '<tr>' + row.split(/\s*,\s*/)
        .map(col =>
        `<t${rn?'d':'h'}>${col}`)
        .join('')
      ).join('');
  // 2. links
  [...document.querySelectorAll`#sources td:nth-child(2)`]
  .map(e => e.innerHTML = e.innerHTML.link(`https://${e.innerHTML}`))

}
