<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class RowDeleteController extends Controller
{
  public function index() {
    return Inertia::render('Success');
  }

  public function store(Request $request) {
    if (!empty($request->id)) {
      DB::table('tests')->delete($request->id);
    
      return Inertia::render("Debug", [
        "data" => $request->id
      ]);
    } else {
      return Inertia::render('Success');

    }
    
  }


}
