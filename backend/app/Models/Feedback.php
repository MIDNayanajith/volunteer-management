<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    //
    use HasFactory;
        protected $fillable = [
        'task_id',
        'volunteer_id',
        'rating',
        'comment',
        'is_delete',

    ];
        public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function volunteer()
    {
        return $this->belongsTo(User::class, 'volunteer_id');
    }
     // Scope for active feedbacks
    public function scopeActive($query)
    {
        return $query->where('is_delete', 0);
    }
}
