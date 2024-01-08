import { TaskBoardState } from 'types/interfaces/TaskBoardState';
import { MoveTaskSameColAction } from 'types/interfaces/TaskReducer';

/**
 * Updates the state when a task is moved within the same column.
 *
 * @param state - The current state of the task board.
 * @param action - The action containing the source and destination information.
 * @returns The updated state with the task moved within the same column.
 */

const getStateMoveTaskSameCol = (
  state: TaskBoardState,
  action: MoveTaskSameColAction,
): TaskBoardState => {
  const { source, destination } = action.payload;

  // Retrieve the start column based on the source droppableId
  const startColumn = state.columns.byId[source?.droppableId];

  // Create a copy of the tasks array without the moved task
  const updatedStartTasks = startColumn.tasks.filter(
    (task, index) => index !== source.index,
  );

  // Insert the moved task at the destination index within the same column
  const updatedStartTasksWithMove = [
    ...updatedStartTasks.slice(0, destination.index),
    startColumn.tasks[source.index],
    ...updatedStartTasks.slice(destination.index),
  ];

  // Update the start column with the updated tasks
  const updatedStartColumn = {
    ...startColumn,
    tasks: updatedStartTasksWithMove,
  };

  // Create the updated state with the task moved within the same column
  const updatedState = {
    ...state,
    columns: {
      ...state.columns,
      byId: {
        ...state.columns.byId,
        [source.droppableId]: updatedStartColumn,
      },
    },
  };

  return updatedState;
};

export default getStateMoveTaskSameCol;
