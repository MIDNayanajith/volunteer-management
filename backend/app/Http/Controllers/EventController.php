<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
      public function getEvents(){
        $event = Event::all();
        if($event->count()>0){
        return response()->json([
            'status' => 200,
            'data' => $event
        ],200);
    }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Event not found'
            ],404);
        }
        }

        public function createEvent(Request $request){

           $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:255',
            'date' => 'required',
            'location'=>'required',
            'description' => 'required',


        ]);

         if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }
        else{
            $event = Event::create([
                'name'=>$request->name,
                'date'=>$request->date,
                'location'=>$request->location,
                'description'=>$request->description,

            ]);
        if($event){
            return response()->json([
                'status'=>200,
                'message'=>'Event created Successfully!',
                'event'=>$event
            ],200);
        }
        else{
              return response()->json([
                'status' => 500,
                'message' => 'Failed! Something went wrong!'
                ], 500);
        }
        }
    }
    public function updateEvent(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'date' => 'required|date',
        'location' => 'required',
        'description' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    }

    $event = Event::find($id);

    if (!$event) {
        return response()->json([
            'status' => 404,
            'message' => 'Event not found'
        ], 404);
    }

    $event->update([
        'name' => $request->name,
        'date' => $request->date,
        'location' => $request->location,
        'description' => $request->description,
    ]);

    return response()->json([
        'status' => 200,
        'message' => 'Event updated successfully',
        'event' => $event
    ], 200);
}

public function deleteEvent($id)
{
    $event = Event::find($id);

    if (!$event) {
        return response()->json([
            'status' => 404,
            'message' => 'Event not found'
        ], 404);
    }

    // Soft delete
    $event->update(['is_delete' => 1]);

    return response()->json([
        'status' => 200,
        'message' => 'Event deleted successfully'
    ], 200);
}


    public function getUserEvents()
    {
        $userId = auth()->user()->id;

        // Get events where the user has assigned tasks
        $events = Event::whereHas('tasks', function ($query) use ($userId) {
            $query->where('assigned_to', $userId)
                  ->where('is_delete', 0);
        })
        ->where('is_delete', 0)
        ->withCount([
            'tasks as total_tasks' => function ($query) use ($userId) {
                $query->where('assigned_to', $userId)
                      ->where('is_delete', 0);
            },
            'tasks as completed_tasks' => function ($query) use ($userId) {
                $query->where('assigned_to', $userId)
                      ->where('status', 'complete')
                      ->where('is_delete', 0);
            }
        ])
        ->get();

        if ($events->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $events
            ], 200);
        }

        return response()->json([
            'status' => 200,
            'message' => 'No events found',
            'data' => []
        ], 200);
    }
}
