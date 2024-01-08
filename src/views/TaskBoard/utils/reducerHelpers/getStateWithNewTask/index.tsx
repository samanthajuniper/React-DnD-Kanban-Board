import { TaskBoardState } from 'types/interfaces/TaskBoardState';
import { AddTaskAction } from 'types/interfaces/TaskReducer';

/**
 * Updates the state by adding a new task to a specified column.
 *
 * @param state - The current state of the task board.
 * @param action - The action containing the task details and the target column.
 * @returns The updated state with the new task added to the specified column.
 */

const getStateWithNewTask = (
  state: TaskBoardState,
  action: AddTaskAction,
): TaskBoardState => {
  const { columnId } = action.payload;

  // Create a new task with a unique ID
  const newTask = { ...action.payload, id: crypto.randomUUID() };

  // Retrieve the target column and update its tasks array
  const updatedColumn = {
    ...state.columns.byId[columnId],
    tasks: state.columns.byId[columnId].tasks.length
      ? [newTask, ...state.columns.byId[columnId].tasks]
      : [newTask],
  };

  // Update the state with the new task added to the specified column
  return {
    ...state,
    columns: {
      ...state.columns,
      byId: {
        ...state.columns.byId,
        [columnId]: updatedColumn,
      },
    },
  };
};

export default getStateWithNewTask;
