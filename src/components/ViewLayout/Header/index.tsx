import { Flex, Heading } from "@chakra-ui/react";

const Header: React.FC = () => (
  <Flex
    as="header"
    bg="primary.main"
    w="100%"
    h="6rem"
    alignItems="center"
    px="2rem">
    <Heading
      as="h1"
      color="white"
      fontSize="h1"
      fontWeight="boldHeader"
      lineHeight="h1">
      React DnD Kanban Board
    </Heading>
  </Flex>
);

export default Header;
