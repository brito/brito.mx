let interval
with (new XMLHttpRequest) {
  onreadystatechange = () => 
    readyState == 4 
    && status == 200 
    && document.body.innerHTML != responseText 
    && location.reload();
  onerror = () => clearInterval(interval)
  open('GET', location.href);
  interval = setInterval(() => send(), 1e3);
}
