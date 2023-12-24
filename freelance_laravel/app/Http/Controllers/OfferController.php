<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cenaPonude' => 'required',
            'statusNaplate' => 'required',
            'service_id' => 'required',
        
        ]);

        if ($validator->fails()) {
        $errors = $validator->errors();

       
        return response()->json($errors);
        }

        $offer = new Offer();

        $taken_by_user_id = Auth::user()->id;

        $offer->datumZakljucenja = Carbon::now()->format('Y-m-d');
        $offer->cenaPonude = $request->cenaPonude;
        $offer->taken_by_user_id = $taken_by_user_id;
        $offer->sold_by_user_id = $request->sold_by_user_id;
        $offer->service_id = $request->service_id;

        $offer->save();

        return response()->json(['Uspesno kreirana ponuda.',
            new OfferResource($offer)]);
    }

    public function update(Request $request, $id)
    {
        
        $taken_by_user_id = Auth::user()->id;
       
        $validator = Validator::make($request->all(), [
            'cenaPonude' => 'required',
            'sold_by_user_id' => 'required',
            'service_id' => 'required',
        ]);

    
        $offer = Offer::findOrFail($id);

        $offer->datumZakljucenja = Carbon::now()->format('Y-m-d');
        $offer->cenaPonude = $request->cenaPonude;
        $offer->user_id = $taken_by_user_id;
        $offer->sold_by_user_id = $request->sold_by_user_id;
        $offer->service_id = $request->service_id;

        $offer->save();

        return response()->json(['Uspesno izmenjena ponuda.', new OfferResource($offer)]);
    }


    public function destroy($id)
    {
       
        $offer = Offer::findOrFail($id);
        $offer->delete();
        return response()->json('Uspesno obrisana ponuda');
    }
   
}
