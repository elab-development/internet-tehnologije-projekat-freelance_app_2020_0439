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
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'datumZakljucenja'=> $this->resource->datumZakljucenja,
            'cenaPonude'=> $this->resource->cenaPonude,
            'statusNaplate'=> $this->resource->statusNaplate,
            'service_id'=> new ServiceResource($this->resource->service),
            'taken_by_user_id'=>  new UserResource($this->resource->taken_by_user),
            'sold_by_user_id'=>  new UserResource($this->resource->sold_by_user),
            
        ];
    }
}
