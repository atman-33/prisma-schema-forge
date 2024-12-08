import { removeSuffix } from './text';

describe('removeSuffix', () => {
  test('removes the specified suffix when present', () => {
    expect(removeSuffix('example.txt', '.txt')).toBe('example');
    expect(removeSuffix('sample.json', '.json')).toBe('sample');
    expect(removeSuffix('file.name.html', '.html')).toBe('file.name');
    expect(
      removeSuffix('home/prisma-schema-forge/@generated/sample-model/template.ts.txt', '.txt'),
    ).toBe('home/prisma-schema-forge/@generated/sample-model/template.ts');
  });

  test('does not modify the string if the suffix is not present', () => {
    expect(removeSuffix('example.md', '.txt')).toBe('example.md');
    expect(removeSuffix('sample.xml', '.json')).toBe('sample.xml');
    expect(removeSuffix('data', '.csv')).toBe('data');
  });

  test('returns the original string if the suffix is empty', () => {
    expect(removeSuffix('example.txt', '')).toBe('example.txt');
    expect(removeSuffix('sample', '')).toBe('sample');
  });

  test('removes only the suffix at the end of the string', () => {
    expect(removeSuffix('archive.tar.gz', '.gz')).toBe('archive.tar');
    expect(removeSuffix('example.txt.txt', '.txt')).toBe('example.txt');
  });

  test('handles edge cases gracefully', () => {
    expect(removeSuffix('', '.txt')).toBe('');
    expect(removeSuffix('example.txt', '')).toBe('example.txt');
    expect(removeSuffix('', '')).toBe('');
  });
});
