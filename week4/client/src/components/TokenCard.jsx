import {
  Card,
  createStyles,
  Flex,
  Grid,
  Image,
  Space,
  Text,
  UnstyledButton,
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

export default function TokenCard({ token, onClick }) {
  const { classes } = useStyles(undefined, undefined);

  return (
    <Grid.Col span={3}>
      <Card
        m="auto"
        p="sm"
        withBorder
        className={classes.card}
        component={UnstyledButton}
        onClick={onClick}
      >
        <Image
          className={classes.image}
          src={token.uri}
          width={200}
          height={200}
          fit="contain"
        />
        <Space h="md" />
        <Flex justify="space-between">
          <Text fw={700}>NFT #{token.id}</Text>
          <Text>Min Bid: {token.price} TKN</Text>
        </Flex>
      </Card>
    </Grid.Col>
  );
}
