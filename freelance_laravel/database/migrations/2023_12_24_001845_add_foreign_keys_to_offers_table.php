<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->foreignId('service_id')->nullable()->references('id')->on('services')->onDelete('set null');
            $table->foreignId('taken_by_user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('sold_by_user_id')->nullable()->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign('service_id');
            $table->dropForeign('taken_by_user_id');
            $table->dropForeign('sold_by_user_id');
        });
    }
};
