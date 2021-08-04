<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;

class PeliculaController extends Controller
{
    public function getAll()
    {
        $Peliculas = Pelicula::where('activo', '=', 1)
            ->select('idPelicula', 'nombre', 'img')
            ->get();

        return $Peliculas;
    }

    public function showById(Request $request)
    {
        $id = $request->input('idPelicula');
        $Pelicula = Pelicula::where('idPelicula', $id)
            ->select('*')
            ->get();
        return $Pelicula;
    }

    public function store(Request $request)
    {
        try {
            $Pelicula = new Pelicula();
            $Pelicula->nombre = $request->input('nombre');
            $Pelicula->img = $request->input('img');
            $Pelicula->activo = 1;
            $Pelicula->save();
            return "Pelicula ingresada correctamente";
        } catch (\Illuminate\Database\QueryException $e) {
            return "Error";
        }
    }

    // public function show($id)
    // {
    //     $Pelicula = Pelicula::where('idPelicula', $id)
    //         ->select('idPelicula', 'nombre', 'img')
    //         ->get();
    //     return $this->sendResponse($Pelicula, "Pelicula obtenida correctamente");
    // }

}
