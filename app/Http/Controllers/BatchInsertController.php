<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Test;

class BatchInsertController extends Controller
{
  public function index() {
    return Inertia::render('BatchInsert');
  }

  public function store(Request $request) {

    if (count($request->rows) > 0) {
      foreach ($request->rows as $row) {
        $newRow = new Test();
        $newRow->test_column = $row['testColumn'];
        $newRow->save();
      }

      return Inertia::render("Success");
    }

    return Inertia::render("Debug", [
      "data" => "Sikertelen mentés"
    ]);
    
  }
}
