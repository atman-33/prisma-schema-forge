interface Sample {
  filePath: string;
  template: string;
}

export const samples: Sample[] = [
  {
    filePath: 'templates/graphql/__modelKebab__.graphql',
    template: `
query get__modelPlural__ {
  __modelCamelPlural__ {
    __modelColumns__
  }
}

mutation create__model__($data: __model__CreateInput!) {
  create__model__(data: $data) {
    __modelColumns__
  }
}

mutation update__model__($data: __model__UpdateInput!, $where: __model__WhereUniqueInput!) {
  update__model__(data: $data, where: $where) {
    __modelColumns__
  }
}

mutation delete__model__($where: __model__WhereUniqueInput!) {
  delete__model__(where: $where) {
    id
  }
}

    `,
  },
  {
    filePath: 'templates/jotai/__modelKebab__-atom.ts',
    template: `

    import { __model__ } from '@/gql/graphql';
    import { PrimitiveAtom, atom, useAtomValue } from 'jotai';
    import { atomFamily } from 'jotai/utils';
    
    export const __modelCamel__AtomFamily = atomFamily<Partial<__model__>, PrimitiveAtom<__model__>>(
      (__modelCamel__: Partial<__model__>) => atom(__modelCamel__ as __model__),
      (a: Partial<__model__>, b: Partial<__model__>) => a.id === b.id,
    );
    
    export const __modelCamel__IdsAtom = atom<string[]>([]);
    
    export const __modelCamelPlural__Atom = atom<__model__[]>((get) => {
      const ids = get(__modelCamel__IdsAtom);
      return ids.map((id) =>
        get(
          __modelCamel__AtomFamily({
            id,
          }),
        ),
      );
    });
    
    export const __modelCamel__Selectors = {
      useGet__modelPlural__: () => useAtomValue(__modelCamelPlural__Atom),
      useGet__model__: (id: string) => useAtomValue(__modelCamel__AtomFamily({ id })),
    };
        
    `,
  },
];
