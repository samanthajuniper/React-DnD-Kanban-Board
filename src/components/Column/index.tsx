import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import {
  Flex,
  Heading,
  IconButton,
  ListItem,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import PlusIcon from 'components/Icons/PlusIcon';
import TaskFormCard from 'components/Cards/TaskFormCard';
import { Task } from 'types/interfaces/TaskBoardState';
import StaticTaskCard from 'components/Cards/StaticTaskCard';
import { TaskAction } from 'types/interfaces/TaskReducer';
import { MAX_TASKS_PER_COLUMN } from 'views/TaskBoard/utils/constants';

interface ColumnProps {
  id: string;
  dispatch: React.Dispatch<TaskAction>;
  title: string;
  tasks?: Task[];
}
const Column: React.FC<ColumnProps> = React.memo(
  ({ dispatch, id, tasks = [], title }: ColumnProps) => {
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);

    return (
      <Flex
        as="section"
        direction="column"
        gap="1rem"
        padding="1rem"
        bg="gray.100"
        borderRadius="0.4375rem"
        w="20rem"
        maxW="calc(100vw - 6rem)"
        minW=""
        h="100%"
      >
        <Flex as="header" w="100%" h="2rem" justifyContent="space-between">
          <Heading
            fontSize="h2"
            lineHeight="h2"
            fontWeight="boldHeader"
            m="0"
            color="black"
          >
            {title}
          </Heading>
          <Tooltip
            label={`Column cannot have more than ${MAX_TASKS_PER_COLUMN} tasks.`}
            isDisabled={tasks.length < MAX_TASKS_PER_COLUMN}
          >
            <IconButton
              aria-label="Add Task"
              icon={<PlusIcon />}
              onClick={() => {
                setIsAddTaskVisible((prevState) => !prevState);
              }}
              fontSize="1rem"
              isRound={true}
              isDisabled={tasks.length >= 100}
            />
          </Tooltip>
        </Flex>
        {isAddTaskVisible && (
          <TaskFormCard
            columnId={id}
            dispatch={dispatch}
            handleClose={() => setIsAddTaskVisible(false)}
          />
        )}
        <Droppable droppableId={id}>
          {(provided) => (
            <>
              <UnorderedList
                ref={provided.innerRef}
                {...provided.droppableProps}
                styleType="none"
                display="flex"
                flexDirection="column"
                gap="1rem"
                m="0"
                minHeight="calc(100% - 3rem)"
                sx={{
                  overflowY: 'auto',
                }}
              >
                {tasks.map((task, index) => (
                  <ListItem key={task.id} data-key={task.id}>
                    <StaticTaskCard {...task} index={index} />
                  </ListItem>
                ))}
              </UnorderedList>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </Flex>
    );
  },
);

export default Column;
