<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Facades\DB as FacadesDB;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv', 
        'duzinaIzrade', 
        'service_category_id', 
    ];

 

    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
    //fja za export da nam se lepse ispisu podaci
    public static function getAllServices(){

        $upit = FacadesDB::table('services')->select('id','naziv','duzinaIzrade','service_category_id')->get()->toArray();

        return $upit;
        
    }
}
