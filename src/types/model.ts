interface Model {
  model: string;
  plural: string;
  camel: string;
  camelPlural: string;
  kebab: string;
  kebabPlural: string;
  columns: Column[];
}

interface Column {
  name: string;
  nameCamel: string;
  nameKebab: string;
  type: string;
  key: boolean;
}

export { Column, Model };
