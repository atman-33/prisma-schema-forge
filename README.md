# prisma-schema-forge

## Template Model Token

| Token                  | Description                       | Example                     |
| ---------------------- | --------------------------------- | --------------------------- |
| `__model__`            | Model name (singular, PascalCase) | `SampleDummy`               |
| `__modelPlural__`      | Model name (plural, PascalCase)   | `SampleDummies`             |
| `__modelCamel__`       | Model name (singular, camelCase)  | `sampleDummy`               |
| `__modelCamelPlural__` | Model name (plural, camelCase)    | `sampleDummies`             |
| `__modelKebab__`       | Model name (singular, kebab-case) | `sample-dummy`              |
| `__modelKebabPlural__` | Model name (plural, kebab-case)   | `sample-dummies`            |
| `__modelColumns__`     | List of model columns             | `id`<br>`name`<br>`message` |

## Template Column Token

| Token                 | Description                        | Example                        |
| --------------------- | ---------------------------------- | ------------------------------ |
| `__column__`      | Column name (original, PascalCase) | `UserId`                       |
| `__columnCamel__` | Column name (camelCase)            | `userId`                       |
| `__columnKebab__` | Column name (kebab-case)           | `user-id`                      |
| `__columnType__`      | Column type (TypeScript data type) | `string`<br>`number`<br>`Date` |
