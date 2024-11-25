import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','firstName','lastName','imageUrl','createdAt','updatedAt']);

export const PRDScalarFieldEnumSchema = z.enum(['id','title','description','techStack','content','createdAt','updatedAt','published','userId']);

export const PageScalarFieldEnumSchema = z.enum(['id','name','prdId']);

export const FunctionScalarFieldEnumSchema = z.enum(['id','name','pageId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PRD SCHEMA
/////////////////////////////////////////

export const PRDSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  techStack: z.string().array(),
  content: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  published: z.boolean(),
  userId: z.string(),
})

export type PRD = z.infer<typeof PRDSchema>

/////////////////////////////////////////
// PAGE SCHEMA
/////////////////////////////////////////

export const PageSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  prdId: z.string(),
})

export type Page = z.infer<typeof PageSchema>

/////////////////////////////////////////
// FUNCTION SCHEMA
/////////////////////////////////////////

export const FunctionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  pageId: z.string(),
})

export type Function = z.infer<typeof FunctionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  prds: z.union([z.boolean(),z.lazy(() => PRDFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  prds: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  prds: z.union([z.boolean(),z.lazy(() => PRDFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRD
//------------------------------------------------------

export const PRDIncludeSchema: z.ZodType<Prisma.PRDInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pages: z.union([z.boolean(),z.lazy(() => PageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PRDCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PRDArgsSchema: z.ZodType<Prisma.PRDDefaultArgs> = z.object({
  select: z.lazy(() => PRDSelectSchema).optional(),
  include: z.lazy(() => PRDIncludeSchema).optional(),
}).strict();

export const PRDCountOutputTypeArgsSchema: z.ZodType<Prisma.PRDCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PRDCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PRDCountOutputTypeSelectSchema: z.ZodType<Prisma.PRDCountOutputTypeSelect> = z.object({
  pages: z.boolean().optional(),
}).strict();

export const PRDSelectSchema: z.ZodType<Prisma.PRDSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  techStack: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  published: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pages: z.union([z.boolean(),z.lazy(() => PageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PRDCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PAGE
//------------------------------------------------------

export const PageIncludeSchema: z.ZodType<Prisma.PageInclude> = z.object({
  functions: z.union([z.boolean(),z.lazy(() => FunctionFindManyArgsSchema)]).optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PageArgsSchema: z.ZodType<Prisma.PageDefaultArgs> = z.object({
  select: z.lazy(() => PageSelectSchema).optional(),
  include: z.lazy(() => PageIncludeSchema).optional(),
}).strict();

export const PageCountOutputTypeArgsSchema: z.ZodType<Prisma.PageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PageCountOutputTypeSelectSchema: z.ZodType<Prisma.PageCountOutputTypeSelect> = z.object({
  functions: z.boolean().optional(),
}).strict();

export const PageSelectSchema: z.ZodType<Prisma.PageSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  prdId: z.boolean().optional(),
  functions: z.union([z.boolean(),z.lazy(() => FunctionFindManyArgsSchema)]).optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PageCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FUNCTION
//------------------------------------------------------

export const FunctionIncludeSchema: z.ZodType<Prisma.FunctionInclude> = z.object({
  page: z.union([z.boolean(),z.lazy(() => PageArgsSchema)]).optional(),
}).strict()

export const FunctionArgsSchema: z.ZodType<Prisma.FunctionDefaultArgs> = z.object({
  select: z.lazy(() => FunctionSelectSchema).optional(),
  include: z.lazy(() => FunctionIncludeSchema).optional(),
}).strict();

export const FunctionSelectSchema: z.ZodType<Prisma.FunctionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  pageId: z.boolean().optional(),
  page: z.union([z.boolean(),z.lazy(() => PageArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prds: z.lazy(() => PRDListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  prds: z.lazy(() => PRDOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prds: z.lazy(() => PRDListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PRDWhereInputSchema: z.ZodType<Prisma.PRDWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  pages: z.lazy(() => PageListRelationFilterSchema).optional()
}).strict();

export const PRDOrderByWithRelationInputSchema: z.ZodType<Prisma.PRDOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  pages: z.lazy(() => PageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PRDWhereUniqueInputSchema: z.ZodType<Prisma.PRDWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  pages: z.lazy(() => PageListRelationFilterSchema).optional()
}).strict());

export const PRDOrderByWithAggregationInputSchema: z.ZodType<Prisma.PRDOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PRDCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PRDMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PRDMinOrderByAggregateInputSchema).optional()
}).strict();

export const PRDScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PRDScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PRDScalarWhereWithAggregatesInputSchema),z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDScalarWhereWithAggregatesInputSchema),z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PageWhereInputSchema: z.ZodType<Prisma.PageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PageWhereInputSchema),z.lazy(() => PageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PageWhereInputSchema),z.lazy(() => PageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  functions: z.lazy(() => FunctionListRelationFilterSchema).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict();

export const PageOrderByWithRelationInputSchema: z.ZodType<Prisma.PageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  functions: z.lazy(() => FunctionOrderByRelationAggregateInputSchema).optional(),
  prd: z.lazy(() => PRDOrderByWithRelationInputSchema).optional()
}).strict();

export const PageWhereUniqueInputSchema: z.ZodType<Prisma.PageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PageWhereInputSchema),z.lazy(() => PageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PageWhereInputSchema),z.lazy(() => PageWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  functions: z.lazy(() => FunctionListRelationFilterSchema).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict());

export const PageOrderByWithAggregationInputSchema: z.ZodType<Prisma.PageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PageMinOrderByAggregateInputSchema).optional()
}).strict();

export const PageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PageScalarWhereWithAggregatesInputSchema),z.lazy(() => PageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PageScalarWhereWithAggregatesInputSchema),z.lazy(() => PageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FunctionWhereInputSchema: z.ZodType<Prisma.FunctionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FunctionWhereInputSchema),z.lazy(() => FunctionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FunctionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FunctionWhereInputSchema),z.lazy(() => FunctionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  page: z.union([ z.lazy(() => PageRelationFilterSchema),z.lazy(() => PageWhereInputSchema) ]).optional(),
}).strict();

export const FunctionOrderByWithRelationInputSchema: z.ZodType<Prisma.FunctionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  pageId: z.lazy(() => SortOrderSchema).optional(),
  page: z.lazy(() => PageOrderByWithRelationInputSchema).optional()
}).strict();

export const FunctionWhereUniqueInputSchema: z.ZodType<Prisma.FunctionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FunctionWhereInputSchema),z.lazy(() => FunctionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FunctionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FunctionWhereInputSchema),z.lazy(() => FunctionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  page: z.union([ z.lazy(() => PageRelationFilterSchema),z.lazy(() => PageWhereInputSchema) ]).optional(),
}).strict());

