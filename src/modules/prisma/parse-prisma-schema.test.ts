import { parsePrismaSchema } from './parse-prisma-schema';

describe('parse-prisma-schema', () => {
  test('should correctly parse prisma models', () => {
    // Arrange
    const schema = `
model DummyBook {
    // id    String  @id
    id             String   @id @default(auto()) @map("_id") @db.ObjectId
    title          String
    currentChapter Float?
    score          Float    @default(0.0)
    completed      Int      @default(0) // 0:未完結, 1:完結
    review         String?
    createdAt      DateTime @default(now())
    updatedAt      DateTime @default(now()) @updatedAt

    // ---- Relations ---- //
    userId String // User.id

    @@unique([userId, title]) // 複合ユニーク制約
}

model Dummy {
    // id    String  @id
    id    String  @id @default(auto()) @map("_id") @db.ObjectId
    text  String?
    int   Int?
    float Float?

    createdAt DateTime @default(now())
    updatedAt DateTime @default(now()) @updatedAt
}
    `;

    // Act
    const models = parsePrismaSchema(schema);
    // console.log(models);
    // console.log(models[0].columns[0]);

    // Assert
    expect(models).toBeDefined();

    expect(models.length).toBe(2);

    expect(models[0].name.pascal).toBe('DummyBook');
    expect(models[0].name.pascalPlural).toBe('DummyBooks');
    expect(models[0].name.camel).toBe('dummyBook');
    expect(models[0].name.camelPlural).toBe('dummyBooks');
    expect(models[0].name.kebab).toBe('dummy-book');
    expect(models[0].name.kebabPlural).toBe('dummy-books');

    expect(models[0].columns[0].name.pascal).toBe('Id');
    expect(models[0].columns[0].type).toBe('string');
    expect(models[0].columns[0].key).toBeTruthy();

    expect(models[0].columns[1].name.pascal).toBe('Title');
    expect(models[0].columns[1].type).toBe('string');
    expect(models[0].columns[1].key).toBeFalsy();

    expect(models[0].columns[2].name.pascal).toBe('CurrentChapter');
    expect(models[0].columns[2].name.camel).toBe('currentChapter');
    expect(models[0].columns[2].name.kebab).toBe('current-chapter');

    expect(models[0].columns.length).toBe(9);
  });
});
