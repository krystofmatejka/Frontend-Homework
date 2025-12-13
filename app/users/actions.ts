'use server';

import type { User } from "../types";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3100';

export async function fetchMe(): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/api/users/me`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }
  
  return response.json();
}

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(`${BACKEND_URL}/api/users`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}
