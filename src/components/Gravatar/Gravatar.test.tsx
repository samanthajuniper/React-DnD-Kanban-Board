import React from 'react';
import { render, screen } from '@testing-library/react';
import Gravatar from '.';

describe('<Gravatar/>', () => {
  const renderGravatar = (hashedEmail: string) => {
    render(<Gravatar hashedEmail={hashedEmail} />);

    const { getByRole } = screen;
    const gravatar = getByRole('img', {
      name: /Author gravatar/,
    });
    return gravatar;
  };

  it('renders with the hashed email in the src attribute', () => {
    const email = 'test@test.com';

    const gravatar = renderGravatar(email);

    expect(gravatar).toBeInTheDocument();
    expect(gravatar).toHaveAttribute(
      'src',
      `https://www.gravatar.com/avatar/${email}?s=200`,
    );
  });
});