export const FunctionOrderByWithAggregationInputSchema: z.ZodType<Prisma.FunctionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  pageId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FunctionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FunctionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FunctionMinOrderByAggregateInputSchema).optional()
}).strict();

export const FunctionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FunctionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FunctionScalarWhereWithAggregatesInputSchema),z.lazy(() => FunctionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FunctionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FunctionScalarWhereWithAggregatesInputSchema),z.lazy(() => FunctionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pageId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDCreateInputSchema: z.ZodType<Prisma.PRDCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  pages: z.lazy(() => PageCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateInputSchema: z.ZodType<Prisma.PRDUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  userId: z.string(),
  pages: z.lazy(() => PageUncheckedCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDUpdateInputSchema: z.ZodType<Prisma.PRDUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  pages: z.lazy(() => PageUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pages: z.lazy(() => PageUncheckedUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDCreateManyInputSchema: z.ZodType<Prisma.PRDCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  userId: z.string()
}).strict();

export const PRDUpdateManyMutationInputSchema: z.ZodType<Prisma.PRDUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PageCreateInputSchema: z.ZodType<Prisma.PageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  functions: z.lazy(() => FunctionCreateNestedManyWithoutPageInputSchema).optional(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutPagesInputSchema)
}).strict();

export const PageUncheckedCreateInputSchema: z.ZodType<Prisma.PageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  prdId: z.string(),
  functions: z.lazy(() => FunctionUncheckedCreateNestedManyWithoutPageInputSchema).optional()
}).strict();

export const PageUpdateInputSchema: z.ZodType<Prisma.PageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  functions: z.lazy(() => FunctionUpdateManyWithoutPageNestedInputSchema).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutPagesNestedInputSchema).optional()
}).strict();

export const PageUncheckedUpdateInputSchema: z.ZodType<Prisma.PageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  functions: z.lazy(() => FunctionUncheckedUpdateManyWithoutPageNestedInputSchema).optional()
}).strict();

export const PageCreateManyInputSchema: z.ZodType<Prisma.PageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  prdId: z.string()
}).strict();

export const PageUpdateManyMutationInputSchema: z.ZodType<Prisma.PageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionCreateInputSchema: z.ZodType<Prisma.FunctionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  page: z.lazy(() => PageCreateNestedOneWithoutFunctionsInputSchema)
}).strict();

