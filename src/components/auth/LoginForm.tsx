"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <Card className="w-[350px] shadow-xl rounded-2xl">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button className="w-full">Login</Button>
      </CardContent>
    </Card>
  );
}