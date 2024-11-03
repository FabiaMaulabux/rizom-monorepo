import { z } from 'zod';
import { coursesQuery, oauthQuery } from "./queries";
import { CollectionType } from './primitives';

export const QueryType = z.enum([
  "GET_REGISTRY_METADATA",
  "GET_REGISTRY_FROM_OAUTH",
  "FETCH_USER_RECORDS",
  "GET_COURSES"
])

export const querySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(QueryType.enum.GET_REGISTRY_METADATA),
    payload: z.object({ repository: z.string() })
  }),
  z.object({
    type: z.literal(QueryType.enum.FETCH_USER_RECORDS),
    payload: coursesQuery
  }),
  z.object({
    type: z.literal(QueryType.enum.GET_COURSES),
    payload: CollectionType
  }),
  z.object({
    type: z.literal(QueryType.enum.GET_REGISTRY_FROM_OAUTH),
    payload: oauthQuery
  })
])

export type Query = z.infer<typeof querySchema>
