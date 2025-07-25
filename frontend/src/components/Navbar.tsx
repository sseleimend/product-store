import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsMoon, BsPlusSquare, BsSun } from "react-icons/bs";
import { Link } from "react-router";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgClip="text"
          bgGradient="to-r"
          gradientFrom={
            colorMode !== "light" ? "colorPalette.200" : "colorPalette.700"
          }
          gradientTo={
            colorMode !== "light" ? "colorPalette.300" : "colorPalette.800"
          }
          fontSize={{
            base: "22px",
            sm: "28px",
          }}
          fontWeight={"bold"}
          textTransform="uppercase"
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spaceX={2} alignItems={"center"}>
          <Button asChild>
            <Link to="/create">
              <BsPlusSquare fontSize={20} />
            </Link>
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <BsMoon /> : <BsSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
