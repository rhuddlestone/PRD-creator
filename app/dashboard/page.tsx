import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PRDList } from "@/components/dashboard/prd-list";
import { SearchBar } from "@/components/dashboard/search-bar";
import { CreatePRDButton } from "@/components/dashboard/create-prd-button";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const prds = await db.pRD.findMany({
    where: {
      userId
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your PRDs</h1>
          <p className="text-muted-foreground">
            Create and manage your project requirement documents
          </p>
        </div>
        <CreatePRDButton />
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>

      <PRDList initialPrds={prds} />
    </div>
  );
}
