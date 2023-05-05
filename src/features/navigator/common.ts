import { Cell, NarrativeDoc } from '../../common/types/NarrativeDoc';
import { generatePathWithSearchParams } from '../../features/params/paramsSlice';
import { MockParams } from 'jest-fetch-mock';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const emptyFunction = () => {};

export const narrativeSelectedPath = '/narratives/:id/:obj/:ver';
export const narrativeSelectedPathWithCategory =
  '/narratives/:category/:id/:obj/:ver';
// Types and typeguards
export const navigatorParams = ['limit', 'search', 'sort', 'view'];
export const searchParams = ['limit', 'search', 'sort'];

export const sortNames = {
  '-updated': 'Recently updated',
  updated: 'Least recently updated',
  '-created': 'Recently created',
  created: 'Oldest',
  lex: 'Lexicographic (A-Za-z)',
  '-lex': 'Reverse Lexicographic',
} as const;

export enum Sort {
  '-updated' = '-updated',
  updated = 'updated',
  '-created' = '-created',
  created = 'created',
  lex = 'lex',
  '-lex' = '-lex',
}

export enum Category {
  own = 'own',
  public = 'public',
  shared = 'shared',
  tutorials = 'tutorials',
}

export type CategoryString = keyof typeof Category;
export const isCategoryString = (key: string): key is CategoryString =>
  key in Category;

export type SortString = keyof typeof Sort;
export const isSortString = (key: string): key is SortString => key in Sort;

// Other functions
export const corruptCellError = (cell: Cell, index: number) => {
  // eslint-disable-next-line no-console
  console.error('Corrupted narrative cell detected.', { cell, index });
};

export const corruptNarrativeError = (
  narrativeUPA: string,
  narrative?: unknown
) => {
  // eslint-disable-next-line no-console
  console.error(`Corrupted narrative object detected: ${narrativeUPA}`, {
    narrative,
  });
};

export const narrativePath = (parameters: {
  categoryPath: CategoryString | null;
  id: string;
  obj: string;
  ver: string;
  extraParams?: Record<string, string>;
}) => {
  const { categoryPath, extraParams, id, obj, ver } = parameters;
  if (categoryPath) {
    return generatePathWithSearchParams(narrativeSelectedPathWithCategory, {
      category: categoryPath,
      id,
      obj,
      ver,
      ...extraParams,
    });
  }
  return generatePathWithSearchParams(narrativeSelectedPath, {
    id,
    obj,
    ver,
    ...extraParams,
  });
};

export const testResponseOKFactory = (
  narrativeDoc: NarrativeDoc
): [string, MockParams] => [
  JSON.stringify({
    jsonrpc: '2.0',
    result: [{ data: [{ data: narrativeDoc }] }],
  }),
  { status: 200 },
];
