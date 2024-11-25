"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getPRD(id: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  console.log('Querying PRD with:', { id, userId });

  const prd = await prisma.pRD.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      techStack: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      userId: true,
      pages: {
        select: {
          id: true,
          name: true,
          functions: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });

  console.log('Raw PRD from database:', prd);
  console.log('Content length:', prd?.content?.length);
  console.log('Content type:', typeof prd?.content);
  console.log('Content value:', prd?.content);

  if (!prd) {
    throw new Error("PRD not found");
  }

  // Ensure content is a string and not truncated
  const sanitizedPRD = {
    ...prd,
    content: prd.content?.toString() || ""
  };

  console.log('Sanitized content length:', sanitizedPRD.content.length);
  console.log('Returning sanitized PRD');

  return sanitizedPRD;
}

export async function updatePRDContent(id: string, content: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const prd = await prisma.pRD.update({
    where: {
      id,
      userId,
    },
    data: {
      content,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/prd/${id}`);
  return prd;
}

export async function deletePRD(id: string) {
  console.log('Deleting PRD with id:', id);
  
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const deletedPRD = await prisma.pRD.delete({
      where: {
        id,
        userId, // Ensure the PRD belongs to the user
      },
    });

    console.log('Successfully deleted PRD:', deletedPRD);
    return deletedPRD;
  } catch (error) {
    console.error('Error deleting PRD:', error);
    throw error;
  }
}
