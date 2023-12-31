import React, { useState } from "react";
import {
  Alert,
  Flex,
  Container,
  Input,
  Button,
  Loader,
  Center,
} from "@mantine/core";
import { Ban, Check } from "lucide-react";

import { useShortenUrlApi } from "../hooks/use-shorten-url-api";
import CopyClipboard from "./copy-clipboard";

const ShortUrlInput = () => {
  const [url, setUrl] = useState("");
  const { shortUrl, message, loading, handleClick } = useShortenUrlApi({ url });

  return (
    <div>
      <Flex
        mih={50}
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <Input
          id="url"
          w="100%"
          maw={500}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUrl(e.target.value);
          }}
          placeholder="Enter the link to be shortend"
        />
        <Button onClick={handleClick} loading={loading} color="black">
          Verkürzen
        </Button>
      </Flex>
      <Container p={0} maw={600}>
        {loading ? (
          <Center>
            <Loader data-testid="short-url-input-loading" variant="dots" />
          </Center>
        ) : (
          <>
            {shortUrl && (
              <Alert
                icon={<Check size={16} />}
                title="A short URL was successfuly generated!"
                color="blue"
              >
                <Flex gap="xs" align="center" direction="row" wrap="nowrap">
                  <a href={shortUrl} target="_blank" rel="noreferrer">
                    {shortUrl}
                  </a>
                  <CopyClipboard text={shortUrl} millisecond={2000} />
                </Flex>
              </Alert>
            )}
            {message && (
              <Alert icon={<Ban size={16} />} title="Error!" color="red">
                {message}
              </Alert>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ShortUrlInput;
