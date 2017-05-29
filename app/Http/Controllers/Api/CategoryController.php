<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Service\CategoryService;
use App\Model\Category;

class CategoryController extends ApiController
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->middleware('auth', ['only' => [
            'update',
            'store',
            'delete',
        ]]);
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        $points = $this->categoryService->getAll();
        return response()->json($points, 200);
    }

    public function show(int $id)
    {
        $model = $this->categoryService->find($id);

        if($model) {
            return response()->json($model, 200);
        } else {
            return response()->json([], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $category = $this->categoryService->find($id);
        $post = $request->request->all();
        $category = $this->categoryService->save($category, $post);
        return response()->json($category->toArray(), 200);
    }

    public function store(Request $request)
    {
        $category = new Category();
        $post = $request->request->all();
        $category = $this->categoryService->save($category, $post);
        return response()->json($category->toArray(), 201);
    }

    public function destroy(int $id)
    {
        $category = $this->categoryService->find($id);

        if(!$category) {
            return response()->json([], 404);
        }

        $category->delete();

        return response()->make('', 204);
    }
}
