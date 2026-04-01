import { z } from 'zod';
import { NextResponse } from 'next/server';

export function validate<T>(schema: z.ZodType<T>, data: unknown): { data: T } | { error: NextResponse } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: NextResponse.json({ error: 'Invalid request', details: result.error.flatten().fieldErrors }, { status: 400 }) };
  }
  return { data: result.data };
}

// /api/chat
export const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).min(1, 'At least one message is required'),
});

// /api/auth — POST (login or register)
export const authLoginSchema = z.object({
  action: z.enum(['login', 'register']).optional(),
  name: z.string().optional(),
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

// /api/admin/auth — POST
export const adminAuthSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

// /api/suggestions — POST
export const suggestionSchema = z.object({
  name: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  message: z.string().min(5, 'Suggestion must be at least 5 characters'),
});

// /api/events — POST
export const eventSchema = z.object({
  learner_id: z.string().min(1, 'Learner ID is required'),
  event_type: z.string().min(1, 'Event type is required'),
  course_id: z.string().optional().nullable(),
  module_id: z.string().optional().nullable(),
  lesson_id: z.string().optional().nullable(),
  score: z.number().optional().nullable(),
  test_type: z.string().optional().nullable(),
  passed: z.boolean().optional().nullable(),
  document_id: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable(),
});
