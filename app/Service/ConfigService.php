<?php

namespace App\Service;

use App\Model\Config;

class ConfigService
{
    public function getConfigListByType(string $type)
    {
        return Config::ofType($type)->get();
    }

    public function getConfigByTypeToSelect(string $type)
    {
        return Config::ofType($type)->pluck('item_value', 'item_id')->toArray();
    }
}