export const FunctionUncheckedCreateInputSchema: z.ZodType<Prisma.FunctionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  pageId: z.string()
}).strict();

export const FunctionUpdateInputSchema: z.ZodType<Prisma.FunctionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  page: z.lazy(() => PageUpdateOneRequiredWithoutFunctionsNestedInputSchema).optional()
}).strict();

export const FunctionUncheckedUpdateInputSchema: z.ZodType<Prisma.FunctionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionCreateManyInputSchema: z.ZodType<Prisma.FunctionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  pageId: z.string()
}).strict();

export const FunctionUpdateManyMutationInputSchema: z.ZodType<Prisma.FunctionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FunctionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PRDListRelationFilterSchema: z.ZodType<Prisma.PRDListRelationFilter> = z.object({
  every: z.lazy(() => PRDWhereInputSchema).optional(),
  some: z.lazy(() => PRDWhereInputSchema).optional(),
  none: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PRDOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PRDOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PageListRelationFilterSchema: z.ZodType<Prisma.PageListRelationFilter> = z.object({
  every: z.lazy(() => PageWhereInputSchema).optional(),
  some: z.lazy(() => PageWhereInputSchema).optional(),
  none: z.lazy(() => PageWhereInputSchema).optional()
}).strict();

export const PageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDCountOrderByAggregateInputSchema: z.ZodType<Prisma.PRDCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PRDMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDMinOrderByAggregateInputSchema: z.ZodType<Prisma.PRDMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FunctionListRelationFilterSchema: z.ZodType<Prisma.FunctionListRelationFilter> = z.object({
  every: z.lazy(() => FunctionWhereInputSchema).optional(),
  some: z.lazy(() => FunctionWhereInputSchema).optional(),
  none: z.lazy(() => FunctionWhereInputSchema).optional()
}).strict();

export const PRDRelationFilterSchema: z.ZodType<Prisma.PRDRelationFilter> = z.object({
  is: z.lazy(() => PRDWhereInputSchema).optional(),
  isNot: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const FunctionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FunctionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PageCountOrderByAggregateInputSchema: z.ZodType<Prisma.PageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PageMinOrderByAggregateInputSchema: z.ZodType<Prisma.PageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PageRelationFilterSchema: z.ZodType<Prisma.PageRelationFilter> = z.object({
  is: z.lazy(() => PageWhereInputSchema).optional(),
  isNot: z.lazy(() => PageWhereInputSchema).optional()
}).strict();

export const FunctionCountOrderByAggregateInputSchema: z.ZodType<Prisma.FunctionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  pageId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FunctionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FunctionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  pageId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FunctionMinOrderByAggregateInputSchema: z.ZodType<Prisma.FunctionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  pageId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PRDCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDCreateWithoutUserInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema),z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PRDUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PRDUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDCreateWithoutUserInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema),z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PRDUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PRDUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDCreateWithoutUserInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema),z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PRDUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PRDUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PRDUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PRDUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PRDUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PRDUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PRDUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDCreateWithoutUserInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema),z.lazy(() => PRDCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PRDUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PRDUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PRDUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PRDUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PRDUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PRDUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PRDCreatetechStackInputSchema: z.ZodType<Prisma.PRDCreatetechStackInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPrdsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrdsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PageCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.PageCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageCreateWithoutPrdInputSchema).array(),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema),z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PageCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PageUncheckedCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.PageUncheckedCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageCreateWithoutPrdInputSchema).array(),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema),z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PageCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PRDUpdatetechStackInputSchema: z.ZodType<Prisma.PRDUpdatetechStackInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutPrdsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPrdsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrdsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPrdsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPrdsInputSchema),z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]).optional(),
}).strict();

export const PageUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.PageUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageCreateWithoutPrdInputSchema).array(),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema),z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PageUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => PageUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PageCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PageUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => PageUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PageUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => PageUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PageScalarWhereInputSchema),z.lazy(() => PageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PageUncheckedUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.PageUncheckedUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageCreateWithoutPrdInputSchema).array(),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema),z.lazy(() => PageCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PageUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => PageUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PageCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PageWhereUniqueInputSchema),z.lazy(() => PageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PageUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => PageUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PageUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => PageUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PageScalarWhereInputSchema),z.lazy(() => PageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FunctionCreateNestedManyWithoutPageInputSchema: z.ZodType<Prisma.FunctionCreateNestedManyWithoutPageInput> = z.object({
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionCreateWithoutPageInputSchema).array(),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema),z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FunctionCreateManyPageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PRDCreateNestedOneWithoutPagesInputSchema: z.ZodType<Prisma.PRDCreateNestedOneWithoutPagesInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedCreateWithoutPagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutPagesInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional()
}).strict();

