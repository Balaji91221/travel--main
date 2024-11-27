"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plane, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface User {
  name: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null); // User state
  const [isLoading, setIsLoading] = useState(false); // Loading state for navigation
  const router = useRouter();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginRedirect = () => {
    setIsLoading(true);
    router.push("/signin");
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };


  // Reusable component for User Menu
  function UserMenu({ user, onLogout }: { user: User | null; onLogout: () => void }) {
    return user ? (
      <div className="flex items-center space-x-2">
        <span className="font-medium text-blue-700">{user.name}</span>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>
    ) : (
      <Button variant="outline" onClick={handleLoginRedirect} disabled={isLoading}>
        {isLoading ? "Redirecting..." : "Login / Sign Up"}
      </Button>
    );
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-700">ExploreEase</span>
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost" aria-label="Navigate to Home">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" aria-label="Navigate to About">
              About
            </Button>
          </Link>
          <Link href="/planning">
            <Button variant="ghost" aria-label="Navigate to Planning">
              Planning
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" aria-label="Navigate to Contact">
              Contact
            </Button>
          </Link>
          <UserMenu user={user} onLogout={handleLogout} />
        </nav>

        {/* Navigation for smaller screens */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/">
                <Button variant="ghost" aria-label="Navigate to Home">
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" aria-label="Navigate to About">
                  About
                </Button>
              </Link>
              <Link href="/planning">
                <Button variant="ghost" aria-label="Navigate to Planning">
                  Planning
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" aria-label="Navigate to Contact">
                  Contact
                </Button>
              </Link>
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
