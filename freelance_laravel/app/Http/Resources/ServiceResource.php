<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID: ' => $this->resource->id,
            'Naziv usluge ' => $this->resource->naziv,
            'Duzina izrade usluge: '=> $this->resource->duzinaIzrade,
            'Kategorija usluge: '=>new ServiceCategoryResource($this->resource->service_category),
        ];
    }
}
