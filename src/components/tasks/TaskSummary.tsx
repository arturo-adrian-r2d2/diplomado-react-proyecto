import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import type { TaskCounters } from '../../models';

interface TaskSummaryProps {
  counters: TaskCounters;
  loading: boolean;
  onRefresh: () => void;
}

export const TaskSummary = ({
  counters,
  loading,
  onRefresh,
}: TaskSummaryProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={2}
    sx={{
      mb: 3,
      justifyContent: 'space-between',
      alignItems: { xs: 'stretch', md: 'center' },
    }}
  >
    <Box>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
        Mis Tareas
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
        <Chip label={`${counters.visible} visibles`} size="small" />
        <Chip
          label={`${counters.pending} pendientes`}
          color="warning"
          size="small"
        />
        <Chip
          label={`${counters.completed} finalizadas`}
          color="success"
          size="small"
        />
      </Stack>
    </Box>

    <Tooltip title="Recargar tareas">
      <span>
        <IconButton
          aria-label="Recargar tareas"
          color="primary"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshIcon />
        </IconButton>
      </span>
    </Tooltip>
  </Stack>
);
