interface Model {
  name: Name;
  columns: Column[];
}

interface Column {
  name: Name;
  type: string;
  key: boolean;
}

interface Name {
  pascal: string;
  pascalPlural: string;
  camel: string;
  camelPlural: string;
  kebab: string;
  kebabPlural: string;
}

export { Column, Model, Name };
