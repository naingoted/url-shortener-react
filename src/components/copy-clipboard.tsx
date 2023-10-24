import { Flex, Text, ActionIcon } from '@mantine/core';
import { Check, Copy } from 'lucide-react';
import { useShowMessage } from '../hooks/use-show-message';

interface CopyClipboardProps {
  text: string;
  millisecond: number;
}

const CopyClipboard = ({ text, millisecond }: CopyClipboardProps) => {
  const { isMessage, showMessage } = useShowMessage({ millisecond });
  return (
    <>
      <ActionIcon
        onClick={() => {
          navigator.clipboard.writeText(text);
          debugger;
          showMessage();
        }}
      >
        <Copy size={18} />
      </ActionIcon>
      {isMessage && (
        <Flex gap={2} align="center" direction="row" wrap="nowrap">
          <Check color="green" size={16} />
          <Text color="dimmed" size="sm">
            Copied!
          </Text>
        </Flex>
      )}
    </>
  );
};

export default CopyClipboard;
