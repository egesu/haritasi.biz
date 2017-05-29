<?php

namespace App\Http\Controllers;

class HomepageController extends WebsiteController
{
    public function __construct()
    {
        //
    }

    public function homeAction()
    {
        $params = [];

        return $this->renderView('website.layout', $params);
    }
}
