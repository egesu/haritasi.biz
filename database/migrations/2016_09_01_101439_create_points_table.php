<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePointsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('points', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 100);
            $table->string('description', 5000)->nullable();
            $table->json('links')->default('[]')->comment('Stored as JSON');
            $table->integer('category_id')->unsigned();
            $table->integer('added_by_id');
            $table->decimal('longitude', 17, 14);
            $table->decimal('latitude', 16, 14);

            $table->foreign('category_id')
                ->references('id')->on('categories')
                ->onDelete('restrict')
                ->onUpdate('restrict');

            $table->foreign('added_by_id')
                ->references('id')->on('users')
                ->onDelete('set null')
                ->onUpdate('set null');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('points');
    }
}
