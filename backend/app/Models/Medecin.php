<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Medecin extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'nb_jours', 'taux_journaliers'];
}
