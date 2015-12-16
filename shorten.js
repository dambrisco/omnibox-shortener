fetchShortUrl(location.hash.substring(1), handleResponse)

if ('onhashchange' in window) {
  window.onhashchange = function() {
    fetchShortUrl(window.location.hash.substring(1), handleResponse)
  }
}

function fetchShortUrl(link, f) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeb9haS85aHJGbaYclga6qxwI1kEb-Q44')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({'longUrl': link}))
  xhr.onreadystatechange = function() {
    if (xhr.readState !== XMLHttpRequest.DONE) {
      return
    } else if (xhr.status !== 200) {
      console.log(JSON.parse(xhr.responseText))
      return
    } else {
      var json = JSON.parse(xhr.responseText)
      console.log(json)
      f(json)
    }
  }
}

function handleResponse(json) {
  var input = document.getElementById('shortened')
  input.appendChild(document.createTextNode(json.id))
  input.onclick = function(e) {
    e.preventDefault()
    input.select()
    var success = document.execCommand('copy')
    if (success) {
      console.log('URL copied successfully')
    }
  }
  input.dispatchEvent(new MouseEvent('click', { 'view': window, 'bubbles': true, 'cancelable': false }))
}
