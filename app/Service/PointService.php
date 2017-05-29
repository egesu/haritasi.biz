<?php

namespace App\Service;

use App\Model\Point;

class PointService
{
    public function getAll()
    {
        return Point::all();
    }

    public function getByPage($page = 0)
    {
        return Point::with([
                'category',
            ])
            ->limit(25)->offset($page * 25)->get();
    }

    public function getListByBounds($latMin, $latMax, $lngMin, $lngMax)
    {
        $query = Point::fieldsForMap()
            ->where('latitude', '>', $latMin - 2)
            ->where('latitude', '<', $latMax + 2)
            ->where('longitude', '>', $lngMin - 2)
            ->where('longitude', '<', $lngMax + 2);

        return $query->get();
    }

    public function find($id)
    {
        return Point::find($id);
    }

    public function save(Point $point, array $data)
    {
        if(array_key_exists('title', $data)) {
            $point->title = $data['title'];
        }

        if(array_key_exists('description', $data)) {
            $point->description = $data['description'];
        }

        if(array_key_exists('links', $data)) {
            $point->links = $data['links'];
        }

        if(array_key_exists('category_id', $data)) {
            $point->category_id = $data['category_id'];
        }

        if(array_key_exists('latitude', $data)) {
            $point->latitude = $data['latitude'];
        }

        if(array_key_exists('longitude', $data)) {
            $point->longitude = $data['longitude'];
        }

        if(empty($point->id)) {
            $point->added_by_id = 1; // @TODO After authentication, make this work
        }

        $point->save();

        return $point;
    }
}
