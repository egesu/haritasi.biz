const { mix } = require('laravel-mix');

mix.config.sourcemaps = true;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.disableNotifications();

mix.js('resources/assets/js/website/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .js('resources/assets/js/admin/admin.js', 'public/js')
    .sass('resources/assets/sass/admin/admin.scss', 'public/css')
    .copyDirectory('resources/assets/templates', 'public/templates')
    .sourceMaps();
