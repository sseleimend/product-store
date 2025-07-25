import { useProductStore, type Product } from "@/store/product";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useColorModeValue } from "./ui/color-mode";
import { Toaster, toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (id: string) => {
    const { success, message } = await deleteProduct(id);

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
  };

  const handleUpdateProduct = async (id: string, product: Product) => {
    const { success, message } = await updateProduct(id, product);

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
  };

  return (
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bgColor}
      >
        <Dialog.Root
          size="sm"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <Image
            src={product.image}
            alt={product.name}
            h={48}
            w={"full"}
            objectFit={"cover"}
          />
          <Box p={4}>
            <Heading as={"h3"} size="md" mb={2}>
              {product.name}
            </Heading>

            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
              ${product.price}
            </Text>

            <HStack spaceX={2}>
              <Dialog.Trigger asChild colorPalette={"blue"}>
                <IconButton colorPalette={"blue"}>
                  <BiEdit />
                </IconButton>
              </Dialog.Trigger>

              <IconButton
                onClick={() => handleDeleteProduct(product._id!)}
                colorPalette={"red"}
              >
                <BiTrash />
              </IconButton>
            </HStack>
          </Box>

          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Update Product</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack spaceY={4}>
                    <Input
                      placeholder="Product Name"
                      name="name"
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct((prevProduct) => ({
                          ...prevProduct,
                          name: e.target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Product Price"
                      name="price"
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct((prevProduct) => ({
                          ...prevProduct,
                          price: e.target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Product Image URL"
                      name="image"
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct((prevProduct) => ({
                          ...prevProduct,
                          image: e.target.value,
                        }))
                      }
                    />
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button
                    mr={3}
                    onClick={() =>
                      handleUpdateProduct(product._id!, {
                        ...updatedProduct,
                        price: Number(updatedProduct.price),
                      })
                    }
                  >
                    Add Product
                  </Button>
                  <Dialog.CloseTrigger position={"static"} asChild>
                    <Button mr={3} variant={"ghost"}>
                      Cancel
                    </Button>
                  </Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Box>
      <Toaster />
    </>
  );
};

export default ProductCard;
