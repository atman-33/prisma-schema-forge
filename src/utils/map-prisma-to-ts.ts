/**
 * Function to convert Prisma types to TypeScript types
 * @param prismaType - Prisma type as a string (e.g., "String", "String?")
 * @returns Corresponding TypeScript type as a string (e.g., "string", "string | null")
 */
export const mapPrismaToTypeScriptType = (prismaType: string): string => {
  // Mapping table between Prisma types and TypeScript types
  const typeMapping: Record<string, string> = {
    String: 'string',
    Int: 'number',
    Float: 'number',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'any',
    Bytes: 'Buffer | Uint8Array',
    BigInt: 'bigint',
    Decimal: 'string | Decimal',
  };

  // Check for optional type (if "?" is appended at the end)
  const isOptional = prismaType.endsWith('?');
  const baseType = isOptional ? prismaType.slice(0, -1) : prismaType;

  // Convert the type
  const tsType = typeMapping[baseType] || 'unknown';

  // Add null for optional types
  return isOptional ? `${tsType} | null` : tsType;
};
