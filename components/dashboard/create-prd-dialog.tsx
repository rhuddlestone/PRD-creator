'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  pages: z.array(z.object({
    name: z.string().min(1, "Page name is required"),
    functions: z.array(z.string()).min(1, "At least one function is required")
  })).min(1, "At least one page is required")
});

interface CreatePRDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePRDDialog({ open, onOpenChange }: CreatePRDDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      pages: [{ name: "", functions: [""] }]
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // First, generate the PRD content using the LLM
      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!generateResponse.ok) {
        throw new Error("Failed to generate PRD content");
      }

      const { content } = await generateResponse.json();

      // Then create the PRD with the generated content
      const createResponse = await fetch("/api/prds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          content,
          userId: user.id,
        }),
      });

      if (!createResponse.ok) {
        throw new Error("Failed to create PRD");
      }

      const prd = await createResponse.json();
      router.push(`/prd/${prd.id}`);
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating PRD:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const addPage = () => {
    const pages = form.getValues("pages");
    form.setValue("pages", [...pages, { name: "", functions: [""] }]);
  };

  const removePage = (pageIndex: number) => {
    const pages = form.getValues("pages");
    form.setValue("pages", pages.filter((_, index) => index !== pageIndex));
  };

  const addFunction = (pageIndex: number) => {
    const pages = form.getValues("pages");
    const newPages = [...pages];
    newPages[pageIndex].functions.push("");
    form.setValue("pages", newPages);
  };

  const removeFunction = (pageIndex: number, functionIndex: number) => {
    const pages = form.getValues("pages");
    const newPages = [...pages];
    newPages[pageIndex].functions = newPages[pageIndex].functions.filter((_, index) => index !== functionIndex);
    form.setValue("pages", newPages);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New PRD</DialogTitle>
          <DialogDescription>
            Enter the details for your new project requirement document.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project and its requirements"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter technologies (e.g., React, Node.js, PostgreSQL)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Pages</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addPage}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Page
                </Button>
              </div>

              {form.watch("pages").map((page, pageIndex) => (
                <div key={pageIndex} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start gap-4">
                    <FormField
                      control={form.control}
                      name={`pages.${pageIndex}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Page Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter page name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removePage(pageIndex)}
                      className="mt-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <FormLabel>Functions</FormLabel>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addFunction(pageIndex)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Function
                      </Button>
                    </div>

                    {page.functions.map((_, functionIndex) => (
                      <div key={functionIndex} className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`pages.${pageIndex}.functions.${functionIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Enter function description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFunction(pageIndex, functionIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create PRD"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
