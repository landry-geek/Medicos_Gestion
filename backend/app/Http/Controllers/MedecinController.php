<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
use Illuminate\Http\Request;

class MedecinController extends Controller
{
    //récuperer tous les Medecin
    public function index(){
        $medecins = Medecin::all();

        return response()->json([
            'status' => 'success',
            'data' => $medecins
        ]);
    }

    //stocker un Medecin
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'nb_jours' => 'required|integer|min:1|max:365',
            'taux_journaliers' => 'required|numeric|min:0|max:1000000'
        ]);
        
        $medecin = Medecin::create($validated);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Medecin créé avec succès',
            'data' => $medecin
        ], 201);
    }

    //màj d'un Medecin
    public function update(Request $request, $id)
    {
        $medecin = Medecin::find($id);
        
        if (!$medecin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Medecin non trouvé'
            ], 404);
        }
        
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'nb_jours' => 'required|integer|min:1|max:365',
            'taux_journaliers' => 'required|numeric|min:0|max:1000000'
        ]);
        
        $medecin->update($validated);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Medecin mis à jour',
            'data' => $medecin
        ]);
    }

    //suppression d'un medecin
    public function destroy($id)
    {
        $medecin = Medecin::find($id);
        
        if (!$medecin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Medecin non trouvé'
            ], 404);
        }
        
        $medecin->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Medecin supprimé'
        ]);
    }
}
