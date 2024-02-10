import { Camera } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 smpx-8 py-6">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-[calc(100vh-98px)] grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic fuga
            consequuntur dolorem veniam cum quibusdam accusamus laudantium,
            excepturi quae, perferendis delectus sed eos illum in numquam
            voluptatem sequi adipisci ipsam?
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}
