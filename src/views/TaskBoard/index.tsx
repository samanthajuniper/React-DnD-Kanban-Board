import React, { useEffect, useReducer } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '../../components/Column';
import { TaskBoardState } from 'types/interfaces/TaskBoardState';
import { TaskAction } from 'types/interfaces/TaskReducer';
import getStateWithNewTask from './utils/reducerHelpers/getStateWithNewTask';
import getStateMoveTaskSameCol from './utils/reducerHelpers/getStateMoveTaskSameCol';
import getStateMoveTaskDiffCol from './utils/reducerHelpers/getStateMoveTaskDiffCol';
import { Flex, useToast } from '@chakra-ui/react';
import { LOCAL_STORAGE_KEY, MAX_TASKS_PER_COLUMN } from './utils/constants';

// Get the initial state from local storage or create a new one
const getInitialState = () => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : createInitialState();
};

// Create the initial state if no local storage data is available
const createInitialState = () => {
  return {
    columns: {
      byId: {
        todo: {
          id: 'todo',
          title: 'To Do',
          tasks: [],
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          tasks: [],
        },
        done: {
          id: 'done',
          title: 'Done',
          tasks: [],
        },
      },
      allIds: ['todo', 'inProgress', 'done'],
    },
  };
};

// Initialize the initial state
const initialState = getInitialState();

// Reducer function for managing task state
const taskReducer = (state: TaskBoardState, action: TaskAction) => {
  switch (action.type) {
    case 'LOCAL_STORAGE_UPDATE': {
      // Update state from local storage data
      return JSON.parse(action.payload.newState);
    }
    case 'ADD_TASK': {
      // Handle adding a new task and update local storage
      const newState = getStateWithNewTask(state, action);
      saveStateToLocalStorage(newState);
      return newState;
    }
    case 'MOVE_TASK_SAME_COL': {
      // Handle moving a task within the same column and update local storage
      const newState = getStateMoveTaskSameCol(state, action);
      saveStateToLocalStorage(newState);
      return newState;
    }
    case 'MOVE_TASK_DIFF_COL': {
      // Handle moving a task to a different column and update local storage
      const newState = getStateMoveTaskDiffCol(state, action);
      saveStateToLocalStorage(newState);
      return newState;
    }
    default:
      return state;
  }
};

// Save the state to local storage
const saveStateToLocalStorage = (state: TaskBoardState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

const TaskBoard: React.FC = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const toast = useToast();

  useEffect(() => {
    // Save the initial state to localStorage upon the initial render
    saveStateToLocalStorage(state);

    // Listen for changes in local storage and update state accordingly
    const checkStoredTaskBoardData = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        const newState = JSON.parse(e.newValue);
        dispatch({
          type: 'LOCAL_STORAGE_UPDATE',
          payload: { newState: JSON.stringify(newState) },
        });
      }
    };

    window.addEventListener('storage', checkStoredTaskBoardData);

    // Clean up event listener to avoid memory leaks
    return () => {
      window.removeEventListener('storage', checkStoredTaskBoardData);
    };
  }, [state]);

  // Handle the end of a task drag-and-drop operation
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const isMovingWithinColumn = destination.droppableId === source.droppableId;
    const isMovingIndex = destination?.index === source.index;
    if (isMovingWithinColumn) {
      return isMovingIndex
        ? null
        : dispatch({
            type: 'MOVE_TASK_SAME_COL',
            payload: {
              source,
              destination,
            },
          } as TaskAction);
    } else {
      const endColumn = state.columns.byId[destination.droppableId];
      // Do not move the task if the end column's max is exceeded
      return endColumn.tasks.length >= MAX_TASKS_PER_COLUMN
        ? toast({
            title: 'Max Limit Reached',
            description: `The ${endColumn.title} column is full.`,
            status: 'warning',
            duration: 3000, // Toast duration in milliseconds
            isClosable: true,
          })
        : dispatch({
            type: 'MOVE_TASK_DIFF_COL',
            payload: {
              source,
              destination,
            },
          } as TaskAction);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Flex
          display="flex"
          columnGap="2rem"
          maxWidth="100vw"
          overflowY="hidden"
          overflowX="auto"
          scrollSnapType="x mandatory"
          height="calc(100% - 8rem)"
          padding="2rem"
          sx={{
            scrollbarWidth: 'none',
            webkitOverflowScrolling: 'touch',
          }}
        >
          {state.columns.allIds.map((columnId: string) => {
            const column = state.columns.byId[columnId];
            return (
              <Column
                key={columnId}
                title={column.title}
                tasks={column.tasks}
                id={columnId}
                dispatch={dispatch}
              />
            );
          })}
        </Flex>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
