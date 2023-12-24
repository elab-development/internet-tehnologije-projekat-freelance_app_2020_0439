<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'datumZakljucenja', 
        'cenaPonude', 
        'statusNaplate',
        'service_id', 
        'taken_by_user_id', 
        'sold_by_user_id', 
       
    ];

    public function taken_by_user()
    {
        return $this->belongsTo(User::class, 'taken_by_user_id');
    }

    public function sold_by_user()
    {
        return $this->belongsTo(User::class, 'sold_by_user_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
