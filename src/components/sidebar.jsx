"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpen, LayoutDashboard, Clock, CookingPot } from "lucide-react";

const NavItems = [
  {
    icon: <LayoutDashboard />,
    link: "/",
  },
  {
    icon: <BookOpen />,
    link: "/Content/Quran/Surat/1",
  },
  {
    icon: <Clock />,
    link: "/Content/Adzan",
  },
  {
    icon: <CookingPot />,
    link: "/Content/Recipe",
  },
];

const sidebar = () => {
  const pathname = usePathname();
  const linkID = pathname.split("/").slice(1, 3)[1];

  return (
    <div className=" lg:flex hidden h-screen w-fit bg-gray-900 opacity-75 px-3 relative">
      <div className="rounded-corner-content"></div>
      <div className="flex items-center gap-10 flex-col m-auto">
        {NavItems.map((key, index) => {
          let urlActive = key.link.split("/").slice(2, 3)[0];
          index++;

          return (
            <Link
              className={`link ${linkID == urlActive ? "active" : ""}`}
              href={key.link}
              key={index}
            >
              <div className="border-2 rounded-lg p-3 dark:hover:bg-[#1D293B] hover:bg-yellow-300">
                {key.icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default sidebar;
