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
              <tr key={index}>
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
      <div className="border w-full  mt-2 bg-white">
        <div className="flex justify-between my-8">
          <div className="flex">
            <div className="text-gray-400 text-center items-center justify-center flex w-20 ">
              <FaTruckMoving className="w-10" />
            </div>
            <div className="text-gray-400 text-center items-center flex ">
              Ücretsiz Kargo
            </div>
          </div>
          <div className="text-gray-400 text-center items-center justify-center flex mr-14">
            ₺{order.shipping_fee}
          </div>
        </div>
        <div className="flex">
          <div className="flex ml-20">
            <p className="font-bold">Ürünler:</p>
            <p className="px-8 w-7/12 text-left mb-8">{productDescriptions}</p>
          </div>
        </div>
      </div>
      <div className="mx-12 my-10">
        <div className="flex justify-end">
          <table className="text-right flex ">
            <thead>
              <tr>
                <td className="pr-4 mt-2">Öğe alt toplamı:</td>
                <td>₺{totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-4 mt-2">Gönderim:</td>
                <td>₺{order.shipping_fee}</td>
              </tr>
              <tr>
                <td className="pr-4 mt-2">Sipariş toplamı:</td>
                <td>₺{totalPriceWithShipping.toFixed(2)}</td>
              </tr>
            </thead>
          </table>
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
