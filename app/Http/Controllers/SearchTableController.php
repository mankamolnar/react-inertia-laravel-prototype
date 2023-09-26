<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class SearchTableController extends Controller
{
    public function store(Request $request) {
      $result = DB::table("tests")
        ->where("test_column", "LIKE", "%".$request->filter."%")
        ->orWhere("created_at", "LIKE", "%".$request->filter."%")
        ->paginate(10);

      return Inertia::render("Table", [
        "data" => $result
      ]);
    }
}
