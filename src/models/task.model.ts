export interface Task {
  id: number;
  name: string;
  done: boolean;
}

export interface TaskResponse {
  total: number;
  page?: number;
  pages?: number;
  data: Task[];
}

export type TaskFilter = 'all' | 'pending' | 'done';

export interface TaskQueryParams {
  limit: number;
  page: number;
  orderby: string;
  orderDir: string;
  done?: boolean;
  search?: string;
}

export interface TaskCounters {
  visible: number;
  pending: number;
  completed: number;
}
