declare module 'graphql-upload' {
    import { GraphQLScalarType } from 'graphql';
  
    export const GraphQLUpload: GraphQLScalarType;
  
    export function graphqlUploadExpress(options?: {
      maxFieldSize?: number;
      maxFileSize?: number;
      maxFiles?: number;
    }): import('express').RequestHandler;
  }
  