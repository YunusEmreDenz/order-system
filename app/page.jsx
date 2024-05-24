"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoMdArrowDropup, IoIosArrowDown } from "react-icons/io";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Footer from "@/components/Footer";
import orderData from "../order.json";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const todoListRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("Beklemede");
  const [selectedDate, setSelectedDate] = useState("2023-09-19");
  const [displayText, setDisplayText] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Tarih değiştirildi:", selectedDate);
    setDisplayText(selectedDate);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      // mesajda bıkarılan fazla boşlukları siler
      setTodos([...todos, { id: Date.now(), text: inputText }]); // zamana göre eşsiz id verir
      setInputText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (todoListRef.current) {
      todoListRef.current.scrollTop = todoListRef.current.scrollHeight;
    }
  }, [todos]);

  useEffect(() => {
    const total = orderData.order.products.reduce((sum, product) => {
      return sum + parseFloat(product.total_price.replace(",", "."));
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, []);

  const { order } = orderData;

  const totalOrderPrice = order.products // order objesinin içinde bulunan products arrayindeki total_price objelerinin toplamı
    .reduce((total, product) => {
      return total + parseFloat(product.total_price.replace(",", "."));
    }, 0)
    .toFixed(2);

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdate = () => {
    const newMessage = `Sipariş durumu güncellendi: ${selectedStatus}`;
    setTodos([...todos, { id: Date.now(), text: newMessage }]);
  };

  return (
    <body>
      <div className="main">
        <main>
          <div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevhhzNnC99YPQIIy4vKA6347LS_4b760QrnUrvxcxfw&s"
                alt="Çalışkan Arı Yayınları"
                width="100px"
              />
            </div>
            <div className="grid-container">
              <div className="grid-item">
                Sipariş Tarih:
                <p className="text-white not-italic pl-1">{order.created_at}</p>
              </div>
              <div className="grid-item">
                Sipariş Tutar:
                <p className="text-white not-italic pl-1">{totalOrderPrice}₺</p>
              </div>
              <div className="grid-item">
                Sipariş Numara:
                <p className="text-white not-italic pl-1"> {order.id}</p>
              </div>
              <div className="grid-item">
                Sipariş Durum:
                <p className="text-white not-italic pl-1"> {selectedStatus}</p>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-siyah text-white w-full mt-1 p-2 italic text-left">
            Sipariş Detayları
          </h1>
          <div className="details-container">
            <div className="detail-item">
              <span className="label">Yetkili İsim:</span>
              <span className="value">{order.authorized_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Firma İsmi:</span>
              <span className="value">{order.company_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Telefon:</span>
              <span className="value">{order.phone}</span>
            </div>
            <div className="detail-item">
              <span className="label">E-mail:</span>
              <span className="value">{order.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Adres:</span>
              <span className="value">{order.address}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-siyah text-white w-full mt-1 p-2 italic text-left">
            Sipariş Detayları
          </h1>

          <div>
            <div className="container border rounded border-gray-300 m-8 p-2">
              <div className="text-left">
                <label htmlFor="created_at">Genel</label>
                <div>
                  <div className="mt-1.5 text-gray-500">Oluşturulan tarih:</div>
                  <input
                    type="date"
                    id="created_at"
                    name="created_at"
                    defaultValue="2023-09-19"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="block w-full px-2 py-1 border border-gray-400 rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="status" className="text-gray-500">
                    Durum:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={selectedStatus}
                    className="block w-full p-2 border rounded-md border-gray-400"
                    onChange={handleSelectChange}
                  >
                    <option value="Beklemede">Beklemede.</option>
                    <option value="Hazırlanıyor">Hazırlanıyor.</option>
                    <option value="Tamamlandı">Tamamlandı.</option>
                  </select>
                </div>
                <div>
                  <div className="mt-3">
                    <label htmlFor="status" className="text-gray-500">
                      Durum:
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue="Başarısız"
                      className="block w-full p-2 border rounded-md border-gray-400"
                    >
                      <option value="customer">
                        {order.customer_name}(#{order.customer_id}-{order.email}
                        )
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pr-5">
                <button
                  className="bg-mavi p-1.5 rounded text-white  hover:text-mavi border border-maviease-in duration-200 hover:bg-opacity-15"
                  onClick={() => {
                    handleUpdate();
                    handleButtonClick();
                  }}
                >
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        </main>
        <aside className="right">
          {/* ana div */}
          <div
            className="border"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "726px",
            }}
          >
            {/* başlık divi */}
            <div className="container p-2 font-bold border">
              <div>Sipariş notları</div>
              <div className="flex items-center gap-2 ">
                <div>
                  <button>
                    <IoIosArrowUp />
                  </button>
                </div>
                <div>
                  <button>
                    <IoIosArrowDown />
                  </button>
                </div>
                <div>
                  <button>
                    <IoMdArrowDropup />
                  </button>
                </div>
              </div>
            </div>
            {/* mesajlar blümünü içeren div */}
            <div
              className="border p-2"
              ref={todoListRef}
              style={{ maxHeight: "550px", overflowY: "auto", flex: "1" }}
            >
              <ul>
                <li className="my-1">
                  <div className="bg-kırmızı rounded-sm">
                    <div className="text-left p-3">
                      <div>PAYTR BİLDİRİMİ - Ödeme Kabul Edildi</div>
                      <div className="flex">
                        <div>Toplam Ödenen:</div>
                        <div className=" pl-1">₺{totalPrice}</div>
                      </div>
                      <div className="flex">
                        <div>Ödenen:</div>
                        <div className=" pl-1">₺{totalPrice}</div>
                      </div>
                      <div className="flex">
                        <div>Taksit Sayısı:</div>
                        <div className=" pl-1">
                          {orderData.order.paytr[0].single_payment}
                        </div>
                      </div>
                      <div >
                        <div>PayTR Sipariş Numarası:</div>
                        <div className="text-blue-600 underline">
                          {orderData.order.paytr[0].number}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <div className=" flex my-1">
                      <div className="bg-kırmızı rounded-sm w-full text-left px-3 py-4">
                        {todo.text}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-gray-600 text-xs flex justify-start px-3">{displayText}</div>
                      <div>
                        <button
                          className="text-red-600 text-xs flex justify-start"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Notu sil
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* mesaj işlemlerinin yapıldığı div */}
            <div className="mx-4 mt-10">
              <div className="flex gap-8">
                <div>
                  <label className=" flex justify-start items-center">
                    Not ekle
                  </label>
                </div>
                <div className="items-center pt-1">
                  <BsFillQuestionCircleFill />
                </div>
              </div>
              <div>
                <textarea
                  className="flex justify-start w-full border-black border-solid border rounded pl-2"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Not girin"
                />
              </div>
            </div>
            <div className="flex py-4 mx-4 gap-1">
              <select
                id="status"
                name="status"
                defaultValue="Başarısız"
                className="block  p-2 border rounded-md border-gray-400"
              >
                <option value="message"> Özel Not</option>
              </select>
              <button
                className=" border-mavi border border-solid p-2 rounded text-mavi bg-mavi bg-opacity-15 hover:font-medium"
                onClick={handleAddTodo}
              >
                Ekle
              </button>
            </div>
          </div>
        </aside>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </body>
  );
}