import {
  Button,
  Container,
  createStyles,
  Flex,
  Image,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  padding: {
    padding: 50,
  },
  image: {
    borderRadius: theme.radius.md,
  },
  card: {
    maxWidth: "fit-content",
  },
}));
export default function TokenModal({ token }) {
  const { classes } = useStyles(undefined, undefined);

  return (
    <Container size="xl" className={classes.padding}>
      <Flex size="xl" gap="xl" justify="center">
        <Image
          className={classes.image}
          src={token.uri}
          width={400}
          height={400}
          fit="contain"
        />
        <Flex direction="column" justify="space-between">
          <Flex direction="column">
            <Title order={2}>Token #{token.id}</Title>
            <Text size="xl">Minimum Bid: {token.price} TKN</Text>
          </Flex>
          <Flex direction="column" gap="sm">
            <NumberInput
              defaultValue={token.price}
              placeholder="Your bid"
              size="xl"
              min={token.price}
              step={0.0005}
              precision={4}
            />
            <Button size="xl">Submit bid</Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
