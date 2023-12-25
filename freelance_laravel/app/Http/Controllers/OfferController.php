<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cenaPonude' => 'required|numeric|min:100|max:1000',
            'statusNaplate' => 'required|in:Placeno,Nije placeno,U toku obrade',
            'service_id' => [
                'required',
                Rule::exists('services', 'id'),
            ],
            'sold_by_user_id' => [
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    return $query->where('id', '!=', Auth::id());
                }),
            ],
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->errors();
        
            if ($errors->has('service_id')) {
                return response()->json(['greska' => 'Uneseni ID usluge ne postoji u bazi. Unesite validan ID.']);
            }
        
            if ($errors->has('sold_by_user_id')) {
                $soldById = $request->sold_by_user_id;
                $loggedInUserId = Auth::id();
        
                if ($soldById == $loggedInUserId) {
                    return response()->json(['greska' => 'Ne možete samom sebi prodati ponudu. Unesite drugi ID.']);
                } else {
                    return response()->json(['greska' => 'Korisnik koji prodaje uslugu ne postoji u bazi. Unesite drugog ID.']);
                }
            }
        
            return response()->json($errors);
        }

        $offer = new Offer();
        $taken_by_user_id = Auth::user()->id;

        $offer->datumZakljucenja = Carbon::now()->format('Y-m-d');
        $offer->cenaPonude = $request->cenaPonude;
        $offer->statusNaplate = $request->statusNaplate;
        $offer->taken_by_user_id = $taken_by_user_id;
        $offer->sold_by_user_id = $request->sold_by_user_id;
        $offer->service_id = $request->service_id;

        $offer->save();

        return response()->json(['Uspesno kreirana ponuda.',
            new OfferResource($offer)]);
    }

    public function update(Request $request, $id)
    {
       
        $validator = Validator::make($request->all(), [
            'cenaPonude' => 'required|numeric|min:100|max:1000',
            'statusNaplate' => 'required|in:Placeno,Nije placeno,U toku obrade',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $offer = Offer::findOrFail($id);

         // Provera da li je korisnik autorizovan za izmenu ponude
        if ($offer->taken_by_user_id !== Auth::id() && !Auth::user()->isAdmin) {
            return response()->json(['error' => 'Nemate dozvolu za izmenu ove ponude.'], 403);
         }

        $offer->datumZakljucenja = Carbon::now()->format('Y-m-d');
        $offer->cenaPonude = $request->cenaPonude;
        $offer->statusNaplate = $request->statusNaplate;

        $offer->save();

        return response()->json(['Uspesno izmenjena ponuda.', new OfferResource($offer)]);
    }


    public function destroy($id)
    {
       
        $offer = Offer::findOrFail($id);

         // Provera da li je korisnik autorizovan za brisanje ponude
        if ($offer->taken_by_user_id !== Auth::id() && !Auth::user()->isAdmin) {
            return response()->json(['error' => 'Nemate dozvolu za brisanje ove ponude.'], 403);
        }
        
        $offer->delete();
        return response()->json('Uspesno obrisana ponuda');
    }
   
}
