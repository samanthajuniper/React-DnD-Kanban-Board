import { DraggableLocation, DraggableRubric } from '@hello-pangea/dnd';
import { Task, TaskBoardState } from './TaskBoardState';

// note: new tasks don't have an id--the reducer generates one
type AddTaskAction = { type: 'ADD_TASK'; payload: Omit<Task, 'id'> };

type EditTaskAction = { type: 'EDIT_TASK'; payload: Task };

type DeleteTaskAction = {
  type: 'DELETE_TASK';
  payload: Pick<Task, 'id' | 'columnId'>;
};

type MoveTaskSameColAction = {
  type: 'MOVE_TASK_SAME_COL';
  payload: Pick<DraggableRubric, 'source'> & {
    destination: DraggableLocation;
  };
};

type MoveTaskDiffColAction = {
  type: 'MOVE_TASK_DIFF_COL';
  payload: Pick<DraggableRubric, 'source'> & {
    destination: DraggableLocation;
  };
};

type LocalStorageUpdate = {
  type: 'LOCAL_STORAGE_UPDATE';
  payload: { newState: string };
};

type TaskAction =
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | MoveTaskSameColAction
  | MoveTaskDiffColAction
  | LocalStorageUpdate;

type TaskReducer = (
  state: TaskBoardState,
  action: TaskAction,
) => TaskBoardState | undefined;

export type {
  TaskAction,
  TaskReducer,
  AddTaskAction,
  EditTaskAction,
  MoveTaskDiffColAction,
  MoveTaskSameColAction,
};
