<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    protected $fillable = [];

    protected $table = 'config';

    public $timestamps = false;

    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}