export const FunctionUncheckedCreateNestedManyWithoutPageInputSchema: z.ZodType<Prisma.FunctionUncheckedCreateNestedManyWithoutPageInput> = z.object({
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionCreateWithoutPageInputSchema).array(),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema),z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FunctionCreateManyPageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FunctionUpdateManyWithoutPageNestedInputSchema: z.ZodType<Prisma.FunctionUpdateManyWithoutPageNestedInput> = z.object({
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionCreateWithoutPageInputSchema).array(),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema),z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FunctionUpsertWithWhereUniqueWithoutPageInputSchema),z.lazy(() => FunctionUpsertWithWhereUniqueWithoutPageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FunctionCreateManyPageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FunctionUpdateWithWhereUniqueWithoutPageInputSchema),z.lazy(() => FunctionUpdateWithWhereUniqueWithoutPageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FunctionUpdateManyWithWhereWithoutPageInputSchema),z.lazy(() => FunctionUpdateManyWithWhereWithoutPageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FunctionScalarWhereInputSchema),z.lazy(() => FunctionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PRDUpdateOneRequiredWithoutPagesNestedInputSchema: z.ZodType<Prisma.PRDUpdateOneRequiredWithoutPagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedCreateWithoutPagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutPagesInputSchema).optional(),
  upsert: z.lazy(() => PRDUpsertWithoutPagesInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PRDUpdateToOneWithWhereWithoutPagesInputSchema),z.lazy(() => PRDUpdateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutPagesInputSchema) ]).optional(),
}).strict();

export const FunctionUncheckedUpdateManyWithoutPageNestedInputSchema: z.ZodType<Prisma.FunctionUncheckedUpdateManyWithoutPageNestedInput> = z.object({
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionCreateWithoutPageInputSchema).array(),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema),z.lazy(() => FunctionCreateOrConnectWithoutPageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FunctionUpsertWithWhereUniqueWithoutPageInputSchema),z.lazy(() => FunctionUpsertWithWhereUniqueWithoutPageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FunctionCreateManyPageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FunctionWhereUniqueInputSchema),z.lazy(() => FunctionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FunctionUpdateWithWhereUniqueWithoutPageInputSchema),z.lazy(() => FunctionUpdateWithWhereUniqueWithoutPageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FunctionUpdateManyWithWhereWithoutPageInputSchema),z.lazy(() => FunctionUpdateManyWithWhereWithoutPageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FunctionScalarWhereInputSchema),z.lazy(() => FunctionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PageCreateNestedOneWithoutFunctionsInputSchema: z.ZodType<Prisma.PageCreateNestedOneWithoutFunctionsInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedCreateWithoutFunctionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PageCreateOrConnectWithoutFunctionsInputSchema).optional(),
  connect: z.lazy(() => PageWhereUniqueInputSchema).optional()
}).strict();

export const PageUpdateOneRequiredWithoutFunctionsNestedInputSchema: z.ZodType<Prisma.PageUpdateOneRequiredWithoutFunctionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PageCreateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedCreateWithoutFunctionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PageCreateOrConnectWithoutFunctionsInputSchema).optional(),
  upsert: z.lazy(() => PageUpsertWithoutFunctionsInputSchema).optional(),
  connect: z.lazy(() => PageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PageUpdateToOneWithWhereWithoutFunctionsInputSchema),z.lazy(() => PageUpdateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedUpdateWithoutFunctionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const PRDCreateWithoutUserInputSchema: z.ZodType<Prisma.PRDCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  pages: z.lazy(() => PageCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  pages: z.lazy(() => PageUncheckedCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PRDCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PRDCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PRDCreateManyUserInputSchema),z.lazy(() => PRDCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PRDUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PRDUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PRDUpdateWithoutUserInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutUserInputSchema),z.lazy(() => PRDUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PRDUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PRDUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PRDUpdateWithoutUserInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PRDUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PRDUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PRDScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PRDUpdateManyMutationInputSchema),z.lazy(() => PRDUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PRDScalarWhereInputSchema: z.ZodType<Prisma.PRDScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateWithoutPrdsInput> = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPrdsInput> = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPrdsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]),
}).strict();

export const PageCreateWithoutPrdInputSchema: z.ZodType<Prisma.PageCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  functions: z.lazy(() => FunctionCreateNestedManyWithoutPageInputSchema).optional()
}).strict();

