"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const StoreForm = () => {
  const FormSchema = z.object({
    name: z
      .string()
      .min(5, { message: "Name must be at least 5 characters long" })
      .max(50, { message: "Name can't exceed 50 characters" })
      .refine((value) => !!value, { message: "Name is required" }),
    owner: z
      .string()
      .min(5, { message: "Owner must be at least 5 characters long" })
      .max(50, { message: "Owner can't exceed 50 characters" })
      .refine((value) => !!value, { message: "Owner is required" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(600, { message: "Description can't exceed 600 characters" })
      .refine((value) => !!value, { message: "Description is required" }),
    location: z
      .string()
      .min(5, { message: "Location must be at least 5 characters long" })
      .max(100, { message: "Location can't exceed 100 characters" })
      .refine((value) => !!value, { message: "Location is required" }),
    category: z
      .string()
      .min(3, { message: "Category must be at least 3 characters long" })
      .max(50, { message: "Category can't exceed 50 characters" })
      .refine((value) => !!value, { message: "Category is required" }),
    logo: z
      .string()
      .refine((value) => !!value, { message: "Logo is required" }),
    website: z
      .string()
      .refine((value) => !!value, { message: "Website is required" }),
    isActive: z.boolean(),
    products: z.array(z.string()),
    createdBy: z.string(), // Assuming createdBy is a string, adjust if it's another type
  });
  type InputType = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <>
      <div className="flex  gap-4 justify-between ">
        <div className="w-1/2">
          <Label htmlFor="name">Store Name</Label>
          <Input placeholder="store name" id="name" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="owner">Store Owner</Label>
          <Input placeholder="store owner" id="owner" />
        </div>
      </div>
      <div className="flex  gap-4 justify-between my-2">
        <div className="w-1/2">
          <Label htmlFor="description">Description</Label>
          <Input placeholder="description" id="description" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="category">Category</Label>
          <Input placeholder="category" id="category" />
        </div>
      </div>
      <div className="flex  gap-4 justify-between my-2">
        <div className="w-1/2">
          <Label htmlFor="logo">Logo</Label>
          <Input placeholder="logourl" id="logo" disabled />
        </div>
        <div className="w-1/2">
          <Label htmlFor="website">Website URL</Label>
          <Input placeholder="website URL" id="website" />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Create</Button>
      </div>
    </>
  );
};

export default StoreForm;
