<?php
namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Models\Offer;
use App\Models\Service;
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
            'cenaPonude' => 'required|numeric|min:1',
            'statusNaplate' => 'required|in:Placeno,Nije placeno,U toku obrade',
            'service_id' => [
                'required',
                Rule::exists('services', 'id'),
            ],
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->errors();
        
            if ($errors->has('service_id')) {
                return response()->json(['greska' => 'Uneseni ID usluge ne postoji u bazi. Unesite validan ID.']);
            }
        
            return response()->json($errors);
        }

        $service = Service::find($request->service_id);
        if (!$service) {
            return response()->json(['greska' => 'Usluga sa datim ID-em ne postoji.'], 404);
        }

        $soldByUserId = $service->user_id; // Pretpostavljamo da je 'user_id' polje koje označava korisnika koji nudi uslugu
        if ($soldByUserId == Auth::id()) {
            return response()->json(['greska' => 'Ne možete samom sebi prodati ponudu. Unesite drugi ID.']);
        }

        $offer = new Offer();
        $offer->datumZakljucenja = Carbon::now()->format('Y-m-d');
        $offer->cenaPonude = $request->cenaPonude;
        $offer->statusNaplate = $request->statusNaplate;
        $offer->taken_by_user_id = Auth::id();
        $offer->sold_by_user_id = $soldByUserId;
        $offer->service_id = $request->service_id;

        $offer->save();

        return response()->json(['Uspesno kreirana ponuda.',
            new OfferResource($offer)]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'cenaPonude' => 'required|numeric|numeric|min:1',
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
    public function getUserOffers()
    {
        $userId = Auth::id();
        $offers = Offer::where('taken_by_user_id', $userId)->get();

        return OfferResource::collection($offers);
    }
}
