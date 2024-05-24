/* eslint-disable @next/next/no-img-element */
import React from "react";
import orderData from "../order.json";
import Link from "next/link";
import { FaTruckMoving } from "react-icons/fa";

const Product = ({ name, image, price, quantity, total_price }) => (
  <div className="bg-white py-4">
    <div className="container">
      <div className="px-5 flex items-center">
        <img src={image} alt={name} width="50" className="border border-solid" />
        <div className="ml-4 text-blue-600 underline">
          <Link href="/">{name}</Link>
        </div>
      </div>
      <div className="flex space-x-3 items-center px-20 gap-6">
        <div className="px-1">₺{price}</div>
        <div className="px-3">{quantity}x</div>
        <div>₺{total_price}</div>
      </div>
    </div>
  </div>
);

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
  const totalPriceWithShipping = totalPrice + parseFloat(order.shipping_fee) // öğe alt toplamı ve gönderim bedelinin toplamını hesaplamak için kullandım.

  return (
    <div className="border border-solid bg-yeşil">
      <div className="border">
        <div className="container">
          <div className="px-5 text-gray-400">Ürün</div>
          <div className="flex space-x-3 gap-6 footer-responsive">
            <div className="text-gray-400">Maliyet</div>
            <div className="text-gray-400">Miktar</div>
            <div className="text-gray-400">Toplam</div>
          </div>
        </div>
      </div>
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
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
        <div className="flex">
          <div className="ml-16 font-bold">Ürünler:</div>
          <div className="flex ml-12 pr-80">{productDescriptions}</div>
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
