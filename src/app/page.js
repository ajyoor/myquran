import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <span>INI DASHBOARD</span>
      <Link href="/Content/Quran/Surat/1">to quran</Link>
      Show Toast
    </div>
  );
}
