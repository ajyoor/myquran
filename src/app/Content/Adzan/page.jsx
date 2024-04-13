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

  const getAdzan = async () => {
    let date = new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T"));
    await axios
      .get(`${url}sholat/jadwal/1632/${date}`)
      .then((key) => setAdzan(key.data.data));
  };

  const getDataSearchAdzan = async (val) => {
    await axios
      .get(`${url}sholat/kota/cari/${val}`)
      .then((key) => console.log(key.data.data));
  };

  useEffect(() => {
    getAdzan();
  }, []);

  return (
    <div>
      ADZAN BOLO
      <Card className="w-full pt-6 h-full">
        <CardContent className="flex flex-col text-left overflow-auto h-[400px] pt-8">
          <div className="flex w-full sm:w-auto max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Cari Wilayah Kota Anda"
              onChange={(e) => getDataSearchAdzan(e.target.value)}
            />
            <Button type="submit" size="sm">
              {/* <Search className="sm:w-[20px]" /> */}
            </Button>
          </div>
          {pencarian
            ? pencarian.map((key, index) => {
                <div key={index}>
                  <span>{key.id}</span>
                  <span>{key.lokasi}</span>
                </div>;
              })
            : "loading search data...."}
          {adzan ? (
            <div className="flex flex-col gap-2">
              <span>
                {adzan.lokasi} - {adzan.daerah}
              </span>
              {adzan.jadwal.tanggal}
              <span className="font-bold text-lg">
                Imsak {adzan.jadwal.imsak}
              </span>
              <span className="font-bold text-lg">
                Subuh {adzan.jadwal.subuh}
              </span>
              <span className="font-bold text-lg">
                Dhuha {adzan.jadwal.dhuha}
              </span>
              <span className="font-bold text-lg">
                Dzuhur {adzan.jadwal.dzuhur}
              </span>
              <span className="font-bold text-lg">
                Ashar {adzan.jadwal.ashar}
              </span>
              <span className="font-bold text-lg">
                Maghrib {adzan.jadwal.maghrib}
              </span>
              <span className="font-bold text-lg">
                Isya {adzan.jadwal.isya}
              </span>
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
