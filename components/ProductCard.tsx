import React, { useState } from "react";
import { Box, Card, Inset, Text, Container } from "@radix-ui/themes";
import * as Popover from "@radix-ui/react-popover";
import { DotsThreeVertical } from "phosphor-react";
import { ProductCardProps } from "../interface/product";
import DeleteConfirmationDialog from "./AlertDialog";

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  name,
  price,
  description,
  image,
  onDelete,
  modifyDialog
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    setDialogOpen(false);
    onDelete(_id);
  };

  return (
    <Container className="relative w-[150px] sm:w-[200px] h-[250px] sm:h-[300px] m-1 sm:m-5 shadow-lg border-2 rounded-sm overflow-hidden transition-shadow hover:shadow-[0px_0px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] cursor-pointer group lg:w-[200px] lg:h-[300px]">
      <Box>
        <Card size="2">
          <div>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src={image}
                alt={name}
                style={{
                  display: "block",
                  objectFit: "contain",
                  width: "100%",
                  height: 140,
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Inset>
          </div>
          <div className="pr-1 pl-1 lg:p-2 overflow-hidden h-[calc(100%-140px)]">
            <Text as="p" size="1" className="text-sm lg:text-lg font-bold lg:leading-[1.4]">
              {name}
            </Text>
            <Text as="p" size="1" className="text-sm lg:mt-[2px] lg:text-md text-gray-500">
              ${price}
            </Text>
            <div className="sm:block overflow-hidden">
              <Text
                as="p"
                size="1"
                className="sm:block text-sm mt-1 overflow-hidden text-ellipsis line-clamp-2 lg:line-clamp-3"
                style={{
                  lineHeight: "1.2em" // Adjust line spacing
                }}
              >
                {description}
              </Text>
            </div>
          </div>
        </Card>
      </Box>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Options"
          >
            <DotsThreeVertical size={24} className="text-black" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="bg-white shadow-lg rounded p-2">
            <div className="flex flex-col gap-2">
              <button
                className="text-sm hover:bg-gray-100 active:bg-gray-200 rounded px-2 py-1"
                onClick={() => modifyDialog(_id)}
              >
                Modify
              </button>
              <button
                className="text-sm hover:bg-gray-100 active:bg-gray-200 rounded px-2 py-1"
                onClick={() => setDialogOpen(true)}
              >
                Delete
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <DeleteConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default ProductCard;
