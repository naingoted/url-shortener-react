import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import CopyClipboard from './copy-clipboard';

Object.assign(navigator, {
  clipboard: {
    writeText: () => jest.fn(),
  },
});

describe('CopyClipboard.tsx', () => {
  jest.spyOn(navigator.clipboard, 'writeText');
  test('should show a clickable icon', () => {
    render(<CopyClipboard text="copy" millisecond={1000} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('should copy a text when clicking an icon', async () => {
    render(<CopyClipboard text="copy" millisecond={1000} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
  test('should show a message when clicking an icon', async () => {
    render(<CopyClipboard text="copy" millisecond={1000} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });
});
