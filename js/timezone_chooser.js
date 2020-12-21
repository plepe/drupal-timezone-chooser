let timezone_chooser = document.getElementById('timezone_chooser')
timezone_chooser.onclick = () => {
  const userid = timezone_chooser.getAttribute('data-userid')
  if (!userid) {
    return
  }

  fetch(Drupal.url('rest/session/token'))
    .then(data => data.text())
    .then(token => {
      fetch(Drupal.url('user/' + userid + '?_format=json'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
        },
        body: JSON.stringify({
          timezone: [{value: 'America/Bogota' }]
        })
      })
        .then(data => {
          location.reload()
        })
    })
}
