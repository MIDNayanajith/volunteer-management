<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    use HasFactory;
        protected $fillable = [
        'name',
        'image',
        'date',
        'location',
        'description',
        'is_delete',

    ];
      public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
