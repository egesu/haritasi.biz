const { mix } = require('laravel-mix');

// mix.config.sourcemaps = true;
// module.exports.devtool = '#source-map';

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

mix.options({
    uglify: {
        comments: false,
    },
});

mix.js('resources/assets/js/website/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .js('resources/assets/js/admin/admin.js', 'public/js')
    .extract([
        'angular',
        'angular-sanitize',
        'angular-resource',
        'angular-animate',
        'angular-ui-bootstrap',
        'ui.leaflet.webpack',
        'angular-ui-router',
        'angular-spinner',
        'lodash',
    ])
    .sass('resources/assets/sass/admin/admin.scss', 'public/css')
    .copyDirectory('resources/assets/templates', 'public/templates')
    .sourceMaps();
