import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import type { Task } from '../../models';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  editingId: number | null;
  editingName: string;
  loading: boolean;
  savingId: number | null;
  tasks: Task[];
  onCancelEdit: () => void;
  onChangeEditingName: (name: string) => void;
  onDelete: (task: Task) => void;
  onSaveEdit: (task: Task) => void;
  onStartEdit: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
}

export const TaskList = ({
  editingId,
  editingName,
  loading,
  savingId,
  tasks,
  onCancelEdit,
  onChangeEditingName,
  onDelete,
  onSaveEdit,
  onStartEdit,
  onToggleStatus,
}: TaskListProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return <Alert severity="info">No hay tareas para mostrar.</Alert>;
  }

  return (
    <Stack spacing={1.5}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          editingId={editingId}
          editingName={editingName}
          savingId={savingId}
          task={task}
          onCancelEdit={onCancelEdit}
          onChangeEditingName={onChangeEditingName}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          onStartEdit={onStartEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </Stack>
  );
};
