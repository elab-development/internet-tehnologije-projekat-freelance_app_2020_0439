<?php

namespace App\Http\Controllers;

use App\Exports\ServicesExport;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
  public function index()
  {
      $services = Service::all();
      return ServiceResource::collection($services);
  }


    public function store(Request $request)
    {
        $isAdmin = Auth::user()->isAdmin;
       $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'duzinaIzrade' => 'required',
        'service_category_id' => [
            'required',
             Rule::exists('service_categories', 'id')
            ],
    ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('service_category_id')) {
                return response()->json([
                    'error' => 'Ne postoji kategorija usluge sa tim id-em koji ste uneli.'
                ], 422);
            }

            return response()->json($errors);
        }
 

        $service = new Service();
        $service->naziv = $request->naziv;
        $service->duzinaIzrade = $request->duzinaIzrade;
        $service->service_category_id = $request->service_category_id;

        $service->save();

        return response()->json(['Uspesno kreirana nova usluga.',
            new ServiceResource($service)]);
    }

    //azuriranje 
    public function update(Request $request, $id)
    {
        $isAdmin = Auth::user()->isAdmin;

        $validator = Validator::make($request->all(), [
          'naziv' => 'required',
          'duzinaIzrade' => 'required',
          'service_category_id' => [
            'required',
             Rule::exists('service_categories', 'id')
            ],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
    
            if ($errors->has('service_category_id')) {
                return response()->json([
                    'error' => 'Ne postoji kategorija usluge sa tim id-em koji ste uneli.'
                ], 422);
            }
    
            return response()->json($errors);
        } 

        $service = Service::find($id);
        if(!$service){
          return response()->json([
            'poruka'=>'Usluga sa ovim id-em ne postoji.'
          ],404);
        }

        //menjanje unesenih vrednosti
        $service->naziv = $request->naziv;
        $service->duzinaIzrade = $request->duzinaIzrade;
        $service->service_category_id = $request->service_category_id;
        $service->save();

        return response()->json(['Uspesno azurirana usluga.', new ServiceResource($service)]);
    }

    public function updateDuzinaIzrade(Request $request, $id)
    {
        $isAdmin = Auth::user()->isAdmin;

        $validator = Validator::make($request->all(), [
          'duzinaIzrade' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }
 

        $service = Service::find($id);
        if(!$service){
          return response()->json([
            'poruka'=>'Usluga sa ovim id-em ne postoji.'
          ],404);
        }

        //menjanje duzine izrade
        $service->duzinaIzrade = $request->duzinaIzrade;
        $service->save();

        return response()->json(['Uspesno azurirana duzina izrade usluge.', new ServiceResource($service)]);
    }

    //brisanje 
   public function destroy($id)
   {
        $service = Service::find($id);
        if(!$service){
          return response()->json([
             'poruka'=>'Usluga sa ovim id-em ne postoji.'

          ],404);
        } 

        $service->delete();
        return response()->json([
            'poruka' => "Uspesno obrisana usluga."
        ],200);
   }

   //vrati usluge po tipu propertija - po nazivu unesenom i paginiraj
   public function getServicesByCategoryName(Request $request)
   {
       $naziv = $request->input('naziv');

       $serviceCategory = ServiceCategory::where('naziv', trim($naziv))->first();

       //ako ne postoji ta kategorija usluge
       if (!$serviceCategory) {
           return response()->json(['poruka' => 'Ne postoji kategorija usluge sa unesenim nazivom.'], 404);
       }

       //smesta sve koje su tog tipa
       $services = Service::where('service_category_id', $serviceCategory->id)->get();

       //ako je prazan niz
       if ($services->isEmpty()) {
           return response()->json(['poruka' => 'Ne postoje usluge unesene kategorije: ' . $naziv ], 404);
       }

       //trenutna stranica
       $currentPage = Paginator::resolveCurrentPage();
       $perPage = 2;
       //vraca rezultate za trenutnu stranicu, sece niz usluge na osnovu formule
       //pretvara u php array sa fjom all jer to prihvata lenghtAwarePaginator
       $currentPageSearchResults = $services->slice(($currentPage - 1) * $perPage, $perPage)->all();

       //kreira se obj LenghtAwarePaginator koji rezultate pretrage, ukupan broj usluge, koliko po stranici
       $paginatedSearchResults= new \Illuminate\Pagination\LengthAwarePaginator($currentPageSearchResults, count($services), $perPage);

       //usluge koje su po paginate principu uradjene
       return response()->json([
           'poruka' => 'Usluge kategorije: ' . $naziv . ' su pronadjene: ',
           'usluge' => ServiceResource::collection($paginatedSearchResults)
       ]);
   }


   //export CSV
   public function exportToCSV(){
    return Excel::download(new ServicesExport, 'services-csv.csv');
    }

}
