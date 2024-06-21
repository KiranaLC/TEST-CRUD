import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-bold">
            Confirm Delete
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm">
            Are you sure you want to delete this product? This action cannot be undone.
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmationDialog;
