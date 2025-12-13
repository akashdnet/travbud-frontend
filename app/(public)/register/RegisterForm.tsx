"use client";

import { registerUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(registerUser, initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Photo handlers
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        })
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: state.message || "Registration successful! Please login.",
        className: "bg-green-500 text-white",
      });
      router.push("/login");
    } else if (state?.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <div className="relative min-h-screen w-full font-serif">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"

      />
      <div className="absolute inset-0 bg-black/10 hidden sm:block" />

      <div className="relative flex min-h-screen w-full items-center justify-center px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">
        <Card className="w-full max-w-lg shadow-2xl border border-gray-200 backdrop-blur-md bg-white/90">
          <CardContent className="space-y-4 py-6 px-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase mb-4">
              Create Account
            </h1>

            <form action={formAction} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  defaultValue="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="testuser@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  defaultValue="123456"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  defaultValue="123456"
                  required
                />
              </div>

              {/* Phone + Gender */}
              <div className="flex gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="contactNumber">Phone</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="Contact Number"
                    defaultValue="+8801234567890"
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Age + Photo */}
              <div className="flex gap-4 items-end">
                <div className="w-1/3 flex flex-col gap-1">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Age"
                    min="0"
                  />
                </div>
                <div className="w-2/3 flex flex-col gap-1">
                  <Label htmlFor="photo">Profile Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="photo"
                      name="image" // Changed to 'image' to match backend expectation if needed, or 'photo'
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                    {photoPreview && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {/* Bio & About & Interests hidden/optional or added as needed? 
                  The user sample didn't have them, but current app did. 
                  I'll add valid defaults or hidden fields if required, or simple textareas.
              */}

              {/* Address / Location */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="currentLocation">Address / Location</Label>
                <textarea
                  id="currentLocation"
                  name="currentLocation"
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your address"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-10 text-lg bg-green-600 hover:bg-green-700 text-white mt-2"
              >
                {isPending ? "Registering..." : "Register"}
              </Button>

              <p className="text-end text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}