import {
  Container,
  createStyles,
  Flex,
  Grid,
  Modal,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { mockTokenData } from "../utils/mockTokenData";
import TokenCard from "../components/TokenCard";
import TokenModal from "../components/TokenModal";

const useStyles = createStyles({
  padding: {
    padding: 50,
  },
});

export default function Home() {
  const { classes } = useStyles(undefined, undefined);

  const [tokens, setTokens] = useState(mockTokenData);

  const [open, setOpen] = useState(false);
  const [openedToken, setOpenedToken] = useState(null);

  return (
    <Container size="xl" className={classes.padding}>
      <Flex direction="column" justify="center" align="center">
        <Title order={1}>NFT Auction Demo</Title>
        <Grid>
          {tokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={() => {
                setOpenedToken(token);
                setOpen(true);
              }}
            />
          ))}
        </Grid>
      </Flex>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        size="auto"
        exitTransitionDuration={150}
        withCloseButton={false}
      >
        <TokenModal token={openedToken} />
      </Modal>
    </Container>
  );
}
