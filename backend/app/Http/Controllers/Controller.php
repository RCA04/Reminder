<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
}



/*

<?php

namespace App\Http\Controllers;

use App\Models\Words;
use Illuminate\Http\Request;

class WordsController extends Controller
{
    //lista palavras pelo usu
    public function index(){

        $words = Words::where('user_id', auth()->id())->get();

        return response()->json($words);
    }

    public function store(Request $request){
        $validate = $request->validate([
            'word' => 'required|string',
            'translation' => 'required|string',
            'rating' => 'required|integer',
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $words = Words::create($validate);

        return response()->json($words);
    }

    public function update(Request $request, $id){

        $word = Words::findOrFail($id);

        $validate = $request->validate([
            'word' => 'required|string',
            'translation' => 'required|string',
            'rating' => 'required|integer'
        ]);

        $word->update($validate);

        return response()->json($word);
    }


    public function destroy($id){

        $word = Words::findOrFail($id);
        $word->delete();

        return response()->json(null);

    }

}

*/