export const PageUncheckedCreateWithoutPrdInputSchema: z.ZodType<Prisma.PageUncheckedCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  functions: z.lazy(() => FunctionUncheckedCreateNestedManyWithoutPageInputSchema).optional()
}).strict();

export const PageCreateOrConnectWithoutPrdInputSchema: z.ZodType<Prisma.PageCreateOrConnectWithoutPrdInput> = z.object({
  where: z.lazy(() => PageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const PageCreateManyPrdInputEnvelopeSchema: z.ZodType<Prisma.PageCreateManyPrdInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PageCreateManyPrdInputSchema),z.lazy(() => PageCreateManyPrdInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPrdsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPrdsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPrdsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPrdsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PageUpsertWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.PageUpsertWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => PageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PageUpdateWithoutPrdInputSchema),z.lazy(() => PageUncheckedUpdateWithoutPrdInputSchema) ]),
  create: z.union([ z.lazy(() => PageCreateWithoutPrdInputSchema),z.lazy(() => PageUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const PageUpdateWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.PageUpdateWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => PageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PageUpdateWithoutPrdInputSchema),z.lazy(() => PageUncheckedUpdateWithoutPrdInputSchema) ]),
}).strict();

export const PageUpdateManyWithWhereWithoutPrdInputSchema: z.ZodType<Prisma.PageUpdateManyWithWhereWithoutPrdInput> = z.object({
  where: z.lazy(() => PageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PageUpdateManyMutationInputSchema),z.lazy(() => PageUncheckedUpdateManyWithoutPrdInputSchema) ]),
}).strict();

export const PageScalarWhereInputSchema: z.ZodType<Prisma.PageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PageScalarWhereInputSchema),z.lazy(() => PageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PageScalarWhereInputSchema),z.lazy(() => PageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FunctionCreateWithoutPageInputSchema: z.ZodType<Prisma.FunctionCreateWithoutPageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FunctionUncheckedCreateWithoutPageInputSchema: z.ZodType<Prisma.FunctionUncheckedCreateWithoutPageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FunctionCreateOrConnectWithoutPageInputSchema: z.ZodType<Prisma.FunctionCreateOrConnectWithoutPageInput> = z.object({
  where: z.lazy(() => FunctionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema) ]),
}).strict();

export const FunctionCreateManyPageInputEnvelopeSchema: z.ZodType<Prisma.FunctionCreateManyPageInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FunctionCreateManyPageInputSchema),z.lazy(() => FunctionCreateManyPageInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PRDCreateWithoutPagesInputSchema: z.ZodType<Prisma.PRDCreateWithoutPagesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema)
}).strict();

export const PRDUncheckedCreateWithoutPagesInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutPagesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  userId: z.string()
}).strict();

export const PRDCreateOrConnectWithoutPagesInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutPagesInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedCreateWithoutPagesInputSchema) ]),
}).strict();

export const FunctionUpsertWithWhereUniqueWithoutPageInputSchema: z.ZodType<Prisma.FunctionUpsertWithWhereUniqueWithoutPageInput> = z.object({
  where: z.lazy(() => FunctionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FunctionUpdateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedUpdateWithoutPageInputSchema) ]),
  create: z.union([ z.lazy(() => FunctionCreateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedCreateWithoutPageInputSchema) ]),
}).strict();

export const FunctionUpdateWithWhereUniqueWithoutPageInputSchema: z.ZodType<Prisma.FunctionUpdateWithWhereUniqueWithoutPageInput> = z.object({
  where: z.lazy(() => FunctionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FunctionUpdateWithoutPageInputSchema),z.lazy(() => FunctionUncheckedUpdateWithoutPageInputSchema) ]),
}).strict();

export const FunctionUpdateManyWithWhereWithoutPageInputSchema: z.ZodType<Prisma.FunctionUpdateManyWithWhereWithoutPageInput> = z.object({
  where: z.lazy(() => FunctionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FunctionUpdateManyMutationInputSchema),z.lazy(() => FunctionUncheckedUpdateManyWithoutPageInputSchema) ]),
}).strict();

export const FunctionScalarWhereInputSchema: z.ZodType<Prisma.FunctionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FunctionScalarWhereInputSchema),z.lazy(() => FunctionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FunctionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FunctionScalarWhereInputSchema),z.lazy(() => FunctionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PRDUpsertWithoutPagesInputSchema: z.ZodType<Prisma.PRDUpsertWithoutPagesInput> = z.object({
  update: z.union([ z.lazy(() => PRDUpdateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutPagesInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedCreateWithoutPagesInputSchema) ]),
  where: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const PRDUpdateToOneWithWhereWithoutPagesInputSchema: z.ZodType<Prisma.PRDUpdateToOneWithWhereWithoutPagesInput> = z.object({
  where: z.lazy(() => PRDWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PRDUpdateWithoutPagesInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutPagesInputSchema) ]),
}).strict();

export const PRDUpdateWithoutPagesInputSchema: z.ZodType<Prisma.PRDUpdateWithoutPagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutPagesInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutPagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PageCreateWithoutFunctionsInputSchema: z.ZodType<Prisma.PageCreateWithoutFunctionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutPagesInputSchema)
}).strict();

