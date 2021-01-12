# Drupal Timezone Chooser
Adds a block with a select box which lets a user choose the timezone

# INSTALLATION
Clone this module in the /modules/custom directory

Enable with `drush en timezone_chooser`

Install and enable the [RestUI](https://www.drupal.org/project/restui) module.

Go to `/admin/config/services/rest`. Enable Resource 'USER', Methods 'PATCH', Request format 'json', Provider 'cookie'.
