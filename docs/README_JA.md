# prisma-schema-forge

`prisma-schema-forge` は、Prisma スキーマファイルを元にテンプレートエンジンを利用して、コードやファイルを生成するツールです。`npx` コマンドを使用して簡単に導入し、カスタマイズ可能なテンプレートを使って、効率的にファイルを生成できます。

## 概要

このツールは、`schema.prisma` の定義を基に、指定したテンプレートファイルを使って様々なファイルを生成します。例えば GraphQL クエリやミューテーション、ValueObject クラスなどのコードを生成するために利用します。

## インストール

```bash
npx prisma-schema-forge
```

このパッケージは `npx` コマンドで直接利用可能です。特別なインストールは必要ありません。

## コマンド

以下のコマンドを使用することで、テンプレートファイルの生成やカスタムファイルの生成が可能です。

### `init`

`forge.json` 設定ファイルを初期化します。

```bash
npx prisma-schema-forge init
```

このコマンドを実行すると、`forge.json` 設定ファイルが生成され、設定が自動的に準備されます。

### `templates`

サンプルテンプレートを生成します。

```bash
npx prisma-schema-forge templates
```

このコマンドを実行すると、プロジェクトに必要なテンプレートファイルが `./templates` フォルダにコピーされます。これらのテンプレートをカスタマイズして使用できます。

### `generate`

`schema.prisma` とテンプレートを基にファイルを生成します。

```bash
npx prisma-schema-forge generate
```

このコマンドは、`forge.json` 設定ファイルに基づいてファイルを生成します。カスタム設定ファイルを使用する場合は、`-c` オプションで指定できます。

```bash
npx prisma-schema-forge generate -c custom-forge.json
```

## テンプレートエンジン

`prisma-schema-forge` では、テンプレートエンジンを使ってファイルを生成します。以下のトークンを使用することで、Prisma スキーマのモデル名やカラム名を動的に挿入できます。

### Model トークン

| トークン               | 説明                                   | 例                        |
| --------------------- | -------------------------------------- | ------------------------- |
| `__model__`           | モデル名（単数、PascalCase）          | `SampleDummy`             |
| `__modelPlural__`     | モデル名（複数形、PascalCase）        | `SampleDummies`           |
| `__modelCamel__`      | モデル名（単数、camelCase）           | `sampleDummy`             |
| `__modelCamelPlural__`| モデル名（複数形、camelCase）         | `sampleDummies`           |
| `__modelKebab__`      | モデル名（単数、kebab-case）          | `sample-dummy`            |
| `__modelKebabPlural__`| モデル名（複数形、kebab-case）        | `sample-dummies`          |
| `__modelColumns__`    | モデルのカラム名                      | `id`<br>`name`<br>`message`|

### Column トークン

| トークン              | 説明                                    | 例                          |
| -------------------- | --------------------------------------- | --------------------------- |
| `__column__`         | カラム名（元の形式、PascalCase）       | `UserId`                    |
| `__columnCamel__`    | カラム名（camelCase）                  | `userId`                    |
| `__columnKebab__`    | カラム名（kebab-case）                 | `user-id`                   |
| `__columnType__`     | カラムの型（TypeScript型）             | `string`<br>`number`<br>`Date`|

### テンプレートのファイル名とフォルダ構成

#### モデル別ファイルの生成

テンプレートのフォルダ構成に基づき、Prisma の各モデルに対応したフォルダとファイルが生成されます。ファイル名に `.txt` が付いているテンプレートファイルは、生成されたファイル名から `.txt` が除かれます。

**テンプレート構成例:**

```sh
templates/
  graphql/
    __modelKebab__.graphql.txt
```

**生成されるファイル構成例:**

```sh
@generated/
  dummy-sample/
    graphql/dummy-sample.graphql
  dummy-user/
    graphql/dummy-user.graphql
```

ここで、`__modelKebab__` はモデル名が「kebab-case」形式で置換され、例えば `dummy-sample` や `dummy-user` などのファイルが生成されます。

#### カラム別ファイルの生成

カラムに対応したファイルは、テンプレート内の `$column` 部分がカラム名のフォルダに置換され、カラムごとのファイルが生成されます。

**テンプレート構成例:**

```sh
templates/
  value-objects/
    $column/
      __columnKebab__.ts.txt
```

**生成されるファイル構成例:**

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

ここでは、テンプレートファイルの `$column` が各カラム名（例えば `created-at`, `id`, `updated-at` など）に置換され、対応するファイルが生成されます。

## 使用例

仮に`shcema.prisma`を以下のように定義したとします。  

```prisma
// ...
model DummySample {
    // id    String  @id
    id    String  @id @default(auto()) @map("_id") @db.ObjectId
    text  String?
    int   Int?
    float Float?

    createdAt DateTime @default(now())
    updatedAt DateTime @default(now()) @updatedAt
}
```

### GraphQL の生成

例えば、以下のように GraphQL クエリやミューテーションを定義できます。

テンプレート:

```graphql
query get__modelPlural__ {
  __modelCamelPlural__ {
    __modelColumns__
  }
}
```

生成されたコード（例: `DummySample` モデルの場合）:

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

### ValueObject クラスの生成

テンプレート:

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

生成されたコード（例: `id` カラムの場合）:

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

## 設定ファイル (`forge.json`)

`forge.json` では、生成するファイルの種類やテンプレートファイルのパス、出力先などを設定できます。例えば、以下のように設定します。

```json
{
  "prismaSchema": "./prisma/schema.prisma",
  "templates": "./templates",
  "output": "./@generated"
}
```

## コントリビューション

1. リポジトリをフォークしてください。
2. 新しいブランチを作成し、変更を加えます。
3. プルリクエストを作成し、レビューをリクエストしてください。

## ライセンス

MIT ライセンスで提供されています。