export const PageUncheckedCreateWithoutFunctionsInputSchema: z.ZodType<Prisma.PageUncheckedCreateWithoutFunctionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  prdId: z.string()
}).strict();

export const PageCreateOrConnectWithoutFunctionsInputSchema: z.ZodType<Prisma.PageCreateOrConnectWithoutFunctionsInput> = z.object({
  where: z.lazy(() => PageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PageCreateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedCreateWithoutFunctionsInputSchema) ]),
}).strict();

export const PageUpsertWithoutFunctionsInputSchema: z.ZodType<Prisma.PageUpsertWithoutFunctionsInput> = z.object({
  update: z.union([ z.lazy(() => PageUpdateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedUpdateWithoutFunctionsInputSchema) ]),
  create: z.union([ z.lazy(() => PageCreateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedCreateWithoutFunctionsInputSchema) ]),
  where: z.lazy(() => PageWhereInputSchema).optional()
}).strict();

export const PageUpdateToOneWithWhereWithoutFunctionsInputSchema: z.ZodType<Prisma.PageUpdateToOneWithWhereWithoutFunctionsInput> = z.object({
  where: z.lazy(() => PageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PageUpdateWithoutFunctionsInputSchema),z.lazy(() => PageUncheckedUpdateWithoutFunctionsInputSchema) ]),
}).strict();

export const PageUpdateWithoutFunctionsInputSchema: z.ZodType<Prisma.PageUpdateWithoutFunctionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutPagesNestedInputSchema).optional()
}).strict();

export const PageUncheckedUpdateWithoutFunctionsInputSchema: z.ZodType<Prisma.PageUncheckedUpdateWithoutFunctionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDCreateManyUserInputSchema: z.ZodType<Prisma.PRDCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional()
}).strict();

export const PRDUpdateWithoutUserInputSchema: z.ZodType<Prisma.PRDUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pages: z.lazy(() => PageUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pages: z.lazy(() => PageUncheckedUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PageCreateManyPrdInputSchema: z.ZodType<Prisma.PageCreateManyPrdInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PageUpdateWithoutPrdInputSchema: z.ZodType<Prisma.PageUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  functions: z.lazy(() => FunctionUpdateManyWithoutPageNestedInputSchema).optional()
}).strict();

export const PageUncheckedUpdateWithoutPrdInputSchema: z.ZodType<Prisma.PageUncheckedUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  functions: z.lazy(() => FunctionUncheckedUpdateManyWithoutPageNestedInputSchema).optional()
}).strict();

