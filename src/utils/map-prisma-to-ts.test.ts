import { mapPrismaToTypeScriptType } from './map-prisma-to-ts';

describe('mapPrismaToTypeScriptType', () => {
  test('should convert Prisma types to TypeScript types correctly', () => {
    expect(mapPrismaToTypeScriptType('String')).toBe('string');
    expect(mapPrismaToTypeScriptType('Int')).toBe('number');
    expect(mapPrismaToTypeScriptType('Float')).toBe('number');
    expect(mapPrismaToTypeScriptType('Boolean')).toBe('boolean');
    expect(mapPrismaToTypeScriptType('DateTime')).toBe('Date');
    expect(mapPrismaToTypeScriptType('Json')).toBe('any');
    expect(mapPrismaToTypeScriptType('Bytes')).toBe('Buffer | Uint8Array');
    expect(mapPrismaToTypeScriptType('BigInt')).toBe('bigint');
    expect(mapPrismaToTypeScriptType('Decimal')).toBe('string | Decimal');
  });

  test('should handle optional types (with "?") correctly', () => {
    expect(mapPrismaToTypeScriptType('String?')).toBe('string | null');
    expect(mapPrismaToTypeScriptType('Int?')).toBe('number | null');
    expect(mapPrismaToTypeScriptType('Float?')).toBe('number | null');
    expect(mapPrismaToTypeScriptType('Boolean?')).toBe('boolean | null');
    expect(mapPrismaToTypeScriptType('DateTime?')).toBe('Date | null');
    expect(mapPrismaToTypeScriptType('Json?')).toBe('any | null');
    expect(mapPrismaToTypeScriptType('Bytes?')).toBe('Buffer | Uint8Array | null');
    expect(mapPrismaToTypeScriptType('BigInt?')).toBe('bigint | null');
    expect(mapPrismaToTypeScriptType('Decimal?')).toBe('string | Decimal | null');
  });

  test('should return "unknown" for unsupported types', () => {
    expect(mapPrismaToTypeScriptType('UnknownType')).toBe('unknown');
    expect(mapPrismaToTypeScriptType('UnknownType?')).toBe('unknown | null');
  });

  test('should handle edge cases gracefully', () => {
    expect(mapPrismaToTypeScriptType('')).toBe('unknown');
    expect(mapPrismaToTypeScriptType('?')).toBe('unknown | null');
    expect(mapPrismaToTypeScriptType(' ')).toBe('unknown');
    expect(mapPrismaToTypeScriptType('String??')).toBe('unknown | null');
  });
});
