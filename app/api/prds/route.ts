import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { title, description, techStack, pages, content, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Convert techStack string to array if it's a string
    const techStackArray = typeof techStack === 'string' 
      ? techStack.split(',').map(tech => tech.trim())
      : techStack;

    // First create the PRD
    const prd = await prisma.pRD.create({
      data: {
        title,
        description,
        techStack: techStackArray,
        content,
        userId, 
      },
    });

    // Then create pages and functions for the PRD
    if (pages && Array.isArray(pages) && pages.length > 0) {
      await Promise.all(
        pages.map(async (page: { name: string; functions?: string[] }) => {
          if (!page.name) {
            console.error('Page name is required');
            return;
          }

          const pageData: Prisma.PageCreateInput = {
            name: page.name,
            prd: {
              connect: { id: prd.id }
            },
          };

          if (page.functions && Array.isArray(page.functions) && page.functions.length > 0) {
            pageData.functions = {
              createMany: {
                data: page.functions.map(func => ({
                  name: func,
                })),
              },
            };
          }

          await prisma.page.create({
            data: pageData,
          });
        })
      );
    }

    // Return the created PRD with its relations
    const createdPRD = await prisma.pRD.findUnique({
      where: { id: prd.id },
      include: {
        pages: {
          include: {
            functions: true,
          },
        },
      },
    });

    return NextResponse.json(createdPRD);
  } catch (error) {
    console.error('Error creating PRD:', error);
    return NextResponse.json(
      { error: 'Failed to create PRD' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const prds = await prisma.pRD.findMany({
      include: {
        pages: {
          include: {
            functions: true
          }
        }
      }
    });

    return NextResponse.json(prds);
  } catch (error) {
    console.error('Error fetching PRDs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PRDs' },
      { status: 500 }
    );
  }
}
