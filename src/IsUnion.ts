import { Equal, Expect } from "@type-challenges/utils";

// 这是我的答案
// type IsUnion<T, K = T> = T extends K
//   ? [Exclude<K, T>] extends [never] // 这里的T已经被分发了，是单个的
//     ? false
//     : true
//   : false;

type IsUnion<T, K = T> = T extends K
  ? [K] extends [T] // 这里的T已经被分发了，是单个的
    ? false
    : true
  : false;

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>
];
