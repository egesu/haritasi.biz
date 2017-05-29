<?php

use Illuminate\Database\Seeder;
use App\Model\Config as ConfigModel;

class ConfigBaseSeeder extends Seeder
{
    public $itemType = null;

    public $items = [];

    public function run()
    {
        ConfigModel::where('type', $this->itemType)
            ->delete();

        if(!is_array(array_values($this->items)[0])) {
            $i = 1;
            if(is_int(array_keys($this->items)[0]) and array_keys($this->items)[0] === 0) {
                $stringKeys = false;
            } else {
                $stringKeys = true;
            }
            foreach($this->items as $key => $value) {
                if($stringKeys) {
                    $this->items[] = [
                        'item_id' => trim($key),
                        'item_value' => trim($value),
                    ];
                    unset($this->items[$key]);
                } else {
                    $this->items[$key] = [
                        'item_id' => $i,
                        'item_value' => $value,
                    ];
                }
                $i++;
            }
        }

        foreach($this->items as $key => $item) {
            $this->items[$key]['type'] = $this->itemType;
        }

        DB::table('config')->insert($this->items);
    }
}
