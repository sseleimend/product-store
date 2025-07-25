import { useProductStore, type Product } from "@/store/product";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useColorModeValue } from "./ui/color-mode";
import { Toaster, toaster } from "./ui/toaster";

const ProductCard = ({ product }: { product: Product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();

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
            <IconButton onClick={() => {}} colorPalette={"blue"}>
              <BiEdit />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteProduct(product._id!)}
              colorPalette={"red"}
            >
              <BiTrash />
            </IconButton>
          </HStack>
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default ProductCard;
