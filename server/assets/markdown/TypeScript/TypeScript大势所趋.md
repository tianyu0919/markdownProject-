## JavaScript  -----------> TypeScript

> #### 1、Ts中 可以设置变量数据类型。不符合类型条件会直接`报错`。除去JavaScript 自身数		据类型，Ts还添加了 void、unknow、any 、never ....

```ts
var x :string ='字符串类型',    
```

> #### 2、Ts中 内部元素类型一致的叫`数组`，反之为`元祖`    (`不严谨`)

```ts
数组变量的创建
var arr :string[] = [''] `只允许字符串元素的数组`
var brr :ReadonlyArray<number> = [1,2,3] `只读状态的数组`
var crr :Array<number> = [1,2,3] `数组泛型写法`
var drr :`类型别名/接口`[] = []  `其他写法`
```

```ts
元祖变量的创建
var brr :[string,number] = ['你好',23] `元祖内部元素的个数、类型顺序必须与创建类型时相同否则报错`
```

> #### 3、联合类型 ：变量支持多种数据类型

```ts
1、 `多选多类型`:
		var str :string|boolean|object = false
		function base(id:number|string){}
2、`合并//多选 接口`
		interface interface eye {
			readonly color: string;
		}
        interface hair {
            long: string;
        }

		type head = eye & hair;
		type heads = eye | hair;
```

> #### 4、接口：控制数据格式

```ts
`接口定义多次会自动合并成一个接口`
interface face{
	name:string;
    age?:number;
    readonly sex:string;
    [propName:string]:any
}
interface eye extends face {
    mouth:
}
// 如果两个接口中具有相同的属性 重复编写就会很繁琐，此时使用extends继承 
`可以继承类型别名`
interface IMan extends IPerson, IWoman {hair:string} 

`?`:代表选填项  `readonly`:只读属性  `[propName:string]`:用于增加对象新属性,不写则不能增加新属性

var obj :face = {
    name:'小王',
    sex:'男'
}
```



```ts
`接口还可以作用于函数`
interface face{
    (x:string,y:stirng):boolean
}
`控制函数的参数类型  返回值类型`
const fun :face =(x,y)=>{
    
} 
```

> #### 4.5  type 与 interface  

- type 和 interface 都可以扩展

>    interface 使用extends  进行扩展

>    type 使用&

- interface 只能用作对象 ，不能用作原始类型  type可以

  

> #### 5 、函数类型

```ts
function fun(name?:string,age:number = 23,...rest:any[]):object{
    return {}
}
`①函数的可选参 ②函数的默认参 ③ 函数的剩余参 ④函数的返回值类型`

```

1. 可选参数只能在参数列表的最后！！！！！！！！！！

2. 如果函数参数不设置为可选，调用时却未传相同个数实参则会报错!!!【必须参数个数一致!!】

3. 如果函数的默认参在必须参前，那么必须传undefined 来获得默认值

3. 如果函数没有返回值 那个返回值约束为void

> #### 6、枚举

```ts
数字枚举：
    enum obs{
        One = 1,
        Two,
        Three,
        Four
    }
字符串枚举：
	 enum obs{
        One = 'one',
        Two='two',
        Three='three',
        Four='four'
    }
`枚举`枚举值支持数字与字符串, 具有从零以此排序自增的默认值。值以大写开头
`字符串类型没有自增行为`  必须给字符串类型以后值的设置初始值
```

> #### 7、泛型

1、一般的ts函数写法：

```ts
function fun(x:string):string{
    return ''
}
`使用` fun('你好')
```

2、泛型的函数写法：

```ts
function fun<T>(x:T):T{
    
}
`使用` fun<string>('再见')

`T` 是类型变量; 是对类型的占位符.可以写多个类型变量。
function Fan<T,F>(x:T,y:F):T{
	return ''  ;
}
`使用` Fun<string,number>('你好',2000)
`调用时可不带间括号显式设置类型，可让ts自动进行类型推断 但是影响代码易读性（不建议）`
```

3、泛型也可以配合接口：

```ts
// 泛型接口
interface Iface<T, U> {
	name: T;
	age: U;
}

function twoFace<T, U>(name: T, age: U): Iface<T, U> {
	return {
		name,
		age,
	};
}
let user = twoFace('钱宗泽',30)
console.log(user);
```



4、泛型关键字`extends`约束：

​		1：可以确保属性存在。

```ts

```



​		2：可以确保对象的属性存在。

```ts

```

3：可以进行类型约束。

```ts
  function tes<T extends number|string >(x:T):obob{
      let man:obob={
        name:'小王',
        age:26
      }
      return man
  }
  tes<string>('你好')
```



普通: 参数类型与返回值固定, 不够灵活。

泛型: 参数类型与返回值灵活可变 , 代码可复用性高。

> #### 8、断言

使用断言来通知Ts你比它更了解这个类型 并`强制覆盖`它的判断

举例：比如拿到一个any类型的数据，但是开发者明确知道其内部保存的是字符串类型，此时就可以使用

​		   类型断言来转换数据类型

```ts
var str :any = '我是字符串'；
写法1:  var len :number = `(str as string)`.length;
写法2: var len :number = `(<string>str)`.length;

var foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
 
interface bas{
    bar:number
}
写法1: (foo as bas).bar = 123
写法1: var foo = {} as bas
	   foo.bar = 123

`推荐使用as关键字写法` 
```



> #### 9、类型推论

1、变量不使用类型约束时第一次赋值时的数据类型 即为类型约束 【`变量声明并且立即初始化时`】

> ### 10、字面量类型

`功能`：配合联合类型使用明确指定数据可选值区间，使得数据取值更严谨

```jsx
// 字面量类型：明确指定 数据可选值区间
const sayThat:(name:'周杰伦'|'林俊杰',age:number)=>void=(name,age)=>{
	console.log({name,age});
}
sayThat('林俊杰',40)
```




>### 11、Ts中的高级类型

1. 知识点：
   ​				1、设置class中的属性时，必须在类中初始化该属性！

   ​				2、class类的继承 分为两种：1：extends、2：实现接口使用 implements 约束接口

   ​				3、交叉类型与接口继承虽然都可以完成对象类型的组合 但是 对于存在`同名属性函数参数`之间 两者的处理方式不同

   ​				4、`接口extends与交叉类型都不能 混合不同类型约束的相同属性`
   
   
   |                                                              |      |
   | ------------------------------------------------------------ | :--: |
   | 该函数参数类型约束变为 联合类型                              | 报错 |
   | ![1655894715641](C:\Users\22758\AppData\Roaming\Typora\typora-user-images\1655894715641.png) |      |
   
​			 4、对象类型的合并/扩展

​					![1656466354652](C:\Users\22758\AppData\Roaming\Typora\typora-user-images\1656466354652.png)

> ### 12、keyof关键字

1. keyof 可以接收一个对象类型 ，集合对象其中的所有键名 生成一个联合类型


> ###13、typeof 关键字

Ts中的 `typeof` 关键字有两个作用：

1. 保留了JS中检测数据类型的功能

2. 可以引用关键字后的数据结构【类似接口】来作为 类型约束

   typeof 只能查询变量或者属性类型 但不能用作函数返回值

```jsx
let user = {
    name:'钱宗泽',
    age:23
}
let person :typeof user = {
    name:'周杰伦'，
    age:40
}
```



> ###14、Partial关键字

```tsx
interface one{
    name:string,
    age:number
}
`接受一个类型约束，返回一个copy但全部参数未可选【非必填】参数`
!!! 只处理第一层对象属性为可选
type newOne = Partial<one>

```

