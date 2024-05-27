/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import orderData from "../order.json";
import Link from "next/link";
import { FaTruckMoving } from "react-icons/fa";

const ProductList = ({ products }) => {
  const totalPrice = products.reduce((total, product) => {
    return total + parseFloat(product.total_price);
  }, 0);

  const productDescriptions = products //kargo kısmındaki ürünler ve miktarlarını mapleme işlemi
    .map((product) => {
      return `${product.name} × ${product.quantity}`;
    })
    .join(", ");

  const order = orderData.order;
  const totalPriceWithShipping = totalPrice + parseFloat(order.shipping_fee); // öğe alt toplamı ve gönderim bedelinin toplamını hesaplamak için kullandım.

  return (
    <div className="border border-solid bg-yeşil">
      <div className="overflow-x-auto bg-white">
        <table className="border w-full min-w-[46rem]">
          <thead>
            <tr className="border flex-row items-center bg-yeşil">
              <td className="text-gray-400 text-center w-20">Ürün</td>
              <td className="text-gray-400 text-center "></td>
              <td className="text-gray-400 text-center ">Maliyet</td>
              <td className="text-gray-400 text-center ">Miktar</td>
              <td className="text-gray-400 text-center ">Toplam</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="">
                <td className=" text-center">
                  <img
                    src={product.image}
                    width="50px"
                    className="border m-4"
                  />
                </td>
                <td className=" text-left text-blue-600 underline">
                  <Link href="/">{product.name}</Link>
                </td>
                <td className=" text-center">{product.price}</td>
                <td className=" text-center">{product.quantity}x</td>
                <td className=" text-center">{product.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border p-5 bg-white">
        <div className="flex items-center">
          <div className="ml-5">
            <FaTruckMoving />
          </div>
          <div className="container mx-5 pb">
            <div className="mx-2">Ücretsiz kargo</div>
            <div className="px-10">₺{order.shipping_fee}</div>
          </div>
        </div>
        <div className="flex overflow-x-auto">
          <div className="ml-16 font-bold">Ürünler:</div>
          <div className="flex  justify-start">{productDescriptions}</div>
        </div>
      </div>
      <div className="mt-3 p-5 text-right">
        <div className="flex justify-end">
          <div className="pr-20">Öğe alt toplamı:</div>
          <div>₺{totalPrice.toFixed(2)}</div>
        </div>
        <div className="flex justify-end my-3">
          <div className="pr-24">Gönderim:</div>
          <div className="ml-3">₺{order.shipping_fee}</div>
        </div>
        <div className="flex justify-end">
          <div className="pr-20">Sipariş toplamı:</div>
          <div>₺{totalPriceWithShipping.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const products = orderData.order.products;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default App;
