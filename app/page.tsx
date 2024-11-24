"use client";

import React, { useState, useTransition } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdFileDownload } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateVCard } from "./actions/generate-vcard";
import { FormSchema } from "./schemas";

export default function HomePage() {
  const [vCardString, setVCardString] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      websiteUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const result = await generateVCard(values);
        if (result.error) {
          console.error(result.error);
        } else {
          setVCardString(result.data as string);
        }
      } catch (error) {
        console.error("An unexpected error occurred.", error);
      }
    });
  };

  const handleDownload = () => {
    if (!vCardString) return;

    const blob = new Blob([vCardString], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contact.vcf";
    link.click();

    // Perform cleanup after download
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto max-w-lg py-10">
      <h1 className="text-2xl font-bold text-center ">
        Generate Your QR Code vCard
      </h1>
      <h2 className="text-base font-semibold text-center mb-6">Created by Suleyman Can Simsek</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white shadow p-6 rounded-lg"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Doe"
                    type="text"
                  />
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
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="+1 (555) 555-5555"
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="https://example.com"
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Generating..." : "Generate vCard"}
          </Button>
        </form>
      </Form>
      {vCardString && (
        <div className="flex flex-col justify-center items-center mt-10 text-center">
          <h2 className="text-xl font-semibold mb-4">Your QR Code:</h2>
          <QRCodeCanvas value={vCardString} size={256} />
          <Button
            onClick={handleDownload}
            className="mt-4 flex items-center bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            <MdFileDownload />
            Download vCard
          </Button>
        </div>
      )}
    </div>
  );
}
