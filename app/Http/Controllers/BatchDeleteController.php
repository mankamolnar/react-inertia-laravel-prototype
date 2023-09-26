<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Test;

class BatchDeleteController extends Controller
{
  public function store(Request $request) {

    Test::destroy($request->ids);

    return Inertia::render("Debug", [
      "data" => $request->ids
    ]);
    
  }
}
