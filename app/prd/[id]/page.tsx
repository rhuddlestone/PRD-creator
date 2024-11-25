'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, markdownShortcutPlugin, codeBlockPlugin, toolbarPlugin, BlockTypeSelect, BoldItalicUnderlineToggles, CreateLink, ListsToggle } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPRD, updatePRDContent, deletePRD } from "@/app/actions/prd";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PRDPage() {
  const params = useParams();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editorKey, setEditorKey] = useState(0); // Add key for forcing re-render
  const { toast } = useToast();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    async function loadPRD() {
      try {
        const prd = await getPRD(id);
        console.log('PRD received in component:', prd);
        
        if (prd && prd.content) {
          setContent(prd.content);
          setTitle(prd.title || "Untitled PRD");
          setEditorKey(prev => prev + 1);
        }
      } catch {
        console.error('Error loading PRD:');
        toast({
          title: "Error",
          description: "Failed to load PRD",
          variant: "destructive",
        });
      }
    }
    loadPRD();
  }, [id, toast]);

  const debouncedSave = debounce(async (newContent: string) => {
    setIsSaving(true);
    try {
      await updatePRDContent(id, newContent);
    } catch {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  const handleContentChange = (newContent: string) => {
    console.log('Content changed, new length:', newContent.length);
    if (newContent !== content) {
      console.log('Updating content state and saving...');
      setContent(newContent);
      debouncedSave(newContent);
    }
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete PRD with ID:', id);
      await deletePRD(id);
      toast({
        title: "Success",
        description: "PRD deleted successfully",
      });
      router.push('/');
    } catch {
      console.error('Error deleting PRD:');
      toast({
        title: "Error",
        description: "Failed to delete PRD",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2">
          <Button onClick={handleExport}>Export</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete PRD</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your PRD.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="text-2xl font-bold mb-4"
          />
        </div>
        <div className="h-[calc(100vh-250px)] w-full">
          <MDXEditor 
            key={editorKey}
            markdown={content || ''}
            onChange={handleContentChange}
            contentEditableClassName="prose max-w-full"
            placeholder="Start writing your PRD here..."
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              markdownShortcutPlugin(),
              codeBlockPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />
                    <CreateLink />
                    <ListsToggle />
                  </>
                )
              })
            ]}
          />
        </div>
      </Card>

      {isSaving && (
        <p className="text-sm text-muted-foreground mt-2">
          Saving changes...
        </p>
      )}
    </div>
  );
}
