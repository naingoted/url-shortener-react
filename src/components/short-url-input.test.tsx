import { userEvent } from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import ShortUrlInput from './short-url-Input';

jest.mock('../hooks/use-shorten-url-api', () => {
  return {
    useShortenUrlApi: () => ({
      shortUrl: 'http://localhost:4000/D41d1fcs',
      message: null,
      loading: true,
      handleClick: jest.fn(),
    }),
  };
});

describe(`ShortUrlInput.tsx`, () => {
  test('should show an input box', () => {
    render(<ShortUrlInput />);
    expect(
      screen.getByPlaceholderText('Enter the link to be shortend'),
    ).toBeInTheDocument();
  });
  test('should show a shorten button', () => {
    render(<ShortUrlInput />);
    expect(
      screen.getByRole('button', { name: 'Verkürzen' }),
    ).toBeInTheDocument();
  });
});
