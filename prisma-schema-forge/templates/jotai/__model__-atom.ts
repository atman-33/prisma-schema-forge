
import { __model__ } from '@/gql/graphql';
import { PrimitiveAtom, atom, useAtomValue } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const __model_camel__AtomFamily = atomFamily<Partial<__model__>, PrimitiveAtom<__model__>>(
  (__model_camel__: Partial<__model__>) => atom(__model_camel__ as __model__),
  (a: Partial<__model__>, b: Partial<__model__>) => a.id === b.id,
);

export const __model_camel__IdsAtom = atom<string[]>([]);

export const __model_camelPlural__Atom = atom<__model__[]>((get) => {
  const ids = get(__model_camel__IdsAtom);
  return ids.map((id) =>
    get(
      __model_camel__AtomFamily({
        id,
      }),
    ),
  );
});

export const __model_camel__Selectors = {
  useGet__model_plural__: () => useAtomValue(__model_camelPlural__Atom),
  useGet__model__: (id: string) => useAtomValue(__model_camel__AtomFamily({ id })),
};
    