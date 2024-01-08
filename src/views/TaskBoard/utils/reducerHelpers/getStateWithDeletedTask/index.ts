import { Task, TaskBoardState } from 'types/interfaces/TaskBoardState';
import { EditTaskAction } from 'types/interfaces/TaskReducer';

// what needs to be done to edit a card
// 1) need to add a delete icon button to static task card
// 2) on delete: call the DELETE_TASK reducer
// 3) add this fn to the DELETE_TASK reducer case
// 4) be mindful of state updates...I could go the optimistic UI route here and just render the updated data before it makes it to local storage and triggers a re-render. For a local storage app, this isn't really a big deal, but with an api call to a separate be service, it would be nice to not wait for that to finish before showing the updated task list without the deleted

const getStateWithDeletedTask = (
  state: TaskBoardState,
  action: EditTaskAction,
): TaskBoardState => {
  const { columnId, id } = action.payload;

  const updatedColumnTasks = state.columns.byId[columnId].tasks.filter(
    (task: Task) => task.id !== id,
  );

  return {
    ...state,
    columns: {
      ...state.columns,
      byId: {
        ...state.columns.byId,
        [columnId]: {
          ...state.columns.byId[columnId],
          tasks: updatedColumnTasks,
        },
      },
    },
  };
};

export default getStateWithDeletedTask;
