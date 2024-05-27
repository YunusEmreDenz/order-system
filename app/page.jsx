"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoMdArrowDropup, IoIosArrowDown } from "react-icons/io";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Footer from "@/components/Footer";
import orderData from "../order.json";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const noteListRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("2023-09-19");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [displayValue, setDisplayValue] = useState("Beklemede");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAddNote = () => {
    if (inputText.trim() !== "") {
      setNotes([
        ...notes,
        { id: Date.now(), text: inputText, date: selectedDate },
      ]);
      setInputText("");
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  useEffect(() => {
    if (noteListRef.current) {
      noteListRef.current.scrollTop = noteListRef.current.scrollHeight;
    }
  }, [notes]);

  const { order } = orderData;

  const totalOrderPrice = order.products
    .reduce((total, product) => {
      return total + parseFloat(product.total_price.replace(",", "."));
    }, 0)
    .toFixed(2);

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    setDisplayValue(selectedStatus);
  };

  const handleUpdate = () => {
    const newMessage = `Sipariş durumu güncellendi: ${selectedStatus}`;
    setNotes([
      ...notes,
      { id: Date.now(), text: newMessage, date: selectedDate },
    ]);
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
                <p className="text-white not-italic pl-1"> {displayValue}</p>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-siyah text-white w-full mt-1 p-2 italic text-left">
            Sipariş Detayları
          </h1>
          <div className="details-container">
            <div className="detail-item">
              <div>
                <p className="label">Yetkili İsim:</p>
              </div>
              <div>
                <p className="value">{order.authorized_name}</p>
              </div>
            </div>
            <div className="detail-item">
              <div>
                <p className="label">Firma İsmi:</p>
              </div>
              <div>
                <p className="value">{order.company_name}</p>
              </div>
            </div>
            <div className="detail-item">
              <div>
                <p className="label">Telefon:</p>
              </div>
              <div>
                <p className="value">{order.phone}</p>
              </div>
            </div>
            <div className="detail-item">
              <div>
                <p className="label">E-mail:</p>
              </div>
              <div>
                <p className="value">{order.email}</p>
              </div>
            </div>
            <div className="detail-item">
              <div>
                <p className="label">Adres:</p>
              </div>
              <div>
                <p className="value">{order.address}</p>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-siyah text-white w-full mt-1 p-2 italic text-left">
            Sipariş Durumunu Güncelle
          </h1>

          <div>
            <div className="container border rounded border-gray-300 input-area p-2">
              <div className="text-left">
                <label htmlFor="created_at">Genel</label>
                <div>
                  <div className="mt-1.5 text-gray-500">Oluşturulan tarih:</div>
                  <input
                    type="date"
                    id="created_at"
                    name="created_at"
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
                  className="bg-mavi p-1.5 rounded text-white  hover:border-mavi hover:text-mavi border border-maviease-in duration-200 hover:bg-opacity-15"
                  onClick={() => {
                    handleUpdateStatus();
                    handleUpdate();
                  }}
                >
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        </main>
        <aside className="right">
          <div
            className="border"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "726px",
            }}
          >
            <div className="container p-2 font-bold border border-l-0">
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
            <div
              className="border p-2"
              ref={noteListRef}
              style={{ maxHeight: "550px", overflowY: "auto", flex: "1" }}
            >
              <ul>
                <li className="my-1">
                  <div className="bg-kırmızı rounded-sm">
                    <div className="text-left p-3">
                      <div>PAYTR BİLDİRİMİ - Ödeme Kabul Edildi</div>
                      <div className="flex">
                        <div>Toplam Ödenen:</div>
                        <div className=" pl-1">₺{totalOrderPrice}</div>
                      </div>
                      <div className="flex">
                        <div>Ödenen:</div>
                        <div className=" pl-1">₺{totalOrderPrice}</div>
                      </div>
                      <div className="flex">
                        <div>Taksit Sayısı:</div>
                        <div className=" pl-1">
                          {orderData.order.paytr[0].single_payment}
                        </div>
                      </div>
                      <div>
                        <div>PayTR Sipariş Numarası:</div>
                        <div className="text-blue-600 underline">
                          {orderData.order.paytr[0].number}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {notes.map((note) => (
                  <li key={note.id}>
                    <div className=" flex my-1">
                      <div className="bg-kırmızı rounded-sm w-full text-left px-3 py-4">
                        {note.text}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-gray-600 text-xs flex justify-start px-3">
                        {note.date}
                      </div>
                      <div>
                        <button
                          className="text-red-600 text-xs flex justify-start"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          Notu sil
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
                onClick={handleAddNote}
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
