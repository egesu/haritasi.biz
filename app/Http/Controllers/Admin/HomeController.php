<?php

namespace App\Http\Controllers\Admin;

class HomeController extends AdminController
{
    public function __construct()
    {
        //
    }

    public function homeAction()
    {
        $params = [];

        return $this->renderView('admin.layout', $params);
    }
}
