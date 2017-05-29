<?php

namespace App\Service;

use App\Model\Category;

class CategoryService
{
    public function getAll()
    {
        return Category::all();
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function save(Category $category, array $data)
    {
        if(array_key_exists('name', $data)) {
            $category->name = $data['name'];
        }

        if(array_key_exists('description', $data)) {
            $category->description = $data['description'];
        }

        if(array_key_exists('color_code', $data)) {
            $category->color_code = $data['color_code'];
        }

        if(array_key_exists('icon', $data)) {
            $category->icon = $data['icon'];
        }

        $category->save();

        return $category;
    }
}
