<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Test;

class TestController extends Controller
{
    public function index() {
      return Inertia::render('Success');
    }

    public function store(Request $request) {
      $newRow = new Test();
      $newRow->test_column = $request->testColumn;
      if ($newRow->save()) {
        return Inertia::render("Success");
      }else {
        return Inertia::render("Debug", [
          "data" => $request->testColumn
        ]);
      }

      
    }
}
