import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@radix-ui/react-dialog';
import Product from '../interface/product';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialValues?: Product;
  mode: 'add' | 'modify';
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues,
  mode,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: initialValues ?? {
      name: '',
      price: 0,
      description: '',
      image: '',
    },
  });

  React.useEffect(() => {
    reset(initialValues ?? {
      name: '',
      price: 0,
      description: '',
      image: '',
    });
  }, [reset, initialValues]);

  const onSubmit = (data: Product) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogTitle className="text-lg font-medium text-gray-900">
            {mode === 'add' ? 'Add Product' : 'Modify Product'}
          </DialogTitle>
          <DialogClose className="absolute top-2 right-2 cursor-pointer">
            &#10005;
          </DialogClose>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mt-1">Price</label>
              <input
                type="text"
                id="price"
                placeholder="Price"
                {...register('price', { 
                  required: 'Price is required', 
                  pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' }
                })}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.price && <p className="mt-2 text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-1">Description</label>
              <textarea
                id="description"
                placeholder="Description"
                {...register('description', { required: 'Description is required' })}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.description && <p className="mt-2 text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mt-1">Image URL</label>
              <input
                type="text"
                id="image"
                placeholder="Image URL"
                {...register('image', { required: 'Image URL is required' })}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.image && <p className="mt-2 text-red-500 text-sm">{errors.image.message}</p>}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-bold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none active:bg-black"
              >
                {mode === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;

