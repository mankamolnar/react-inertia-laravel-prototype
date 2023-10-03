<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestController;
use App\Http\Controllers\RowDeleteController;
use App\Http\Controllers\BatchDeleteController;
use App\Http\Controllers\SearchTableController;
use App\Http\Controllers\MultipleSelectController;
use App\Http\Controllers\BatchInsertController;
use App\Models\Test;
use Illuminate\Http\Request;
// use DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Test');
});

Route::get("/test-select", function() {
    return Inertia::render("TestSelect", [
      "data" => ["Peti", "Sanyi", "Géza"]
    ]);
});

Route::get("/test-table", function() {
  $rows = DB::table('tests')->paginate(10);
  return Inertia::render("Table", [
    "data" => $rows
  ]);
});

Route::get('/modify-row/{id}', function (string $id) {
  $row = DB::table('tests')
      ->where('id', '=', $id)
      ->first();

  return Inertia::render('ModifyPage', [
    'row' => $row
  ]);
});

Route::post('/modify-row', function (Request $request) {
  $affected = DB::table('tests')
              ->where('id', $request->id)
              ->update(['test_column' => $request->test_column]);

  return Inertia::render('Debug', [
    'data' => $request->test_column//$id
  ]);
});

Route::resource("test-save", TestController::class);
Route::resource("delete-row", RowDeleteController::class);
Route::resource("batch-delete", BatchDeleteController::class);
Route::resource("batch-insert", BatchInsertController::class);
Route::resource("multiple-select", MultipleSelectController::class);
Route::resource("search-table", SearchTableController::class);