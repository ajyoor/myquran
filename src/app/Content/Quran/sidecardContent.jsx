"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { TbReportOff } from "react-icons/tb";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const sidecardContent = () => {
  const pathname = usePathname();
  const linkID = pathname.split("/").slice(-1).join();
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const type = useParams();
  const triggerSurat = useRef(null);
  const triggerJuz = useRef(null);

  const getListSurat = async () => {
    try {
      await axios
        .get(`${url}quran/${type.slug[0] == "Surat" ? "surat" : "juz"}/semua`)
        .then((keys) => {
          setList(keys.data.data);
          setFilterList(keys.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getListSearch = (e) => {
    let val = e.target.value.toLowerCase();
    let notfound = ["Tidak ditemukan data"];
    const filteredItems = filterList.filter((key) =>
      `${type.slug[0] == "Surat" ? key.name_id : key.name}`
        .toLowerCase()
        .includes(val)
    );

    setList(filteredItems.length ? filteredItems : notfound);
  };

  const HandleClick = (type) => {
    type == "surat" ? triggerSurat.current.click() : triggerJuz.current.click();
  };

  useEffect(() => {
    getListSurat();
  }, [type]);

  return (
    <div className="flex relative">
      <Card className="w-fit pt-6 sticky h-full hidden lg:block">
        <CardContent>
          <Tabs defaultValue="surah" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="surah" onClick={() => HandleClick("surat")}>
                <Link href="/Content/Quran/Surat/1" ref={triggerSurat}>
                  Surat
                </Link>
              </TabsTrigger>
              <TabsTrigger value="juz" onClick={() => HandleClick("juz")}>
                <Link href="/Content/Quran/Juz/1" ref={triggerJuz}>
                  Juz
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="surah">
              <div className="flex w-full sm:w-auto max-w-sm items-center space-x-2 pb-2">
                <Input
                  type="email"
                  placeholder="Cari Nama Surat Al-Quran"
                  onChange={(e) => getListSearch(e)}
                />
              </div>
              <Card className="rounded-lg h-[480px]">
                <CardContent className="space-y-2 px-3 py-3">
                  {/* <div className=" flex  flex-col space-y-1 gap-5 h-[450px] w-[280px] scroll-smooth focus:scroll-auto overflow-auto hover:overflow-y-scroll snap-y scroll-card pr-[10px]"> */}
                  <div className=" flex  flex-col space-y-1 gap-5 h-[450px] w-[280px] scroll-smooth overflow-auto pr-[10px]">
                    {list ? (
                      list.map((key, index) => {
                        if (key.number) {
                          return (
                            <Link
                              href={`/Content/Quran/Surat/${key.number}`}
                              key={index}
                            >
                              <div
                                className={`flex items-center gap-7 scroll-pt-2 snap-start ${
                                  linkID == key.number ? "side-active" : ""
                                }`}
                              >
                                <div
                                  className={`selector-content w-[40px] h-[30px] ${
                                    linkID == key.number
                                      ? "bg-[#7ac4be]"
                                      : "bg-slate-800"
                                  } rounded-md rotate-45 ml-1 active relative`}
                                >
                                  <span className="flex items-center justify-center h-full rotate-[315deg] text-sm ">
                                    {key.number}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-[16px]">
                                      {key.name_id}
                                    </span>
                                    <span className="font-thin text-[14px]">
                                      {key.translation_id}
                                    </span>
                                  </div>
                                  <span className="font-thin text-[14px]">
                                    {key.name_short}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        } else {
                          return (
                            <div className="flex flex-col items-center justify-center m-auto text-[20px] font-bold gap-3">
                              <TbReportOff size="50px"></TbReportOff>
                              {key}
                            </div>
                          );
                        }
                      })
                    ) : (
                      <>
                        {new Array(8)
                          .fill(
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          )
                          .map((item) => {
                            return item;
                          })}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="juz">
              <div className="flex w-full sm:w-auto max-w-sm items-center space-x-2 pb-2">
                <Input
                  type="email"
                  placeholder="Cari Nomor Juz Al-Quran"
                  onChange={(e) => getListSearch(e)}
                />
              </div>
              <Card className="rounded-lg h-[480px]">
                <CardContent className="space-y-2 px-3 py-3">
                  {/* <div className=" flex  flex-col space-y-1 gap-5 h-[450px] w-[280px] scroll-smooth focus:scroll-auto overflow-auto hover:overflow-y-scroll snap-y scroll-card pr-[10px]"> */}
                  <div className=" flex  flex-col space-y-1 gap-5 h-[450px] w-[280px] scroll-smooth overflow-auto pr-[10px]">
                    {list ? (
                      list.map((key, index) => {
                        if (key.number) {
                          return (
                            <Link
                              href={`/Content/Quran/Juz/${key.number}`}
                              key={index}
                            >
                              <div
                                className={`flex items-center gap-7 scroll-pt-2 snap-start ${
                                  linkID == key.number ? "side-active" : ""
                                }`}
                              >
                                <div
                                  className={`selector-content w-[40px] h-[30px] ${
                                    linkID == key.number
                                      ? "bg-[#7ac4be]"
                                      : "bg-slate-800"
                                  } rounded-md rotate-45 ml-1 active relative`}
                                >
                                  <span className="flex items-center justify-center h-full rotate-[315deg] text-sm ">
                                    {key.number}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-[16px]">
                                      {key.name}
                                    </span>
                                    <span className="font-thin text-[14px]">
                                      {key.name_start_id} - {key.name_end_id}
                                    </span>
                                  </div>
                                  {/* <span className="font-thin text-[14px]">
                                  {key.name}
                                </span> */}
                                </div>
                              </div>
                            </Link>
                          );
                        } else {
                          return (
                            <div className="flex flex-col items-center justify-center m-auto text-[20px] font-bold gap-3">
                              <TbReportOff size="50px"></TbReportOff>
                              {key}
                            </div>
                          );
                        }
                      })
                    ) : (
                      <>
                        {new Array(8)
                          .fill(
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          )
                          .map((item) => {
                            return item;
                          })}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default sidecardContent;
