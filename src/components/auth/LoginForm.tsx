 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/api"; // ✅ FIX

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      const res = await loginUser({ email, password });

      const token = res.data?.accessToken || res.accessToken;

      localStorage.setItem("accessToken", token);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <Card className="w-[350px] shadow-xl rounded-2xl">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </CardContent>
    </Card>
  );
}