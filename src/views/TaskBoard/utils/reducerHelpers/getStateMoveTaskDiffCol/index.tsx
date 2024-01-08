import { TaskBoardState } from 'types/interfaces/TaskBoardState';
import { MoveTaskDiffColAction } from 'types/interfaces/TaskReducer';

/**
 * Updates the state when a task is moved to a different column.
 *
 * @param state - The current state of the task board.
 * @param action - The action containing the source and destination information.
 * @returns The updated state with the task moved to the destination column.
 */

const getStateMoveTaskDiffCol = (
  state: TaskBoardState,
  action: MoveTaskDiffColAction,
): TaskBoardState => {
  const { source, destination } = action.payload;
  // Retrieve the start and end columns based on droppableIds
  const startColumn = state.columns.byId[source?.droppableId];
  const endColumn = state.columns.byId[destination.droppableId];

  const movedTask = startColumn.tasks[source.index];

  // Update the start column's tasks by removing the moved task
  const updatedStartTasks = startColumn.tasks.filter(
    (_, index) => index !== source.index,
  );

  // Update the end column's tasks, creating a new array if it's undefined
  const updatedEndTasks = endColumn.tasks
    ? [
        ...endColumn.tasks.slice(0, destination.index),
        movedTask,
        ...endColumn.tasks.slice(destination.index),
      ]
    : [movedTask];

  // Update the end column with the updated tasks
  const updatedEndColumn = {
    ...endColumn,
    tasks: updatedEndTasks,
  };
  // Create the updated columns.byId object
  const updatedColumnsById = {
    ...state.columns.byId,
    [source.droppableId]: { ...startColumn, tasks: updatedStartTasks },
    [destination.droppableId]: updatedEndColumn,
  };

  // Create the updated state with the moved task
  return {
    ...state,
    columns: { ...state.columns, byId: updatedColumnsById },
  };
};

export default getStateMoveTaskDiffCol;
