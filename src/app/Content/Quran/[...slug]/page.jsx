"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const url2 = process.env.NEXT_PUBLIC_BASE_URL_V2;
const imageStyleBgCard = {
  position: "absolute",
};
export default function Page() {
  const [dataID, setDataID] = useState();
  const type = useParams();
  const { toast } = useToast();

  const getSuratById = async () => {
    try {
      await axios
        .get(
          `${
            type.slug[0] == "Juz" ? `${url}quran/ayat/juz` : `${url2}api/surah`
          }/${type.slug[1]}`
        )
        .then((keys) => {
          setDataID(type.slug[0] == "Surat" ? keys.data : keys.data.data);
          // console.log(type.slug[0] == "Surat" ? keys.data : keys.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSuratById();
  }, [type]);

  return (
    <div className="flex flex-col px-5 overflow-auto h-[625px] w-full gap-2">
      <Card
        className={`${
          type.slug[0] != "Surat" && "hidden"
        } w-full rounded-2xl relative`}
      >
        {/* <Image
          src="/makkah_dark.png"
          // width={200}
          // height={100}
          alt="mekkah"
          style={imageStyleBgCard}
          fill={true}
        /> */}
        <CardContent className="m-auto pt-6">
          {dataID && type.slug[0] == "Surat" ? (
            <div className="flex flex-col">
              <span className="font-bold text-3xl text-center">
                {dataID?.nama_latin}
              </span>
              <span className="font- text-2xl text-center font-thin">
                {dataID?.nama}
              </span>
              {/* <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: `<span
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: ${dataID.deskripsi} }}
              />`,
                  });
                }}
              >
                Show Toast
              </Button> */}
              <audio>
                <source src={dataID?.audio} type="audio/mpeg"></source>
                <source></source>
              </audio>
            </div>
          ) : (
            <Skeleton className="h-[125px] rounded-xl" />
          )}
        </CardContent>
      </Card>
      <Card className="w-full rounded-2xl">
        <CardContent className="m-auto">
          {!dataID ? (
            <Skeleton className="h-screen mt-5 rounded-xl" />
          ) : type.slug[0] == "Surat" ? (
            dataID.ayat.map((key, index) => {
              return (
                <div className="flex flex-col gap-2 pt-3" key={index}>
                  <div className="flex gap-4 flex-row justify-end">
                    <span className="border text-center h-[20px] w-[20px] pt-[2px] rounded-[50%] text-[10px] mt-2">
                      {parseInt(key.nomor).toLocaleString("ar-u-nu-arab")}
                    </span>
                    <span className=" text-[28px]">{key.ar}</span>
                  </div>
                  <span
                    className="font-bold"
                    dangerouslySetInnerHTML={{ __html: key.tr }}
                  />
                  <span className="italic font-extralight">{key.idn}</span>
                </div>
              );
            })
          ) : (
            dataID.map((key, index) => {
              return (
                <div className="flex flex-col gap-2 pt-3" key={index}>
                  <div className="flex gap-4 flex-row justify-end">
                    <span className="border text-center h-[20px] w-[20px] pt-[2px] rounded-[50%] text-[10px] mt-2">
                      {parseInt(key.ayah).toLocaleString("ar-u-nu-arab")}
                    </span>
                    <span className=" text-[28px]">{key.arab}</span>
                  </div>
                  <span className="font-bold">{key.latin}</span>
                  <span className="italic font-extralight">{key.text}</span>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