export const PageUncheckedUpdateManyWithoutPrdInputSchema: z.ZodType<Prisma.PageUncheckedUpdateManyWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionCreateManyPageInputSchema: z.ZodType<Prisma.FunctionCreateManyPageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FunctionUpdateWithoutPageInputSchema: z.ZodType<Prisma.FunctionUpdateWithoutPageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionUncheckedUpdateWithoutPageInputSchema: z.ZodType<Prisma.FunctionUncheckedUpdateWithoutPageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FunctionUncheckedUpdateManyWithoutPageInputSchema: z.ZodType<Prisma.FunctionUncheckedUpdateManyWithoutPageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const PRDFindFirstArgsSchema: z.ZodType<Prisma.PRDFindFirstArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PRDFindFirstOrThrowArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDFindManyArgsSchema: z.ZodType<Prisma.PRDFindManyArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDAggregateArgsSchema: z.ZodType<Prisma.PRDAggregateArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PRDGroupByArgsSchema: z.ZodType<Prisma.PRDGroupByArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithAggregationInputSchema.array(),PRDOrderByWithAggregationInputSchema ]).optional(),
  by: PRDScalarFieldEnumSchema.array(),
  having: PRDScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PRDFindUniqueArgsSchema: z.ZodType<Prisma.PRDFindUniqueArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PRDFindUniqueOrThrowArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PageFindFirstArgsSchema: z.ZodType<Prisma.PageFindFirstArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereInputSchema.optional(),
  orderBy: z.union([ PageOrderByWithRelationInputSchema.array(),PageOrderByWithRelationInputSchema ]).optional(),
  cursor: PageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PageScalarFieldEnumSchema,PageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PageFindFirstOrThrowArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereInputSchema.optional(),
  orderBy: z.union([ PageOrderByWithRelationInputSchema.array(),PageOrderByWithRelationInputSchema ]).optional(),
  cursor: PageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PageScalarFieldEnumSchema,PageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PageFindManyArgsSchema: z.ZodType<Prisma.PageFindManyArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereInputSchema.optional(),
  orderBy: z.union([ PageOrderByWithRelationInputSchema.array(),PageOrderByWithRelationInputSchema ]).optional(),
  cursor: PageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PageScalarFieldEnumSchema,PageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PageAggregateArgsSchema: z.ZodType<Prisma.PageAggregateArgs> = z.object({
  where: PageWhereInputSchema.optional(),
  orderBy: z.union([ PageOrderByWithRelationInputSchema.array(),PageOrderByWithRelationInputSchema ]).optional(),
  cursor: PageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PageGroupByArgsSchema: z.ZodType<Prisma.PageGroupByArgs> = z.object({
  where: PageWhereInputSchema.optional(),
  orderBy: z.union([ PageOrderByWithAggregationInputSchema.array(),PageOrderByWithAggregationInputSchema ]).optional(),
  by: PageScalarFieldEnumSchema.array(),
  having: PageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PageFindUniqueArgsSchema: z.ZodType<Prisma.PageFindUniqueArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereUniqueInputSchema,
}).strict() ;

export const PageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PageFindUniqueOrThrowArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereUniqueInputSchema,
}).strict() ;

export const FunctionFindFirstArgsSchema: z.ZodType<Prisma.FunctionFindFirstArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereInputSchema.optional(),
  orderBy: z.union([ FunctionOrderByWithRelationInputSchema.array(),FunctionOrderByWithRelationInputSchema ]).optional(),
  cursor: FunctionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FunctionScalarFieldEnumSchema,FunctionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FunctionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FunctionFindFirstOrThrowArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereInputSchema.optional(),
  orderBy: z.union([ FunctionOrderByWithRelationInputSchema.array(),FunctionOrderByWithRelationInputSchema ]).optional(),
  cursor: FunctionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FunctionScalarFieldEnumSchema,FunctionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FunctionFindManyArgsSchema: z.ZodType<Prisma.FunctionFindManyArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereInputSchema.optional(),
  orderBy: z.union([ FunctionOrderByWithRelationInputSchema.array(),FunctionOrderByWithRelationInputSchema ]).optional(),
  cursor: FunctionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FunctionScalarFieldEnumSchema,FunctionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FunctionAggregateArgsSchema: z.ZodType<Prisma.FunctionAggregateArgs> = z.object({
  where: FunctionWhereInputSchema.optional(),
  orderBy: z.union([ FunctionOrderByWithRelationInputSchema.array(),FunctionOrderByWithRelationInputSchema ]).optional(),
  cursor: FunctionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FunctionGroupByArgsSchema: z.ZodType<Prisma.FunctionGroupByArgs> = z.object({
  where: FunctionWhereInputSchema.optional(),
  orderBy: z.union([ FunctionOrderByWithAggregationInputSchema.array(),FunctionOrderByWithAggregationInputSchema ]).optional(),
  by: FunctionScalarFieldEnumSchema.array(),
  having: FunctionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FunctionFindUniqueArgsSchema: z.ZodType<Prisma.FunctionFindUniqueArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereUniqueInputSchema,
}).strict() ;

export const FunctionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FunctionFindUniqueOrThrowArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const PRDCreateArgsSchema: z.ZodType<Prisma.PRDCreateArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  data: z.union([ PRDCreateInputSchema,PRDUncheckedCreateInputSchema ]),
}).strict() ;

export const PRDUpsertArgsSchema: z.ZodType<Prisma.PRDUpsertArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
  create: z.union([ PRDCreateInputSchema,PRDUncheckedCreateInputSchema ]),
  update: z.union([ PRDUpdateInputSchema,PRDUncheckedUpdateInputSchema ]),
}).strict() ;

