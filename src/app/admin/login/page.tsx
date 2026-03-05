"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: "",
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ניהול באפלו כהנוב</CardTitle>
          <CardDescription>הזן סיסמה כדי להיכנס</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
              />
            </div>
            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "מתחבר..." : "כניסה"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
