import {
  ColumnType,
  Task,
  Column,
  TaskBoardState,
} from 'types/interfaces/TaskBoardState';

// Column data
const columnTypes: ColumnType[] = ['todo', 'inProgress', 'done'];
const columnTitles: string[] = ['To Do', 'In Progress', 'Done'];

// Function to generate mock tasks
const generateMockTasks = (
  count: number,
  columnType: ColumnType,
  startFrom: number,
): Task[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      hashedEmail: `user${i + 1}@example.com`,
      id: Math.random().toString(),
      title: `Task ${i + 1 + startFrom}`,
      columnId: columnType,
      description: `Description for Task ${i + 1 + startFrom}`,
    }));
};

// Function to create columns and organize tasks
const createColumns = (taskArray: Task[]): Record<string, Column> => {
  const columns: Record<string, Column> = {};
  columnTypes.forEach((columnType, index) => {
    columns[columnType] = {
      id: columnType,
      title: columnTitles[index],
      tasks: taskArray.filter((task) => task.columnId === columnType),
    };
  });
  return columns;
};

// Generate an array of N mock tasks for each column type
const tasksPerColumnType = 99; // Specify the number of tasks per column type
const mockTasks: Task[] = columnTypes
  .map((columnType, index) =>
    generateMockTasks(
      tasksPerColumnType,
      columnType,
      index * tasksPerColumnType,
    ),
  )
  .flat();

// Organize tasks into columns
const columns: Record<string, Column> = createColumns(mockTasks);

// Create the initial state
const mockInitialState: TaskBoardState = {
  columns: {
    byId: columns,
    allIds: columnTypes,
  },
};

export { mockInitialState, mockTasks };
