"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sample_1 = __importDefault(require("./controllers/sample"));
const sample_2 = __importDefault(require("./types/sample"));
const query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'The query root of Nert.',
    fields: () => ({
        sample: {
            type: sample_2.default,
            description: 'A sample root schema',
            resolve: () => sample_1.default(),
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map