import { ModelDefinition } from '@ts-webapp/common';
export const {Name}ModelUrl = '/{name}';
export interface {Name}ModelDefinition extends ModelDefinition {
  name?: string;
};
export const {Name}ModelScheme = {
  name: {type: String},
};