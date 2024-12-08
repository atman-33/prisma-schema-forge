# prisma-schema-forge

`prisma-schema-forge` is a tool that uses a template engine to generate code and files based on your Prisma schema. It can be easily installed using the `npx` command, and you can customize templates to generate files efficiently.

## Overview

This tool generates various files using specified template files based on the definitions in `schema.prisma`. For example, it can be used to generate GraphQL queries, mutations, or ValueObject classes.

## Installation

```bash
npx prisma-schema-forge
```

This package can be directly used with the `npx` command, and no special installation is required.

## Commands

You can use the following commands to generate template files or custom files.

### `init`

Initializes the `forge.json` configuration file.

```bash
npx prisma-schema-forge init
```

Running this command will generate the `forge.json` configuration file and automatically prepare the setup.

### `templates`

Generates sample templates.

```bash
npx prisma-schema-forge templates
```

This command will copy the required template files into the `./templates` folder in your project. You can then customize these templates as needed.

### `generate`

Generates files based on `schema.prisma` and the template files.

```bash
npx prisma-schema-forge generate
```

This command generates files according to the `forge.json` configuration file. If you want to use a custom configuration file, you can specify it using the `-c` option.

```bash
npx prisma-schema-forge generate -c custom-forge.json
```

## Template Engine

`prisma-schema-forge` uses a template engine to generate files. You can dynamically insert model and column names from the Prisma schema by using the following tokens.

### Model Tokens

| Token                  | Description                                | Example                    |
| ---------------------- | ------------------------------------------ | -------------------------- |
| `__model__`            | Model name (singular, PascalCase)          | `SampleDummy`              |
| `__modelPlural__`      | Model name (plural, PascalCase)            | `SampleDummies`            |
| `__modelCamel__`       | Model name (singular, camelCase)           | `sampleDummy`              |
| `__modelCamelPlural__` | Model name (plural, camelCase)             | `sampleDummies`            |
| `__modelKebab__`       | Model name (singular, kebab-case)          | `sample-dummy`             |
| `__modelKebabPlural__` | Model name (plural, kebab-case)            | `sample-dummies`           |
| `__modelColumns__`     | List of model columns                      | `id`<br>`name`<br>`message` |

### Column Tokens

| Token                  | Description                                 | Example                      |
| ---------------------- | ------------------------------------------- | ---------------------------- |
| `__column__`           | Column name (original, PascalCase)          | `UserId`                     |
| `__columnCamel__`      | Column name (camelCase)                     | `userId`                     |
| `__columnKebab__`      | Column name (kebab-case)                    | `user-id`                    |
| `__columnType__`       | Column type (TypeScript type)               | `string`<br>`number`<br>`Date` |

### Template File Names and Folder Structure

#### Model-based File Generation

Based on the template folder structure, folders and files corresponding to each Prisma model are generated. Files with `.txt` extensions in the templates will have `.txt` removed when generated.

**Example Template Structure:**

```sh
templates/
  graphql/
    __modelKebab__.graphql.txt
```

**Generated File Structure:**

```sh
@generated/
  dummy-sample/
    graphql/dummy-sample.graphql
  dummy-user/
    graphql/dummy-user.graphql
```

Here, `__modelKebab__` is replaced with the model name in kebab-case, such as `dummy-sample` or `dummy-user`.

#### Column-based File Generation

Files corresponding to columns are generated with folders named according to each column name, replacing the `$column` placeholder in the template.

**Example Template Structure:**

```sh
templates/
  value-objects/
    $column/
      __columnKebab__.ts.txt
```

**Generated File Structure:**

```sh
@generated/
  dummy-sample/
    value-objects/
      created-at/created-at.ts
      float/float.ts
      id/id.ts
      int/int.ts
      text/text.ts
      updated-at/updated-at.ts
```

Here, the `$column` placeholder in the template is replaced by the actual column names, such as `created-at`, `id`, `updated-at`, and the corresponding files are generated.

## Example Usage

Consider the following `schema.prisma` definition:

```prisma
// ...
model DummySample {
    id        String   @id
    text      String?
    int       Int?
    float     Float?
    createdAt DateTime @default(now())
    updatedAt DateTime @default(now()) @updatedAt
}
```

### GraphQL Generation

You can define GraphQL queries or mutations as follows:

Template:

```graphql
query get__modelPlural__ {
  __modelCamelPlural__ {
    __modelColumns__
  }
}
```

Generated code (for the `DummySample` model):

```graphql
query getDummySamples {
  dummySamples {
    id
    text
    int
    float
    createdAt
    updatedAt
  }
}
```

### ValueObject Class Generation

Template:

```ts
import { ValueObject } from './abstractions/value-object';

export class __column__ extends ValueObject<__columnType__, '__column__'> {
  constructor(value: __columnType__) {
    super(value);
  }

  protected validate(value: __columnType__): void {
    // TODO: add validation logic...
  }
}
```

Generated code (for the `id` column):

```ts
import { ValueObject } from './abstractions/value-object';

export class Id extends ValueObject<string, 'Id'> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    // TODO: add validation logic...
  }
}
```

## Configuration File (`forge.json`)

In the `forge.json` file, you can configure the types of files to generate, the paths of template files, and the output directory. Here's an example configuration:

```json
{
  "prismaSchema": "./prisma/schema.prisma",
  "templates": "./templates",
  "output": "./@generated"
}
```

## Contributing

1. Fork this repository.
2. Create a new branch and make your changes.
3. Submit a pull request and request a review.

## License

This project is licensed under the MIT License.
