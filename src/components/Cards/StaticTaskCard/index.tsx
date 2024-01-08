import Gravatar from 'components/Gravatar';
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';

interface StaticTaskCardProps {
  description: string;
  hashedEmail: string;
  id: string;
  index: number;
  title: string;
}

const StaticTaskCard = React.memo(
  ({ description, hashedEmail, id, index, title }: StaticTaskCardProps) => (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          backgroundColor="white"
          borderRadius="0.4375rem"
          padding="1rem"
          gap="0.5rem"
          size="sm"
        >
          <CardHeader
            display="flex"
            alignItems="center"
            gap=".5rem"
            padding="0"
          >
            <Gravatar hashedEmail={hashedEmail} />
            <Tooltip>
              <Heading
                noOfLines={1}
                fontSize="h2"
                lineHeight="h2"
                fontWeight="boldHeader"
                m="0"
                color="primary.main"
              >
                {title}
              </Heading>
            </Tooltip>
          </CardHeader>
          <CardBody padding="0">
            <Text fontSize="text" lineHeight="text" fontWeight="text">
              {description}
            </Text>
          </CardBody>
        </Card>
      )}
    </Draggable>
  ),
);

export default StaticTaskCard;
