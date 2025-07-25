<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    use HasFactory;
        protected $fillable = [
        'title',
        'status',
        'priority',
        'due_date',
        'event_id',
        'created_by',
        'assigned_to',
        'is_delete',
    ];
        public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function volunteer()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

}
