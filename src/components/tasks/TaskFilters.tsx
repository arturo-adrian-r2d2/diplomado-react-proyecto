import { Button, MenuItem, Stack, TextField } from '@mui/material';
import type { TaskFilter } from '../../models';

interface TaskFiltersProps {
  filter: TaskFilter;
  searchInput: string;
  onChangeFilter: (filter: TaskFilter) => void;
  onChangeSearch: (search: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TaskFilters = ({
  filter,
  searchInput,
  onChangeFilter,
  onChangeSearch,
  onSubmit,
}: TaskFiltersProps) => (
  <Stack
    component="form"
    onSubmit={onSubmit}
    direction={{ xs: 'column', md: 'row' }}
    spacing={1.5}
    sx={{ mb: 2 }}
  >
    <TextField
      select
      label="Estado"
      value={filter}
      onChange={(event) => onChangeFilter(event.target.value as TaskFilter)}
      sx={{ minWidth: { md: 190 } }}
    >
      <MenuItem value="all">Todas</MenuItem>
      <MenuItem value="pending">Pendientes</MenuItem>
      <MenuItem value="done">Finalizadas</MenuItem>
    </TextField>
    <TextField
      label="Buscar"
      value={searchInput}
      onChange={(event) => onChangeSearch(event.target.value)}
      fullWidth
    />
    <Button type="submit" variant="outlined" sx={{ minWidth: 120 }}>
      Buscar
    </Button>
  </Stack>
);
