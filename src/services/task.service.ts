import type { AxiosInstance } from 'axios';
import type { Task, TaskQueryParams, TaskResponse } from '../models';

export const getTasks = async (
  axios: AxiosInstance,
  params: TaskQueryParams,
) => {
  const response = await axios.get<TaskResponse>('/tasks', { params });
  return response.data;
};

export const createTask = async (axios: AxiosInstance, name: string) => {
  const response = await axios.post<Task>('/tasks', { name });
  return response.data;
};

export const updateTask = (axios: AxiosInstance, taskId: number, name: string) =>
  axios.put(`/tasks/${taskId}`, { name });

export const updateTaskStatus = (
  axios: AxiosInstance,
  taskId: number,
  done: boolean,
) => axios.patch(`/tasks/${taskId}`, { done });

export const removeTask = (axios: AxiosInstance, taskId: number) =>
  axios.delete(`/tasks/${taskId}`);
