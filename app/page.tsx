"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Product from "../interface/product";
import useProductStore from "../utils/store";
import ProductDialog from "@/components/ProductDialog";
import { useSearchParams } from "next/navigation";

const itemsPerPage = 16;

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [modifyProductId, setModifyProductId] = useState<string | null>(null);
  const product = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const addProducts = useProductStore((store) => store.addProduct);
  const deleteProd = useProductStore((store) => store.deleteProduct);
  const updateProd = useProductStore((store) => store.updateProduct);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const openDialog = (_id: string) => {
    setModifyProductId(_id);
    setIsModifyDialogOpen(true);
  };

  const closeDialog = () => {
    setIsModifyDialogOpen(false);
    setModifyProductId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async (product: Product) => {
    addProducts(product);
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    await fetchProducts();
  };

  const deleteProduct = async (_id: string) => {
    deleteProd(_id);
    await fetch(`api/products/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchProducts();
  };

  const updateProduct = async (updatedProduct: Product) => {
    updateProd(updatedProduct);
    console.log(updatedProduct, "here");

    const response = await fetch(`/api/products/${updatedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
  };

  const filteredProducts = product.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const products = filteredProducts.map((prod) => (
    <ProductCard
      key={prod._id}
      {...prod}
      onDelete={deleteProduct}
      modifyDialog={openDialog}
    />
  ));

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen w-[90%] sm:w-[80%] mt-[64px] mx-auto">
      {currentPage === 1 && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full sm:w-[60%] py-4 mt-6 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition-colors"
          >
            +ADD
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[20px] sm:mt-2 sm:gap-9 flex-grow justify-center m-auto">
        {currentProducts}
      </div>
      <div className="flex justify-center bottom-0 left-0 right-0 py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 mx-2 bg-gray-950 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 mx-2 bg-gray-950 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={addProduct}
        mode="add"
      />

      <ProductDialog
        isOpen={isModifyDialogOpen}
        onClose={closeDialog}
        onSave={(updatedProduct: Product) => {
          updateProduct(updatedProduct);
          closeDialog();
        }}
        initialValues={product.find((prod) => prod._id === modifyProductId)}
        mode="modify"
      />
    </div>
  );
}

export default function HomeContent(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Home/>
    </Suspense>
  )
}