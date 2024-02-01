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
            'id' => $this->resource->id,
            'naziv' => $this->resource->naziv,
            'duzinaIzrade'=> $this->resource->duzinaIzrade,
            'service_category_id'=>new ServiceCategoryResource($this->resource->serviceCategory),
        ];
    }
}
