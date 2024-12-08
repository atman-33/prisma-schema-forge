interface Sample {
  filePath: string;
  template: string;
}

export const samples: Sample[] = [
  {
    filePath: 'templates/graphql/__modelKebab__.graphql.txt',
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
    filePath: 'templates/jotai/stores/__modelKebab__-atom.ts.txt',
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
  {
    filePath: 'templates/jotai/hooks/use__modelKebab__-dispatcher.ts.txt',
    template: `
import { gql } from '@/lib/graphql-client';
import {
  __model__CreateInput,
  __model__UpdateInput,
  __model__WhereUniqueInput,
} from '@/gql/graphql';
import { graphql } from '@/gql';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { __modelCamel__AtomFamily, __modelCamel__IdsAtom } from '../stores/__modelKebab__-atom';

const get__modelCamelPlural__Gql = graphql(\`
  query get__modelCamelPlural__ {
    __modelCamelPlural__ {
      __modelColumns__
    }
  }
\`);

const create__modelCamel__Gql = graphql(\`
  mutation create__modelCamel__($data: __model__CreateInput!) {
    create__modelCamel__(data: $data) {
      __modelColumns__
    }
  }
\`);

const update__modelCamel__Gql = graphql(\`
  mutation update__modelCamel__($data: __model__UpdateInput!, $where: __model__WhereUniqueInput!) {
    update__modelCamel__(data: $data, where: $where) {
      __modelColumns__
    }
  }
\`);

const delete__modelCamel__Gql = graphql(\`
  mutation delete__modelCamel__($where: __model__WhereUniqueInput!) {
    delete__modelCamel__(where: $where) {
      id
    }
  }
\`);

const use__modelCamel__Dispatcher = () => {
  const load__modelCamelPlural__ = useAtomCallback(
    useCallback(async (get, set) => {
      const res = await gql.request(get__modelCamelPlural__Gql);
      res.__modelCamelPlural__?.map((d) => set(__modelCamel__AtomFamily({ id: d.id }), d));
      set(
        __modelCamel__IdsAtom,
        res.__modelCamelPlural__?.map((d) => d.id),
      );

      return res.__modelCamelPlural__;
    }, []),
  );

  const create__modelCamel__ = useAtomCallback(
    useCallback(async (get, set, { data }: { data: __model__CreateInput }) => {
      const res = await gql.request(create__modelCamel__Gql, { data });
      __modelCamel__AtomFamily(res.create__modelCamel__);

      if (!get(__modelCamel__IdsAtom).includes(res.create__modelCamel__.id)) {
        set(__modelCamel__IdsAtom, [...get(__modelCamel__IdsAtom), res.create__modelCamel__.id]);
      }
      return res.create__modelCamel__;
    }, []),
  );

  const update__modelCamel__ = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        { data, where }: { data: __model__UpdateInput; where: __model__WhereUniqueInput },
      ) => {
        const res = await gql.request(update__modelCamel__Gql, { where: where, data: data });
        set(__modelCamel__AtomFamily({ id: res.update__modelCamel__.id }), res.update__modelCamel__);
        return res.update__modelCamel__;
      },
      [],
    ),
  );

  const delete__modelCamel__ = useAtomCallback(
    useCallback(async (get, set, { where }: { where: __model__WhereUniqueInput }) => {
      const res = await gql.request(delete__modelCamel__Gql, { where: where });
      __modelCamel__AtomFamily.remove(res.delete__modelCamel__);
      const ids = get(__modelCamel__IdsAtom);
      set(
        __modelCamel__IdsAtom,
        ids.filter((id) => id !== res.delete__modelCamel__.id),
      );
      return res.delete__modelCamel__.id;
    }, []),
  );

  return {
    load__modelCamelPlural__,
    create__modelCamel__,
    update__modelCamel__,
    delete__modelCamel__,
  };
};

export { use__modelCamel__Dispatcher };

    `,
  },
  {
    filePath: 'templates/value-objects/$column/__columnKebab__.ts.txt',
    template: `
import { ValueObject } from './abstractions/value-object';

export class __column__ extends ValueObject<__columnType__, '__column__'> {
  constructor(value: __columnType__) {
    super(value);
  }

  protected validate(value: __columnType__): void {
    // TODO: add validation logic...
  }
}
    `,
  },
];
