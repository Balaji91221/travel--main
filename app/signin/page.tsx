"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plane } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !showOTP) {
      try {
        // Trigger sign-up API to send OTP
        const response = await fetch('https://backend-travel-6gdg.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setShowOTP(true);
        } else {
          setError(data.message || 'Error sending OTP');
        }
      } catch {
        setError('Server error. Please try again later.');
      }
    } else if (showOTP) {
      try {
        // Verify OTP
        const response = await fetch('https://backend-travel-6gdg.onrender.com/api/auth/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email,password, otp }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("OTP verified, User signed up successfully!");
          setIsSignUp(false)
        } else {
          setError(data.message || 'OTP verification failed');
        }
      } catch {
        setError('Server error. Please try again later.');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   // Send login credentials to backend
    //   const response = await fetch('http://localhost:5000/api/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log('Login successful', data);
    //     // Handle successful login (e.g., store JWT, redirect)
    //   } else {
    //     setError(data.message || 'Login failed');
    //   }
    // } catch (err) {
    //   setError('Server error. Please try again later.');
    // }
    router.replace("/");
  };

  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Plane className="h-12 w-12 text-blue-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-blue-700">ExploreEase</CardTitle>
            <CardDescription className="text-center">Your personal travel planner for India</CardDescription>
          </CardHeader>
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>Sign Up</TabsTrigger>
              <TabsTrigger value="login" onClick={() => setIsSignUp(false)}>Login</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {!showOTP ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input id="otp" placeholder="Enter the OTP sent to your email/phone" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
                    {showOTP ? "Verify OTP" : "Sign Up"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="john@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </Card>
      </div>
    </main>
  );
}