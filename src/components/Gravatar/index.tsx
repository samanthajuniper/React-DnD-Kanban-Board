import React from 'react';
import { Avatar } from '@chakra-ui/react';

interface GravatarProps {
  hashedEmail: string;
}

const Gravatar: React.FC<GravatarProps> = React.memo(
  ({ hashedEmail }: GravatarProps) => (
    <Avatar
      // TODO: don't love this alt, but it'll have to do for MVP
      name={`Author gravatar`}
      src={`https://www.gravatar.com/avatar/${hashedEmail}?s=200`}
      w="1.5rem"
      h="1.5rem"
      rounded="full"
      ignoreFallback
    />
  ),
);

export default Gravatar;
