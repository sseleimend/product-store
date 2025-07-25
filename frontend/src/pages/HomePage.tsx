import ProductCard from "@/components/ProductCard";
import { useColorMode } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const { colorMode } = useColorMode();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spaceY={8}>
        <Text
          bgClip="text"
          bgGradient="to-r"
          gradientFrom={
            colorMode !== "light" ? "colorPalette.200" : "colorPalette.700"
          }
          gradientTo={
            colorMode !== "light" ? "colorPalette.300" : "colorPalette.800"
          }
          fontSize={"30px"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>
        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"colorPalette.500"}
          >
            No products found 🥹{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={
                  colorMode !== "light"
                    ? "colorPalette.100"
                    : "colorPalette.900"
                }
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
