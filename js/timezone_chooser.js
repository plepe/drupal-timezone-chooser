window.setTimeout(() => {
  let timezone_chooser = document.getElementById('timezone_chooser')
  if (!timezone_chooser) {
    return
  }

  timezone_chooser.onchange = () => {
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
            timezone: [{value: timezone_chooser.value }]
          })
        })
          .then(data => {
            location.reload()
          })
      })
  }
}, 0)
