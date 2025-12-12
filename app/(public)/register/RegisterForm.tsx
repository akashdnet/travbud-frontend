"use client";

import { registerUser } from "@/actions/user";
import ImageUpload from "@/components/comp-545";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema, TRegister } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function RegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<TRegister>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: 0,
      gender: undefined,
      bio: "",
      about: "",
      currentLocation: "",
      contactNumber: "",
      travelInterests: "",
      visitedCountries: "",
    },
  });

  const onSubmit = async (values: TRegister) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Prepare structured data
      const userData: any = {
        name: values.name,
        email: values.email,
        password: values.password,
        age: Number(values.age),
        gender: values.gender,
      };

      if (values.bio) userData.bio = values.bio;
      if (values.about) userData.about = values.about;
      if (values.currentLocation) userData.currentLocation = values.currentLocation;
      if (values.contactNumber) userData.contactNumber = values.contactNumber;

      // Convert comma-separated strings to arrays
      if (values.travelInterests) {
        const interests = values.travelInterests.split(",").map(s => s.trim()).filter(s => s);
        if (interests.length > 0) userData.travelInterests = interests;
      }
      if (values.visitedCountries) {
        const countries = values.visitedCountries.split(",").map(s => s.trim()).filter(s => s);
        if (countries.length > 0) userData.visitedCountries = countries;
      }

      // Append all data fields to FormData
      Object.keys(userData).forEach(key => {
        if (Array.isArray(userData[key])) {
          // Append array items individually
          userData[key].forEach((item: string) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, userData[key]);
        }
      });

      // Append image if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await registerUser(formData);
      if (res?.success) {
        toast({
          title: "Success",
          description: "Registration successful! Please login.",
          className: "bg-green-500 text-white",
        });
        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: res?.message || "Registration failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto"
        encType="multipart/form-data"
      >
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Age & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Travel enthusiast" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* About */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About (Optional)</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  placeholder="Tell us about yourself..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current Location & Contact Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currentLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Location (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="New York, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Travel Interests */}
        <FormField
          control={form.control}
          name="travelInterests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Interests (Optional, comma separated)</FormLabel>
              <FormControl>
                <Input placeholder="Adventure, Culture, Beach" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Visited Countries */}
        <FormField
          control={form.control}
          name="visitedCountries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visited Countries (Optional, comma separated)</FormLabel>
              <FormControl>
                <Input placeholder="USA, Canada, Mexico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile Photo */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Profile Photo (Optional)
          </label>
          <ImageUpload
            onFileChange={(file) => setSelectedImage(file)}
          />
          {selectedImage && (
            <p className="text-sm text-slate-500">Selected: {selectedImage.name}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form >
  );
}
