/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array
  
  ### Question
  
  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.
  
  For example:
  
  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.
  ```
  
  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */
/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

// 这是我的第一版的答案
// type IsFalse<T> = T extends ""
//   ? true
//   : T extends false
//   ? true
//   : T extends 0
//   ? true
//   : {} extends T
//   ? true
//   : [] extends T
//   ? true
//   : false;

// type IsTrue<T> = IsFalse<T> extends true ? false : true;

// type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
//   ? IsTrue<First> extends true
//     ? true
//     : AnyOf<Rest>
//   : false;

// 这是网友的答案 他没考虑到symbol的情况
// type AnyOfFalse = 0 | "" | false | [] | Record<string, never>;
// type AnyOf<T extends any[]> = T[number] extends AnyOfFalse ? false : true;

// 这是修改了兼容symbol的情况
type AnyOfFalse = 0 | "" | false | [] | Record<keyof any, never>;
type AnyOf<T extends any[]> = T[number] extends AnyOfFalse ? false : true;

declare const s: unique symbol;

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[0, "", false, [], { [s]: "" }]>, true>>,
  Expect<Equal<AnyOf<[]>, false>>
];
