"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDirective = authDirective;
exports.hasRoleDirective = hasRoleDirective;
const utils_1 = require("@graphql-tools/utils");
const graphql_1 = require("graphql");
function authDirective(directiveName) {
    return {
        authDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
        authDirectiveTransformer: (schema) => (0, utils_1.mapSchema)(schema, {
            [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                var _a;
                const authDirective = (_a = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)) === null || _a === void 0 ? void 0 : _a[0];
                if (authDirective) {
                    const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                    fieldConfig.resolve = function (source, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!context.user) {
                                throw new Error('Authentication required');
                            }
                            return resolve(source, args, context, info);
                        });
                    };
                }
                return fieldConfig;
            },
        }),
    };
}
function hasRoleDirective(directiveName) {
    return {
        hasRoleDirectiveTypeDefs: `directive @${directiveName}(role: String!) on FIELD_DEFINITION`,
        hasRoleDirectiveTransformer: (schema) => (0, utils_1.mapSchema)(schema, {
            [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                var _a;
                const roleDirective = (_a = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)) === null || _a === void 0 ? void 0 : _a[0];
                if (roleDirective) {
                    const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                    const requiredRole = roleDirective['role'];
                    fieldConfig.resolve = function (source, args, context, info) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!context.user || context.user.role !== requiredRole) {
                                throw new Error(`Must have role: ${requiredRole}`);
                            }
                            return resolve(source, args, context, info);
                        });
                    };
                }
                return fieldConfig;
            },
        }),
    };
}
