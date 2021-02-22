<?php

namespace Drupal\timezone_chooser\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Timezone Chooser' Block.
 *
 * @Block(
 *   id = "timezone_chooser",
 *   admin_label = @Translation("Timezone Chooser"),
 *   category = @Translation("User"),
 * )
 */
class TimezoneChooser extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $user = \Drupal::currentUser();

    if ($user->getTimeZone()) {
      $current_timezone = $user->getTimeZone();

      $options = array();
      foreach (system_time_zones() as $timezone) {
        $timezone_esc = strtr($timezone, [' ' => '_']);
        $options[] = "<option value=\"{$timezone_esc}\" " . ($timezone_esc == $current_timezone ? " selected" : "") . ">{$timezone}</option>";
      }

      return [
        '#markup' => '<div id="timezone-wrapper"><div id="timezone-label">All dates in: </div><div id="timezone-select"><select id="timezone_chooser" data-userid="' . $user->id() . '">' . implode("\n", $options) . '</select></div></div>' ?: date_default_timezone_get(),
        '#allowed_tags' => ['select', 'option', 'div'],
        '#cache' => [
          'contexts' => [ 'timezone', 'user' ],
        ],
        '#attached' => ['library' => ['timezone_chooser/base']],
      ];
    }
    else {
      return [
        '#markup' => 'All dates in ' . date_default_timezone_get(),
        '#cache' => [
          'contexts' => [ 'timezone' ],
        ],
      ];
    }
  }
}
