import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Dashboardbtn from "./Dashboardbtn";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center container mx-auto">
        {/* Left side logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-emerald-500" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              CodeSync
          </span>
        </Link>

        {/* Right side - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-5 ml-auto">

            <Dashboardbtn/>
            <ModeToggle/>
            <UserButton/>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
