<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Test;
use App\Models\Test2;
use DB;

class MultipleSelectController extends Controller
{
  public function index(Request $request) {
    $list1 = Test::all();
    $list2 = [];
    $chosenId1 = "";

    if (isset($request->flist1)) {
      $chosenId1 = $request->flist1;
      $list2 = DB::table("test2s")
        ->where("test_column", "LIKE", $request->flist1)
        ->get();
    }

    return Inertia::render('MultipleSelect', [
      "flist1" => $list1,
      "flist2" => $list2,
      "chosenId1" => $chosenId1
    ]);
  }
}
