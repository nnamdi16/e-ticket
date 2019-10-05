"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const SampleType = new graphql_1.GraphQLObjectType({
    name: 'SampleType',
    description: 'This is a sample graphql type',
    fields: () => ({
        hello: {
            type: graphql_1.GraphQLString,
            description: 'Returns hello world',
        },
    }),
});
exports.default = SampleType;
//# sourceMappingURL=sample.js.map