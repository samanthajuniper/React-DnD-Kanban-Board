import { mockRandomUUID } from 'setupTests';
import addTask from '.';
import getStateWithNewTask from '.';
import { AddTaskAction } from 'types/interfaces/TaskReducer';
import { ColumnType } from 'types/interfaces/TaskBoardState';

const addTaskPayload = {
  title: 'New Task',
  hashedEmail: 'test@test.com',
  description: 'test',
  columnId: 'todo' as ColumnType,
};

const newTask = {
  id: '123',
  ...addTaskPayload,
};

describe('addTask', () => {
  beforeEach(() => {
    mockRandomUUID.mockImplementation(() => '123');
  });

  it('should return new state object with new task added to the correct column', () => {
    const initialState = {
      columns: {
        byId: {
          todo: {
            id: 'todo',
            title: 'To do',
            tasks: [],
          },
        },
        allIds: ['todo'],
      },
    };

    const action: AddTaskAction = {
      type: 'ADD_TASK',
      payload: addTaskPayload,
    };

    const newState = getStateWithNewTask(initialState, action);

    expect(newState.columns.byId.todo.tasks).toStrictEqual([newTask]);
  });

  it('should add a task to the start of a populated column', () => {
    const existingTask = {
      id: '1',
      ...addTaskPayload,
    };

    const initialState = {
      columns: {
        byId: {
          todo: {
            id: 'todo',
            title: 'To do',
            tasks: [existingTask],
          },
        },
        allIds: ['todo'],
      },
    };

    const action: AddTaskAction = {
      type: 'ADD_TASK',
      payload: addTaskPayload,
    };

    const newState = addTask(initialState, action);

    expect(newState.columns.byId.todo.tasks).toStrictEqual([
      newTask,
      existingTask,
    ]);
  });
});
