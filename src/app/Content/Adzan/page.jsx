"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const page = () => {
  const [pencarian, setPencarian] = useState([]);
  const [adzan, setAdzan] = useState();
  const refSearch = useRef(null);

  const getAdzan = async (id = 1632) => {
    setPencarian();
    let date = new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T"));
    await axios
      .get(`${url}sholat/jadwal/${id}/${date}`)
      .then((key) => setAdzan(key.data.data));
  };

  const getDataSearchAdzan = async (val) => {
    await axios
      .get(`${url}sholat/kota/cari/${val}`)
      .then((key) => setPencarian(key.data.data));
  };

  const setSearchLokasi = async (key) => {
    getAdzan(key.id);
    refSearch.current.value = "";
  };

  useEffect(() => {
    getAdzan();
    console.log(refSearch);
  }, []);

  return (
    <div>
      <Card className="w-full pt-6 h-full">
        <CardContent className="flex flex-col text-left pt-8">
          {/* <div className="flex w-full sm:w-auto max-w-sm items-center space-x-2"> */}
          <Input
            className="w-full my-3"
            type="text"
            placeholder="Cari Wilayah Kota Anda"
            onChange={(e) => getDataSearchAdzan(e.target.value)}
            ref={refSearch}
          />
          {/* </div> */}
          {pencarian &&
            pencarian.map((key) => {
              return (
                <div
                  key={key.id}
                  className="cursor-pointer"
                  onClick={() => setSearchLokasi(key)}
                >
                  <span>{key.lokasi}</span>
                </div>
              );
            })}
          {adzan ? (
            <div className="flex gap-2 w-full">
              <Card className="rounded-[10px] w-full">
                <CardContent className="grid gap-4">
                  <span>
                    {adzan.lokasi} - {adzan.daerah}
                  </span>
                  {adzan.jadwal.tanggal}
                </CardContent>
              </Card>

              {/* <Card className="w-full rounded-[10px]">
                <CardContent className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Imsak</span> {adzan.jadwal.imsak}
                </div>
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Subuh</span> {adzan.jadwal.subuh}
                </div>
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Dzuhur</span> {adzan.jadwal.dzuhur}
                </div>
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Ashar</span> {adzan.jadwal.ashar}
                </div>
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Maghrib</span> {adzan.jadwal.maghrib}
                </div>
                <div className="font-bold text-lg border rounded flex flex-col w-[200px] h-[200px] items-center justify-center">
                  <span>Isya</span> {adzan.jadwal.isya}
                </div>
              </div>
              {/* </CardContent>
              </Card> */}
            </div>
          ) : (
            "loading..."
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
