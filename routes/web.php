<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', ['as' => 'homepage', 'uses' => 'HomepageController@homeAction']);

Route::get('/admin', ['as' => 'admin.homepage', 'uses' => 'Admin\HomeController@homeAction']);

Route::group(['namespace' => 'Api', 'prefix' => 'api'], function() {
    Route::resource('auth', 'AuthController', [
        'only' => [
            'index',
            'store',
        ],
    ]);

    Route::resource('point', 'PointController', [
        'only' => [
            'index',
            'store',
            'show',
            'update',
            'destroy',
        ],
    ]);

    Route::resource('category', 'CategoryController', [
        'only' => [
            'index',
            'store',
            'show',
            'update',
            'destroy',
        ],
    ]);

    Route::group(['middleware' => 'auth'], function() {
        Route::resource('user', 'UserController', [
            'only' => [
                'index',
                'store',
                'show',
                'update',
                'destroy',
            ],
        ]);

        Route::delete('/auth', 'AuthController@destroy');
    });
});
