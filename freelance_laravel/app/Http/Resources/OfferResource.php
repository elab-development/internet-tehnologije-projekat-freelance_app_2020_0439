<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id: ' => $this->resource->id,
            'Datum zakljucenja ponude: '=> $this->resource->datumZakljucenja,
            'Cena zakljucene ponude u EUR: '=> $this->resource->cenaPonude,
            'Status naplate: '=> $this->resource->statusNaplate,
            'Koja usluga je u pitanju: '=> new ServiceResource($this->resource->service),
            'Ko je uzeo uslugu: '=>  new UserResource($this->resource->taken_by_user),
            'Ko je prodao uslugu: '=>  new UserResource($this->resource->sold_by_user),
        ];
    }
}
