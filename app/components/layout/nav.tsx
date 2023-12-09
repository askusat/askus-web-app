import React from "react";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between gap-[46px] font-semibold">
      <Image src="/logo-2.svg" alt="" width={132} height={29} />

      <div className="hidden lg:flex items-center gap-[46px]">
        <Link href="#" className="text-black hover:text-primary">
          Home
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Chat With Expert
        </Link>
        <Link href="/about" className="text-black hover:text-primary">
          About Us
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Help
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Register
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Sign In
        </Link>
      </div>

      <Button isIconOnly color="primary" aria-label="menu-button" className="lg:hidden">
        <FaBars size={24} />
      </Button>
    </nav>
  );
}
