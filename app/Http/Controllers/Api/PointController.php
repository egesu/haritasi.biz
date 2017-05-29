<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Service\PointService;
use App\Model\Point;

class PointController extends ApiController
{
    private $pointService;

    public function __construct(PointService $pointService)
    {
        $this->middleware('auth', ['only' => [
            'update',
            'store',
            'delete',
        ]]);
        $this->pointService = $pointService;
    }

    public function index(Request $request)
    {
        $page = $request->input('page');
        $input = $request->all();

        if(array_key_exists('listType', $input)) {
            if($input['listType'] === 'bounded') {
                $points = $this->pointService->getListByBounds(
                    $input['latitudeMin'], $input['latitudeMax'],
                    $input['longitudeMin'], $input['longitudeMax']
                );
            }
        } else {
            if(null !== $page) {
                $points = $this->pointService->getByPage((int)$page);
            } else {
                $points = $this->pointService->getAll();
            }
        }

        return response()->json($points, 200);
    }

    public function show(int $id)
    {
        $model = $this->pointService->find($id);

        if($model) {
            return response()->json($model, 200);
        } else {
            return response()->json([], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $category = $this->pointService->find($id);
        $post = $request->request->all();
        $category = $this->pointService->save($category, $post);
        return response()->json($category->toArray(), 200);
    }

    public function store(Request $request)
    {
        $category = new Point();
        $post = $request->request->all();
        $category = $this->pointService->save($category, $post);
        return response()->json($category->toArray(), 201);
    }

    public function destroy(int $id)
    {
        $point = $this->pointService->find($id);

        if(!$point) {
            return response()->json([], 404);
        }

        $point->delete();

        return response()->make('', 204);
    }
}
