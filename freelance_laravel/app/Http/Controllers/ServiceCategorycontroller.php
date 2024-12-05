<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceCategoryResource;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::all();
        return ServiceCategoryResource::collection($categories);
    }

    //rentalagent na osnovu id-a
    public function show($id)
    {
        $category = ServiceCategory::findOrFail($id);
        return new ServiceCategoryResource($category);
    }

    //nov rentalagent
    public function store(Request $request)
    {
     
    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }


    $category = new ServiceCategory();
    $category->naziv = $request->naziv;

    $category->save();

    return response()->json(['Uspesno kreirana nova kategorija usluge.',
         new ServiceCategoryResource($category)]);
    }

    //azuriranje rentalagenta
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }


        $category = ServiceCategory::findOrFail($id);
        $category->naziv = $request->naziv;
        $category->save();

        return response()->json(['Uspesno izmenjena izabrana kategorija usluge.', new ServiceCategoryResource($category)]);
    }

    //brisanje rentalagenta
    public function destroy($id)
    {

        $category = ServiceCategory::findOrFail($id);
        $category->delete();
        return response()->json('Uspesno obrisana kategorija usluge.');
    }
}
