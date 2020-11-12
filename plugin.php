<?php
/**
 * Plugin Name: cj-blocks — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/cuppajoey/cj-blocks/
 * Description: A growing set of Wordpress blocks I've created on an as-needed basis. 
 * Author: cuppajoey
 * Author URI: https://cuppajoey.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
