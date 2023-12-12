"use client";

import { Button} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

export interface BreadCrumbsProps {
  pathname: string;
}

export default function BreadCrumbs() {
  const pathname = usePathname();
  const replacedPathname = pathname.replace(/-/g, " "); // Replace all dashes with spaces
  const trimmedPathname = replacedPathname.replace(/^\//, ""); // Remove forward slash at the beginning
  const capitalizedPathname =
    trimmedPathname.charAt(0).toUpperCase() + trimmedPathname.slice(1);

  return (
    <div className="flex items-center gap-2 my-4">
      <Link href="/" className="flex items-center gap-2 group">
        <Button
          isIconOnly
          //   color="primary"
          variant="faded"
          aria-label="andle left"
          size="sm"
          className="group-hover:bg-primary group-hover:text-white text-primary"
        >
          <FaAngleLeft />
        </Button>
        Home
      </Link>
      <div className="">/ {capitalizedPathname}</div>
    </div>
  );
}
