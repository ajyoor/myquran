"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const url = process.env.NEXT_PUBLIC_BASE_URL;
export default function Home() {
  AOS.init();
  const [bacaan, setBacaan] = useState();

  const getBacaanRandom = async () => {
    await axios
      .get(`${url}quran/ayat/acak`)
      .then((item) => setBacaan(item.data.data));
  };

  useEffect(() => {
    getBacaanRandom();
  }, []);

  return (
    <div className="flex flex-col gap-5 h-screen flex-wrap m-auto justify-center items-center lg:w-[1000px] w-auto px-5 lg:px-0">
      {bacaan ? (
        <div className="border border-[#EEEEEE] rounded-2xl p-5 flex flex-col">
          <span
            className="clamp-main-title text-right text-[#FFD369]"
            data-aos="fade-down"
            data-aos-duration="3000"
          >
            {bacaan.ayat.arab}
          </span>
          {/* <span className="text-[20px] text-right">{bacaan.ayat.latin}</span> */}
          <span
            className="clamp-main-sub-title italic text-center py-4 font-bold text-[#393E46]"
            data-aos="fade-down"
            data-aos-duration="3000"
          >
            {bacaan.ayat.text}
          </span>
          <span
            className="text-center text-[20px] font-medium"
            data-aos="fade-down"
            data-aos-duration="3000"
          >
            Q.S {bacaan.info.surat.nama.id} : {bacaan.ayat.ayah} ({" "}
            {bacaan.info.surat.nama.ar})
          </span>
          <Link
            href="/Content/Quran/Surat/1"
            className="m-auto pt-5"
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <Button className="w-fit font-bold">Telusuri Al-Quran</Button>
          </Link>
        </div>
      ) : (
        "loading ..."
      )}
    </div>
  );
}
