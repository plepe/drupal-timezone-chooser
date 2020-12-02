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

    return [
      '#markup' => $user->getTimeZone() ?: date_default_timezone_get(),
    ];
  }

}
