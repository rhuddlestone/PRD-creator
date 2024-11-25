'use client';

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePRDDialog } from "./create-prd-dialog";

export function CreatePRDButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Create PRD
      </Button>
      <CreatePRDDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}
