
# 前言

&emsp;&emsp;在 `typescript` 中，有 `{}` `object` 和 `Object` 那他们的类型都是有什么区别呢？

## {} 类型

&emsp;&emsp;在 `typescript` 中 `{}` 只是代表一个空对象，暂时没有任何属性。

## object 类型

&emsp;&emsp;在 `typescript` 中 `object` 代表他是一个特殊类型对象 `object` 指的是任何非原始值（`string`，`number`，`boolean`，`null`，`undefined`）。比如:

```typescript
let obj: object = {}; // * success
let obj1: object = []; // * success
let obj2: object = 'xx'; // * error 不能将 string 类型分配给 object 但是如下
let obj2_1: object = new String('xx'); // * success 这种就对了
```

### Object 类型
&emsp;&emsp;<b>在 `typescript` 中 `Object` 类型是所有 `Object` 类的实例的类型，他包括了原始值。</b>它由以下两个接口来定义：

&emsp;&emsp;`Object` 接口定义了 `Object.prototype` 原型对象上的属性；
&emsp;&emsp;`ObjectConstructor` 接口定义了 `Object` 类的属性。

1. `Object` 接口的定义：

```typescript
interface Object {
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
```

2. `ObjectConstructor` 接口定义：

```typescript
interface ObjectConstructor {
  new(value?: any): Object;

  (value?: any): any;

  readonly prototype: Object;

  getPrototypeOf(o: any): any
}
```

&emsp;&emsp;`Object` 类的所有实例都继承了 `Object` 接口中的所有属性。我们可以看到，如果我们创建一个返回其参数的函数：
&emsp;&emsp;传入一个 `Object` 对象的实例，它总是会满足该函数的返回类型 —— 即要求返回值包含一个 `toString()` 方法。

```typescript
function f(x: Object): { toString(): string } {
  return x; // OK
}
```

&emsp;&emsp;而 `object` 类型，它用于表示非原始类型（`undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`）。使用这种类型，我们不能访问值的任何属性。

## Object vs object

1. `Object` 类型参数

```typescript
function f(x: Object): { toString(): string } {
  return x;
}

f('你好'); // Ok
```

2. `object` 类型参数

```typescript
function f(x: object): { toString(): string } {
  return x;
}

f('你好'); // error
```