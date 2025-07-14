<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function getTasks(){
        $task = Task::all();
        if($task->count()>0){
        return response()->json([
            'status' => 200,
            'data' => $task
        ],200);
    }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Tasks not found'
            ],404);
        }
        }

    public function createTask(Request $request){

           $validator = Validator::make($request->all(),[
            'title'=> 'required|string|max:255',
            'status' => 'in:new,processing,complete',
            'priority' => 'in:high,medium,low',
            'due_date'=> 'required',

        ]);

         if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }
        else{
            $task = Task::create([
                'title'=>$request->title,
                'status'=>$request->status,
                'priority'=>$request->priority,
                'due_date'=>$request->due_date,
                'event_id'=>$request->event_id,
                'created_by' => auth()->user()->id,
                'assigned_to'=>$request->assigned_to,

            ]);
        if($task){
            return response()->json([
                'status'=>200,
                'message'=>'Task created Successfully!',
                'task'=>$task
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
    public function updateTask(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'status' => 'in:new,processing,complete',
            'priority' => 'in:high,medium,low',
            'due_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'status' => 404,
                'message' => 'Task not found'
            ], 404);
        }

        $task->update([
            'title' => $request->title,
            'status' => $request->status,
            'priority' => $request->priority,
            'due_date' => $request->due_date,
            'event_id' => $request->event_id,
            'assigned_to' => $request->assigned_to,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Task updated successfully!',
            'task' => $task
        ], 200);
    }

    public function deleteTask($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'status' => 404,
                'message' => 'Task not found'
            ], 404);
        }

        // Soft delete
        $task->update(['is_delete' => 1]);

        return response()->json([
            'status' => 200,
            'message' => 'Task deleted successfully'
        ], 200);
    }

}
