import { createStyles, Container, Title, Text } from "@mantine/core";

import "./App.css";
import ShortUrlInput from "./components/short-url-Input";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },
}));

const App = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            URL Shortener
          </Text>
        </Title>

        <Container my={10} p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Generate a short url and redirect to the long url when a user click
            the short url.
          </Text>
        </Container>

        <Container p={0} maw={800}>
          <ShortUrlInput />
        </Container>
      </div>
    </Container>
  );
};

export default App;
