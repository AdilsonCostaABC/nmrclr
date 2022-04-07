<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermitLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permit_lines', function (Blueprint $table) {
            $table->id();
            $table->integer('permit_id');
            $table->integer('schedule_line_id');
            $table->string('prep_desc');
            $table->decimal('unit_weight',9,2);
            $table->string('uom_desc');
            $table->integer('x_line_qty');
            $table->integer('y_line_qty');
            $table->decimal('total_weight',20,2);
            $table->string('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permit_lines');
    }
}
