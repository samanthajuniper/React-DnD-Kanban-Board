type ColumnType = 'todo' | 'inProgress' | 'done';

interface Task {
  // Author, used to fetch gravatar
  hashedEmail: string;
  // Unique identifier
  id: string;
  // Displayed as card title
  title: string;
  // Used to map to columns
  columnId: ColumnType;
  // Displayed as card description
  description: string;
}

interface Column {
  // Unique identifier
  id: string;
  // Displayed as column title
  title: string;
  // Displayed as cards
  tasks: Task[];
}

interface ColumnState {
  byId: Record<string, Column>;
  allIds: string[];
}

interface TaskBoardState {
  columns: ColumnState;
}

export type { ColumnType, Task, Column, TaskBoardState };
