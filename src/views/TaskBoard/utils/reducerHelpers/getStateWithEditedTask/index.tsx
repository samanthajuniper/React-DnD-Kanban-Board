import { Task, TaskBoardState } from 'types/interfaces/TaskBoardState';
import { EditTaskAction } from 'types/interfaces/TaskReducer';

// what needs to be done to edit a card
// 1) probably need to break form task out from the parent card structure so it can be conditionally rendered in the static card on an edit button click
// 2) update task form to accept default values
// 3) populate the default values in the form fields
// 4) on save: call the EDIT_TASK reducer, close the form, show newest data
// 5) add this function to the EDIT_TALK reducer case
// 6) be mindful of state updates...I could go the optimistic UI route here and just render the updated data before it makes it to local storage and triggers a re-render. For a local storage app, this isn't really a big deal, but with an api call to a separate be service, it would be nice to not wait for that to finish before showing the updated task data in the card.

const getStateWithEditedTask = (
  state: TaskBoardState,
  action: EditTaskAction,
): TaskBoardState => {
  const { columnId, id } = action.payload;

  const updatedColumnTasks = [...state.columns.byId[columnId].tasks];
  const taskIndex = updatedColumnTasks.findIndex(
    (task: Task) => task.id === id,
  );
  updatedColumnTasks[taskIndex] = action.payload;

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

export default getStateWithEditedTask;
