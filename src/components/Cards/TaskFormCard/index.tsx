import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Card,
  CardBody,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Flex,
} from '@chakra-ui/react';
import { TaskAction } from 'types/interfaces/TaskReducer';
import getHashedMessage from 'utils/getHashedMessage';

interface TaskFormCardProps {
  columnId: string;
  dispatch: React.Dispatch<TaskAction>;
  handleClose: () => void;
}

interface TaskFormValues {
  title: string;
  email: string;
  description: string;
}

const TaskFormCard: React.FC<TaskFormCardProps> = ({
  columnId,
  dispatch,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>();

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    // gravatar requirements (https://docs.gravatar.com/general/hash/):
    //    1. Trim leading and trailing whitespace from an email address
    //    2. Force all characters to lower-case
    //    3. Hash the final string with SHA256
    const standardizedEmail = data.email.trim().toLowerCase();
    const hashedEmail = await getHashedMessage(standardizedEmail);

    const taskPayload = {
      ...data,
      columnId: columnId,
      hashedEmail: hashedEmail,
    };

    dispatch({
      type: 'ADD_TASK',
      payload: taskPayload,
    } as TaskAction);

    handleClose();
  };

  return (
    <Card
      backgroundColor="white"
      borderRadius="0.4375rem"
      padding="1rem"
      gap="0.5rem"
      size="sm"
    >
      <CardBody padding="0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={!!errors.title} mb="1rem">
            <FormLabel
              htmlFor="title"
              mb="0.5rem"
              fontSize="label"
              lineHeight="label"
              fontWeight="label"
            >
              Title
            </FormLabel>
            <Input
              id="title"
              {...register('title', {
                required: 'required',
                maxLength: 20,
              })}
              maxLength={20}
              borderColor="gray.200"
              borderRadius="0.4375rem"
            />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.email} mb="1rem">
            <FormLabel
              htmlFor="email"
              fontSize="label"
              lineHeight="label"
              fontWeight="label"
            >
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              borderColor="gray.200"
              borderRadius="0.4375rem"
            />
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.description} mb="1rem">
            <FormLabel
              htmlFor="description"
              fontSize="label"
              lineHeight="label"
              fontWeight="label"
            >
              Description
            </FormLabel>
            <Textarea
              id="description"
              {...register('description', {
                required: 'required',
              })}
              maxLength={150}
              resize="none"
              borderColor="gray.200"
              borderRadius="0.4375rem"
            />
          </FormControl>
          <Flex mt="1rem" gap="0.5rem">
            <Button
              type="submit"
              border="0.063rem"
              borderColor="primary.dark"
              borderRadius="3.125rem"
              color="white"
              backgroundColor="primary.main"
              boxShadow="0 0.063rem 0.25rem 0 rgba(0, 0, 0, 0.04)"
              _hover={{ bg: '#1143a6' }}
            >
              Save Task
            </Button>
            <Button
              onClick={handleClose}
              backgroundColor="white"
              border="none"
              borderRadius="3.125rem"
              color="gray.300"
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
};

export default TaskFormCard;
