function fetchShortUrl(link, f) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
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
  xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDeb9haS85aHJGbaYclga6qxwI1kEb-Q44')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({'longUrl': link}))
}

function handleResponse(json) {
  var input = document.getElementById('shortened')

  function targeted(e) {
    e.preventDefault()
    input.select()
    var success = document.execCommand('copy')
    if (success) {
      console.log('URL copied successfully')
    }
  }

  input.value = json.id
  input.onclick = targeted
  input.onkeyup = targeted
}

fetchShortUrl(location.hash.substring(1), handleResponse)

if ('onhashchange' in window) {
  window.onhashchange = function() {
    fetchShortUrl(window.location.hash.substring(1), handleResponse)
  }
}
