"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const page = () => {
  const [kategori, setKategori] = useState([]);
  const [doa, setDoa] = useState([]);

  const getKategoriDoa = async () => {
    await axios
      .get(`${url}doa/sumber`)
      .then((key) => setKategori(key.data.data));
  };

  const getListDoaByKategori = async (kategori) => {
    console.log(kategori, " kategori selected");
    await axios
      .get(`${url}doa/sumber/${kategori}`)
      .then((key) => setDoa(key.data.data));
  };

  useEffect(() => {
    getKategoriDoa();
    getListDoaByKategori("quran");
  }, []);

  return (
    <div>
      <Card className="w-full pt-6 h-full">
        {kategori.length ? (
          <ToggleGroup type="single">
            {kategori.map((item, index) => {
              return (
                <ToggleGroupItem
                  key={index}
                  value={item}
                  aria-label="Toggle bold"
                  className="capitalize text-xl"
                  onClick={() => getListDoaByKategori(item)}
                >
                  {item}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        ) : (
          "loading..."
        )}
        <CardContent className="flex flex-col text-left overflow-auto h-[400px] pt-8">
          {doa.length
            ? doa.map((key, index) => {
                index++;
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="font-bold text-lg">
                      {index}. {key.judul}
                    </span>
                    <span className="font-bold text-xl text-right">
                      {key.arab}
                    </span>
                    <span className="italic text-lg font-thin text-right">
                      {key.indo}
                    </span>
                  </div>
                );
              })
            : "loading..."}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
