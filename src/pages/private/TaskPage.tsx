import { Box, Divider, Paper } from '@mui/material';
import { TaskCreateForm, TaskFilters, TaskList, TaskSummary } from '../../components';
import { useTasks } from '../../hooks';

export const TaskPage = () => {
  const {
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
  } = useTasks();

  return (
    <Box sx={{ maxWidth: 980, mx: 'auto' }}>
      <TaskSummary counters={counters} loading={loading} onRefresh={loadTasks} />

      <TaskCreateForm
        creating={creating}
        newTaskName={newTaskName}
        onChangeName={setNewTaskName}
        onSubmit={handleCreateTask}
      />

      <Paper sx={{ p: 2 }}>
        <TaskFilters
          filter={filter}
          searchInput={searchInput}
          onChangeFilter={setFilter}
          onChangeSearch={setSearchInput}
          onSubmit={handleSearch}
        />

        <Divider sx={{ mb: 2 }} />

        <TaskList
          editingId={editingId}
          editingName={editingName}
          loading={loading}
          savingId={savingId}
          tasks={visibleTasks}
          onCancelEdit={cancelEdit}
          onChangeEditingName={setEditingName}
          onDelete={(task) => void deleteTask(task)}
          onSaveEdit={(task) => void saveEdit(task)}
          onStartEdit={startEdit}
          onToggleStatus={(task) => void toggleTaskStatus(task)}
        />
      </Paper>
    </Box>
  );
};