export const PRDCreateManyArgsSchema: z.ZodType<Prisma.PRDCreateManyArgs> = z.object({
  data: z.union([ PRDCreateManyInputSchema,PRDCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PRDCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PRDCreateManyAndReturnArgs> = z.object({
  data: z.union([ PRDCreateManyInputSchema,PRDCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PRDDeleteArgsSchema: z.ZodType<Prisma.PRDDeleteArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDUpdateArgsSchema: z.ZodType<Prisma.PRDUpdateArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  data: z.union([ PRDUpdateInputSchema,PRDUncheckedUpdateInputSchema ]),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDUpdateManyArgsSchema: z.ZodType<Prisma.PRDUpdateManyArgs> = z.object({
  data: z.union([ PRDUpdateManyMutationInputSchema,PRDUncheckedUpdateManyInputSchema ]),
  where: PRDWhereInputSchema.optional(),
}).strict() ;

export const PRDDeleteManyArgsSchema: z.ZodType<Prisma.PRDDeleteManyArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
}).strict() ;

export const PageCreateArgsSchema: z.ZodType<Prisma.PageCreateArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  data: z.union([ PageCreateInputSchema,PageUncheckedCreateInputSchema ]),
}).strict() ;

export const PageUpsertArgsSchema: z.ZodType<Prisma.PageUpsertArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereUniqueInputSchema,
  create: z.union([ PageCreateInputSchema,PageUncheckedCreateInputSchema ]),
  update: z.union([ PageUpdateInputSchema,PageUncheckedUpdateInputSchema ]),
}).strict() ;

export const PageCreateManyArgsSchema: z.ZodType<Prisma.PageCreateManyArgs> = z.object({
  data: z.union([ PageCreateManyInputSchema,PageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PageCreateManyAndReturnArgs> = z.object({
  data: z.union([ PageCreateManyInputSchema,PageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PageDeleteArgsSchema: z.ZodType<Prisma.PageDeleteArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  where: PageWhereUniqueInputSchema,
}).strict() ;

export const PageUpdateArgsSchema: z.ZodType<Prisma.PageUpdateArgs> = z.object({
  select: PageSelectSchema.optional(),
  include: PageIncludeSchema.optional(),
  data: z.union([ PageUpdateInputSchema,PageUncheckedUpdateInputSchema ]),
  where: PageWhereUniqueInputSchema,
}).strict() ;

export const PageUpdateManyArgsSchema: z.ZodType<Prisma.PageUpdateManyArgs> = z.object({
  data: z.union([ PageUpdateManyMutationInputSchema,PageUncheckedUpdateManyInputSchema ]),
  where: PageWhereInputSchema.optional(),
}).strict() ;

export const PageDeleteManyArgsSchema: z.ZodType<Prisma.PageDeleteManyArgs> = z.object({
  where: PageWhereInputSchema.optional(),
}).strict() ;

export const FunctionCreateArgsSchema: z.ZodType<Prisma.FunctionCreateArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  data: z.union([ FunctionCreateInputSchema,FunctionUncheckedCreateInputSchema ]),
}).strict() ;

export const FunctionUpsertArgsSchema: z.ZodType<Prisma.FunctionUpsertArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereUniqueInputSchema,
  create: z.union([ FunctionCreateInputSchema,FunctionUncheckedCreateInputSchema ]),
  update: z.union([ FunctionUpdateInputSchema,FunctionUncheckedUpdateInputSchema ]),
}).strict() ;

export const FunctionCreateManyArgsSchema: z.ZodType<Prisma.FunctionCreateManyArgs> = z.object({
  data: z.union([ FunctionCreateManyInputSchema,FunctionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FunctionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FunctionCreateManyAndReturnArgs> = z.object({
  data: z.union([ FunctionCreateManyInputSchema,FunctionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FunctionDeleteArgsSchema: z.ZodType<Prisma.FunctionDeleteArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  where: FunctionWhereUniqueInputSchema,
}).strict() ;

export const FunctionUpdateArgsSchema: z.ZodType<Prisma.FunctionUpdateArgs> = z.object({
  select: FunctionSelectSchema.optional(),
  include: FunctionIncludeSchema.optional(),
  data: z.union([ FunctionUpdateInputSchema,FunctionUncheckedUpdateInputSchema ]),
  where: FunctionWhereUniqueInputSchema,
}).strict() ;

export const FunctionUpdateManyArgsSchema: z.ZodType<Prisma.FunctionUpdateManyArgs> = z.object({
  data: z.union([ FunctionUpdateManyMutationInputSchema,FunctionUncheckedUpdateManyInputSchema ]),
  where: FunctionWhereInputSchema.optional(),
}).strict() ;

export const FunctionDeleteManyArgsSchema: z.ZodType<Prisma.FunctionDeleteManyArgs> = z.object({
  where: FunctionWhereInputSchema.optional(),
}).strict() ;