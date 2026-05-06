import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import { useAlert } from './useAlert';
import { useAxios } from './useAxios';
import type { Task, TaskFilter, TaskQueryParams } from '../models';
import {
  createTask,
  getTasks,
  removeTask,
  updateTask,
  updateTaskStatus,
} from '../services';

const getErrorMessage = (error: unknown, fallback: string) => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || fallback;
};

const sortTasksByIdDesc = (tasks: Task[]) =>
  [...tasks].sort((firstTask, secondTask) => secondTask.id - firstTask.id);

export const useTasks = () => {
  const axios = useAxios();
  const { showAlert } = useAlert();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return sortTasksByIdDesc(
      tasks.filter((task) => {
        const matchesFilter =
          filter === 'all' ||
          (filter === 'done' && task.done) ||
          (filter === 'pending' && !task.done);
        const matchesSearch =
          !normalizedSearch ||
          task.name.toLowerCase().includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      }),
    );
  }, [filter, search, tasks]);

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.done).length,
    [tasks],
  );

  const counters = {
    visible: visibleTasks.length,
    pending: pendingTasks,
    completed: tasks.length - pendingTasks,
  };

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params: TaskQueryParams = {
        limit: 100,
        page: 1,
        orderby: 'id',
        orderDir: 'DESC',
      };

      const response = await getTasks(axios, params);
      setTasks(sortTasksByIdDesc(response.data));
    } catch (error) {
      showAlert(getErrorMessage(error, 'No se pudieron cargar las tareas'), 'error');
    } finally {
      setLoading(false);
    }
  }, [axios, showAlert]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newTaskName.trim();
    if (!name) {
      showAlert('Escribe el nombre de la tarea', 'warning');
      return;
    }

    setCreating(true);
    try {
      const task = await createTask(axios, name);
      setTasks((currentTasks) => sortTasksByIdDesc([task, ...currentTasks]));
      setNewTaskName('');
      showAlert('Tarea creada', 'success');
    } catch (error) {
      showAlert(getErrorMessage(error, 'No se pudo crear la tarea'), 'error');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditingName(task.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async (task: Task) => {
    const name = editingName.trim();
    if (!name) {
      showAlert('Escribe el nombre de la tarea', 'warning');
      return;
    }

    setSavingId(task.id);
    try {
      await updateTask(axios, task.id, name);
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id ? { ...currentTask, name } : currentTask,
        ),
      );
      cancelEdit();
      showAlert('Tarea actualizada', 'success');
    } catch (error) {
      showAlert(getErrorMessage(error, 'No se pudo actualizar la tarea'), 'error');
    } finally {
      setSavingId(null);
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    setSavingId(task.id);
    try {
      await updateTaskStatus(axios, task.id, !task.done);
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id
            ? { ...currentTask, done: !currentTask.done }
            : currentTask,
        ),
      );
      showAlert(
        !task.done ? 'Tarea finalizada' : 'Tarea marcada como pendiente',
        'success',
      );
    } catch (error) {
      showAlert(
        getErrorMessage(error, 'No se pudo cambiar el estado de la tarea'),
        'error',
      );
    } finally {
      setSavingId(null);
    }
  };

  const deleteTask = async (task: Task) => {
    const shouldDelete = window.confirm(`Eliminar "${task.name}"?`);
    if (!shouldDelete) return;

    setSavingId(task.id);
    try {
      await removeTask(axios, task.id);
      setTasks((currentTasks) =>
        currentTasks.filter((currentTask) => currentTask.id !== task.id),
      );
      showAlert('Tarea eliminada', 'success');
    } catch (error) {
      showAlert(getErrorMessage(error, 'No se pudo eliminar la tarea'), 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  return {
    cancelEdit,
    counters,
    creating,
    deleteTask,
    editingId,
    editingName,
    filter,
    handleCreateTask,
    handleSearch,
    loadTasks,
    loading,
    newTaskName,
    saveEdit,
    savingId,
    searchInput,
    setEditingName,
    setFilter,
    setNewTaskName,
    setSearchInput,
    startEdit,
    toggleTaskStatus,
    visibleTasks,
  };
};
