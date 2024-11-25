import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeletePRDButton } from "./delete-prd-button";

interface PRD {
  id: string;
  title: string;
  description: string | null;
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface PRDListProps {
  initialPrds: PRD[];
}

export function PRDList({ initialPrds }: PRDListProps) {
  if (initialPrds.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No PRDs found. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {initialPrds.map((prd) => (
        <Card key={prd.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="mb-2">
                <Link href={`/prd/${prd.id}`} className="hover:underline">
                  {prd.title}
                </Link>
              </CardTitle>
              <CardDescription>
                Last updated {formatDistanceToNow(new Date(prd.updatedAt), { addSuffix: true })}
              </CardDescription>
            </div>
            <DeletePRDButton prdId={prd.id} />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {prd.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {prd.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
