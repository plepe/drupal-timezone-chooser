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
      .then(response => {
        if (response.ok) {
          return response.text()
        } else {
          throw Error("Can't get session token: " + response.statusText)
        }
      })
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
          .then(response => {
            if (response.ok) {
              location.reload()
            } else {
              throw Error("Can't change timezone: " + response.statusText)
            }
          })
          .catch(error => alert(error))
      })
      .catch(error => alert(error))
  }
}, 0)
