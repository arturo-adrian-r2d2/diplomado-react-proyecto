import { Add as AddIcon } from '@mui/icons-material';
import { Button, CircularProgress, Paper, Stack, TextField } from '@mui/material';

interface TaskCreateFormProps {
  creating: boolean;
  newTaskName: string;
  onChangeName: (name: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TaskCreateForm = ({
  creating,
  newTaskName,
  onChangeName,
  onSubmit,
}: TaskCreateFormProps) => (
  <Paper component="form" onSubmit={onSubmit} sx={{ p: 2, mb: 2 }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
      <TextField
        label="Nueva tarea"
        value={newTaskName}
        onChange={(event) => onChangeName(event.target.value)}
        fullWidth
        disabled={creating}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={creating}
        startIcon={
          creating ? <CircularProgress size={18} color="inherit" /> : <AddIcon />
        }
        sx={{ minWidth: 150 }}
      >
        Agregar
      </Button>
    </Stack>
  </Paper>
);
