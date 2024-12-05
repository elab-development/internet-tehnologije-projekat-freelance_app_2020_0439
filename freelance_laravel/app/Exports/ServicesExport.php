<?php

namespace App\Exports;

use App\Models\Service;
use Maatwebsite\Excel\Concerns\FromCollection;

class ServicesExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return collect(Service::getAllServices());
    }

    //sta da pise u zaglavlju
    public function headings():array{
        return [
            'Id',
            'Naziv usluge',
            'Vreme izrade usluge u danima',
            'Kategorija usluge'
        ];
    }


}
