<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Point extends Model
{
    use SoftDeletes;

    protected $table = 'points';

    protected $fillable = [
        'title',
        'description',
        'links',
        'category_id',
        'added_by_id',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'links' => 'array',
        'latitude' => 'double',
        'longitude' => 'double',
        'category_id' => 'int',
    ];

    public function scopeFieldsForMap($query)
    {
        return $query->select([
            'id',
            'title',
            'category_id',
            'latitude',
            'longitude',
        ]);
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // public function setLinksAttribute($value)
    // {
    //     if(is_array($value)) {
    //         $this->attributes['links'] = json_encode($value);
    //     }
    // }
    //
    // public function getLinksAttribute($value)
    // {
    //     return json_decode($value, true) ?: [];
    // }
}
