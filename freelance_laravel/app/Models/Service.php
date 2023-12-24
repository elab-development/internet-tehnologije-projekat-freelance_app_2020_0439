<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv', 
        'cena', 
        'duzinaIzrade', 
        'service_category_id', 
    ];

 

    public function service_category()
    {
        return $this->belongsTo(ServiceCategory::class);
    }
}
