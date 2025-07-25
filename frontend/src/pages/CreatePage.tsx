import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState, type MouseEvent } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  async function handleAddProduct(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const { success, message } = await createProduct({
      ...newProduct,
      price: Number(newProduct.price),
    });
    if (!success)
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 3000,
        closable: true,
      });
    toaster.create({
      title: "Success",
      description: message,
      type: "success",
      duration: 3000,
      closable: true,
    });
  }

  return (
    <>
      {" "}
      <Container maxW={"container.sm"}>
        <VStack spaceY={8}>
          <Heading as="h1" size={"2xl"} textAlign={"center"}>
            Create New Product
          </Heading>
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spaceY={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    price: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Product Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    image: e.target.value,
                  }))
                }
              />
              <Button onClick={handleAddProduct} w={"full"}>
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Toaster />
    </>
  );
};
export default CreatePage;
