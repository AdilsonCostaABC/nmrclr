<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permits', function (Blueprint $table) {
            $table->id();
            $table->integer('check_digit');
            $table->string('permit_no');
            $table->date('permit_date');
            $table->integer('comp_id');
            $table->integer('sup_id');
            $table->integer('pharma_id');
            $table->date('valid_from');
            $table->date('valid_to');
            $table->integer('poe_id');
            $table->string('purpose_use');
            //automatic data
            $table->string('permit_status');
            $table->date('updated_datetime');
            $table->string('updated_by');
            $table->string('orig_user');
            //updateable data
            $table->string('veri_reject_reason');
            $table->string('cancel_reason');
            $table->string('approve_reject_reason');
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
        Schema::dropIfExists('permits');
    }
}
