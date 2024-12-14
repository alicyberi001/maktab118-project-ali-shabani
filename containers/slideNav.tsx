"use client";

import { fetchProductsByCategory } from "@/api/product.service";
import ProductCard from "@/components/productCard";
import { useQuery } from "@tanstack/react-query";



const SlideNav = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchProductsByCategory({
        page: 1,
        limit: 10,
        categoryID: "674c96cd591fa0b7179b5331",
      }),
  });

  return (
    <nav className="h-96 border border-gray-800 bg-red-400 rounded-xl overflow-x-scroll flex flex-nowrap gap-3">
          {data?.data.products.map((product, index) => (
            <ProductCard 
              key={index}
              image={`http://localhost:8000/images/products/images/${product.images[0]}`}
              title={product.name}
              price={product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              description={product.description}
            />
          ))}
        </nav>
  );
};

export default SlideNav;
