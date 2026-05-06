import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RadioButtonUnchecked as PendingIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Task } from '../../models';

interface TaskItemProps {
  editingId: number | null;
  editingName: string;
  savingId: number | null;
  task: Task;
  onCancelEdit: () => void;
  onChangeEditingName: (name: string) => void;
  onDelete: (task: Task) => void;
  onSaveEdit: (task: Task) => void;
  onStartEdit: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
}

export const TaskItem = ({
  editingId,
  editingName,
  savingId,
  task,
  onCancelEdit,
  onChangeEditingName,
  onDelete,
  onSaveEdit,
  onStartEdit,
  onToggleStatus,
}: TaskItemProps) => {
  const isEditing = editingId === task.id;
  const isSaving = savingId === task.id;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderColor: task.done ? 'success.light' : 'divider',
        bgcolor: task.done ? 'success.50' : 'background.paper',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
      >
        <Tooltip title={task.done ? 'Marcar pendiente' : 'Marcar finalizada'}>
          <span>
            <IconButton
              aria-label={task.done ? 'Marcar pendiente' : 'Marcar finalizada'}
              color={task.done ? 'success' : 'default'}
              onClick={() => onToggleStatus(task)}
              disabled={isSaving}
            >
              {task.done ? <CheckCircleIcon /> : <PendingIcon />}
            </IconButton>
          </span>
        </Tooltip>

        {isEditing ? (
          <TextField
            value={editingName}
            onChange={(event) => onChangeEditingName(event.target.value)}
            size="small"
            fullWidth
            autoFocus
            disabled={isSaving}
          />
        ) : (
          <Typography
            sx={{
              flex: 1,
              overflowWrap: 'anywhere',
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? 'text.secondary' : 'text.primary',
            }}
          >
            {task.name}
          </Typography>
        )}

        <Chip
          label={task.done ? 'Finalizada' : 'Pendiente'}
          color={task.done ? 'success' : 'warning'}
          size="small"
          sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
        />

        <Stack direction="row" spacing={0.5}>
          {isEditing ? (
            <>
              <Tooltip title="Guardar">
                <span>
                  <IconButton
                    aria-label="Guardar tarea"
                    color="primary"
                    onClick={() => onSaveEdit(task)}
                    disabled={isSaving}
                  >
                    {isSaving ? <CircularProgress size={22} /> : <SaveIcon />}
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Cancelar">
                <span>
                  <IconButton
                    aria-label="Cancelar edicion"
                    onClick={onCancelEdit}
                    disabled={isSaving}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Editar">
              <span>
                <IconButton
                  aria-label="Editar tarea"
                  onClick={() => onStartEdit(task)}
                  disabled={isSaving}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}

          <Tooltip title="Eliminar">
            <span>
              <IconButton
                aria-label="Eliminar tarea"
                color="error"
                onClick={() => onDelete(task)}
                disabled={isSaving}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};
