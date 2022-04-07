<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('appl_ref_no');
            $table->string('tin');
            $table->string('comp_name');
            $table->string('postal_address');
            $table->string('physical_address');
            $table->integer('town_id');
            $table->string('contact_person');
            $table->string('tel_no');
            $table->string('mobile_no');
            $table->string('email');
            $table->date('reg_date');
            // $table->integer('num_apply');
            $table->string('updated_by');
            $table->date('updated_datetime');
            $table->string('comp_reg_no');
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
        Schema::dropIfExists('companies');
    }
}
