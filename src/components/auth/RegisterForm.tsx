 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/api";
import { toast } from "sonner"; // ✅ ADD

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields ❌"); // ✅ validation
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌"); // ✅ replaced alert
      return;
    }

    try {
      await registerUser({ email, password });

      toast.success("Registration successful ✅"); // ✅ success

      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed ❌"); // ✅ error
    }
  };

  return (
    <Card className="w-[350px] shadow-xl rounded-2xl">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center">Register</h2>

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

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleRegister}>
          Register
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </CardContent>
    </Card>
  );
}