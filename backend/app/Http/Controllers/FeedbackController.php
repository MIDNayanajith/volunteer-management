<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function createFeedback(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_id' => 'required|exists:tasks,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        // Check if task exists and is assigned to the current user
        $task = Task::where('id', $request->task_id)
                   ->where('assigned_to', auth()->user()->id)
                   ->where('is_delete', 0)
                   ->first();

        if (!$task) {
            return response()->json([
                'status' => 404,
                'message' => 'Task not found or not assigned to you'
            ], 404);
        }

        // Check if feedback already exists for this task by this user
        $existingFeedback = Feedback::where('task_id', $request->task_id)
                                  ->where('volunteer_id', auth()->user()->id)
                                  ->where('is_delete', 0)
                                  ->first();

        if ($existingFeedback) {
            return response()->json([
                'status' => 409,
                'message' => 'Feedback already exists for this task'
            ], 409);
        }

        $feedback = Feedback::create([
            'task_id' => $request->task_id,
            'volunteer_id' => auth()->user()->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Update task status to complete
        $task->update(['status' => 'complete']);

        if ($feedback) {
            return response()->json([
                'status' => 200,
                'message' => 'Feedback submitted successfully!',
                'feedback' => $feedback
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Failed! Something went wrong!'
            ], 500);
        }
    }

    public function getFeedbackByTask($taskId)
    {
        $feedback = Feedback::where('task_id', $taskId)
                           ->where('volunteer_id', auth()->user()->id)
                           ->where('is_delete', 0)
                           ->first();

        if ($feedback) {
            return response()->json([
                'status' => 200,
                'data' => $feedback
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Feedback not found'
            ], 404);
        }
    }

    public function updateFeedback(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        $feedback = Feedback::where('id', $id)
                           ->where('volunteer_id', auth()->user()->id)
                           ->where('is_delete', 0)
                           ->first();

        if (!$feedback) {
            return response()->json([
                'status' => 404,
                'message' => 'Feedback not found'
            ], 404);
        }

        $feedback->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Feedback updated successfully!',
            'feedback' => $feedback
        ], 200);
    }

    public function deleteFeedback($id)
    {
        $feedback = Feedback::where('id', $id)
                           ->where('volunteer_id', auth()->user()->id)
                           ->where('is_delete', 0)
                           ->first();

        if (!$feedback) {
            return response()->json([
                'status' => 404,
                'message' => 'Feedback not found'
            ], 404);
        }

        // Soft delete
        $feedback->update(['is_delete' => 1]);

        return response()->json([
            'status' => 200,
            'message' => 'Feedback deleted successfully'
        ], 200);
    }

    public function getVolunteerFeedbacks()
    {
        $feedbacks = Feedback::with(['task'])
                            ->where('volunteer_id', auth()->user()->id)
                            ->where('is_delete', 0)
                            ->orderBy('created_at', 'desc')
                            ->get();

        if ($feedbacks->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $feedbacks
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'No feedback found',
                'data' => []
            ], 200);
        }
    }
}
