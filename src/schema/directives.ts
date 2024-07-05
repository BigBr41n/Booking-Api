import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function authDirective(directiveName: string) {
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.user) {
                throw new Error('Authentication required');
              }
              return resolve(source, args, context, info);
            };
          }
          return fieldConfig;
        },
      }),
  };
}

export function hasRoleDirective(directiveName: string) {
  return {
    hasRoleDirectiveTypeDefs: `directive @${directiveName}(role: String!) on FIELD_DEFINITION`,
    hasRoleDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const roleDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
          if (roleDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            const requiredRole = roleDirective['role'];
            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.user || context.user.role !== requiredRole) {
                throw new Error(`Must have role: ${requiredRole}`);
              }
              return resolve(source, args, context, info);
            };
          }
          return fieldConfig;
        },
      }),
  };
}