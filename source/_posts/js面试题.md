---
title: 前端js面试题
cover: /img/js-面试.jpg
categories:
  - 前端面试题
---

继续整理，本篇以js内容为主，如需其他，请阅读其他文章。

## js数据类型
  ### 基本数据类型
  - Number 数字类型
  - String 字符串类型
  - Boolean 布尔值
  - Null 空值
  - Undefined 未定义
  - Object 对象
  - Array 数组
  - Symbol 表示唯一的、不可变的值，用于创建对象的唯一标识符。Symbol 在 ES6 中引入。
  - BigInt 数值太大的数字类型
  ### 特殊数据类型
  - Function 函数数据类型

## 检测数据类型的方式
  ### typeof
  - typeof 是一个一元操作符，用于获取一个值的类型。它返回一个表示数据类型的<font color=#9900CC>字符串</font>。
  - 返回值为字符串。
  - 可以准确的判断出<font color=#9900CC>基本数据类型</font>和<font color=#9900CC>Funtcion</font>，其他均为object。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    typeof 42; // "number"
    typeof "Hello"; // "string"
    typeof true; // "boolean"
    typeof undefined; // "undefined"
    typeof null; // "object" (注意这是一个历史遗留问题，null 被错误地判断为对象)
    typeof [1, 2, 3]; // "object"
    typeof { name: "John", age: 25 }; // "object"
    typeof function() {}; // "function"
  ```
  ### instanceof
  - instanceof 操作符用于检查一个对象是否是某个构造函数创建的实例。它可以<font color=#9900CC>判断对象是否属于特定的类型或其子类型</font>。
  - 返回值为<font color=#9900CC>Boolean</font>Boolean值。
  - 对于原始值（如数字、字符串、布尔值等），使用 instanceof 操作符会返回 false，因为原始值不是对象。
  - 而对于对象类型（如数组、函数、对象等），instanceof 可以判断其是否属于特定类型或其子类型。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    const num = 42;
    console.log(num instanceof Number); // false

    const str = "Hello";
    console.log(str instanceof String); // false

    const bool = true;
    console.log(bool instanceof Boolean); // false

    const undef = undefined;
    console.log(undef instanceof Undefined); // 报错，Undefined 不是一个构造函数

    const nul = null;
    console.log(nul instanceof Object); // false

    const arr = [1, 2, 3];
    console.log(arr instanceof Array); // true

    const obj = { name: "John", age: 25 };
    console.log(obj instanceof Object); // true

    const func = function() {};
    console.log(func instanceof Function); // true
  ```
  ### 手写实现instanceof
  ```JavaScript
    function myInstanceof(obj, constructor) {
      if (typeof obj !== 'object' || obj === null) {
        return false;
      }

      let prototype = Object.getPrototypeOf(obj);

      while (prototype !== null) {
        if (prototype === constructor.prototype) {
          return true;
        }
        prototype = Object.getPrototypeOf(prototype);
      }

      return false;
    }
  ```
  ### Array.isArray
  - Array.isArray() 是一个静态方法，用于检查一个值是否是数组类型。
  - 返回值为<font color=#9900CC>Boolean</font>。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    Array.isArray([1, 2, 3]); // true
    Array.isArray("Hello"); // false
  ```
  ### Object.prototype.toString()
  - Object.prototype.toString() 是 Object 原型上的方法
  - 返回值为<font color=#9900CC>对象类型的字符串</font>
  <font color=#00FFFF>例：</font>
  ```JavaScript
    Object.prototype.toString.call(42); // "[object Number]"
    Object.prototype.toString.call("Hello"); // "[object String]"
    Object.prototype.toString.call(true); // "[object Boolean]"
    Object.prototype.toString.call(undefined); // "[object Undefined]"
    Object.prototype.toString.call(null); // "[object Null]"
    Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
    Object.prototype.toString.call({ name: "John", age: 25 }); // "[object Object]"
    Object.prototype.toString.call(function() {}); // "[object Function]"
  ```
## var, let, const
  ### var
  - 函数作用域：var 声明的变量具有函数作用域，即变量的作用范围限定在声明它的函数内部。
  - 变量提升：使用 var 声明的变量会发生<font color=#9900CC>变量提升</font>，即在函数内部，无论在哪里声明变量，变量声明都会被提升到函数的顶部。
  ### let
  - 块级作用域：let 声明的变量具有<font color=#9900CC>块级作用域</font>，即变量的作用范围限定在当前代码块内部（如 {} 中）。
  - 没有变量提升：使用 let 声明的变量<font color=#9900CC>不会发生变量提升</font>，只有在变量<font color=#9900CC>声明之后才能访问</font>。
  ### const
  - 块级作用域：const 声明的变量具有<font color=#9900CC>块级作用域</font>。
  - 常量赋值：const 声明的变量<font color=#9900CC>必须在声明时进行初始化</font>，并且<font color=#9900CC>不能再次赋值</font>。它的值是不可变的。

## 作用域&&作用域链
  ### 作用域
  - 全局作用域： 全局作用域是在整个 JavaScript 程序中可访问的最外层作用域。在全局作用域中声明的变量和函数可以被程序中的任何部分访问。
  - 函数作用域： 函数作用域是在函数内部声明的变量的作用域范围。函数作用域中的变量只能在函数内部访问，而无法在函数外部或其他函数中访问。
  - 块级作用域： 块级作用域是在代码块（如 if、for、while 语句等）中声明的变量的作用域范围。块级作用域中的变量只能在该代码块内部访问，而在代码块外部是不可见的。
  <font color=red>注：</font> 如果一个变量没有声明直接使用：
    - 严格模式下：报错（ReferenceError: x is not defined）
    - 非严格模式下：JavaScript 引擎将隐式地将该变量视为<font color=red>全局变量</font>，并返回其值为 undefined
  ### 作用域链
  - 作用域链（Scope Chain）是 JavaScript 中用于查找变量的机制。当代码中引用一个变量时，JavaScript 引擎会按照特定的规则沿着作用域链进行变量查找，直到找到匹配的变量或达到最外层的全局作用域。
  - 作用域链的构建是根据变量的词法环境（Lexical Environment）进行的。每当创建一个新的执行上下文（函数执行上下文或全局执行上下文），就会创建一个新的词法环境，并将其与当前的词法环境形成一个链式结构。
  - 当访问一个变量时，JavaScript 引擎首先在当前的词法环境中查找该变量，如果找到了就使用它。如果没有找到，则继续沿着作用域链向上查找，直到找到匹配的变量或到达全局作用域。
  - 如果在最外层的全局作用域中仍然没有找到该变量，那么会抛出一个引用错误。

## 垃圾回收机制
  ### 标记清楚法
  - 在标记阶段，垃圾回收器从根对象开始遍历所有可访问的对象，并标记活动对象。
  - 在清除阶段，垃圾回收器清除所有未被标记的对象，释放它们占用的内存空间。
  ### 引用计数法
  - 每当一个对象被引用时，引用计数加一；
  - 当一个对象的引用被删除或覆盖时，引用计数减一。
  - 当引用计数为零时，即没有任何引用指向该对象，该对象被判定为垃圾并被回收。
  <font color=red>注：</font>引用计数方法无法解决循环引用的问题，即对象之间相互引用导致引用计数无法归零的情况。

## 闭包
  ### 概念：
   - JavaScript 闭包（Closure）是指在<font color=#9900CC>函数内部创建的函数</font>，它可以访问外部函数的变量和作用域，即使外部函数已经执行完毕，闭包仍然可以保持对外部变量的引用。
  ### 特征：
  - 内部函数可以访问外部函数的变量和参数
  - 外部函数的变量不会被销毁
  ### 场景：
  - 封装私有变量：通过闭包可以<font color=#9900CC>创建私有变量</font>，外部无法直接访问，只能通过闭包提供的接口进行访问和修改。这种方式可以实现数据的封装和保护。
  - 延迟执行：通过闭包可以创建一个延迟执行的函数，即将一部分逻辑包裹在闭包中，并在需要时执行。这对于实现定时器、事件监听等场景很有用。
  - 记忆化：闭包可以用于缓存中间计算结果，以避免重复计算。通过在闭包中保存计算结果，可以提高代码的执行效率。
  <font color=red>注：</font>闭包的使用需要注意内存管理，因为闭包会持有外部函数的变量引用，如果不及时释放闭包，可能会导致<font color=red>内存泄漏。</font>
  ### 释放闭包：
  - 如果存在其他对象或函数持有对闭包的引用，可以通过将这些引用置为 <font color=#9900CC>null</font> 或者取消相关的事件监听来释放闭包。
  - 让垃圾回收器自动回收不再使用的闭包所占用的内存。
  ### 避免内存泄漏和资源占用
  - 及时解除事件监听
  - 避免循环引用
  - 尽量避免使用长期存在的闭包

## this指向
  - 默认情况:this指向window（严格模式下为undefined）
  - 对象绑定:作为对象的方法调用时，this指向该对象
  - 方法改变: call,apply,bind改变this
  - new 绑定： this 指向新创建的实例对象。
  - 箭头函数： 箭头函数中的 this 绑定是词法上的，指向外层作用域的 this 值，而不是被调用时的上下文对象。
  <font color=red>注：</font> 箭头函数无法通过call，apply，bind改变。

## new实例化
- 创建一个空对象
- 将对象的原型设置为函数的peototype属性
- 将函数的this指向这个对象，执行构造函数的代码，给对象添加属性
- 判断函数的返回类型，如果是值类型，则返回这个对象，如果是引用类型，则返回引用类型

## 原型&&原型链
  ### 原型
    - 在 JavaScript 中，每个对象都有一个原型（prototype）属性，它指向另一个对象，这个对象就是该对象的原型。原型对象可以包含共享的属性和方法，可以被对象实例共享和访问。
  ### 原型链
    - 函数的原型链对象constructor默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针__proto__,该指针是指向上一层的原型对象，而上一层的原型对象的结构依然类似。因此可以利用__proto__一直指向Object的原型对象上，而Object原型对象用Object.prototype.__ proto__ = null表示原型链顶端。如此形成了js的原型链继承。同时所有的js对象都有Object的基本防范
  <font color=#00FFFF>例：</font>
    ```JavaScript
      // 定义一个构造函数
      function Person(name) {
        this.name = name;
      }

      // 在 Person 构造函数的原型对象上定义一个方法
      Person.prototype.sayHello = function() {
        console.log(`Hello, my name is ${this.name}!`);
      };

      // 创建一个对象实例
      const john = new Person('John');

      // 调用对象实例的方法
      john.sayHello(); // 输出 "Hello, my name is John!"

      // 隐式访问原型对象上的属性
      console.log(john.toString()); // 输出 "[object Object]"

      // 原型链继承关系
      console.log(john.__proto__ === Person.prototype); // 输出 true
      console.log(Person.prototype.__proto__ === Object.prototype); // 输出 true
      console.log(Object.prototype.__proto__); // 输出 null
    ```

## 事件循环
    - 事件循环（Event Loop）是 JavaScript 中处理异步操作的一种机制。它负责协调和执行 JavaScript 代码，使得异步任务能够按照特定的顺序和时机执行。
    - JavaScript 是单线程的，意味着一次只能执行一个任务。但是在实际开发中，经常会遇到需要执行异步操作的情况，比如网络请求、定时器、事件监听等。为了处理这些异步操作，JavaScript 引入了事件循环机制。
  ### 事件循环机制的主要组成部分包括以下几个要素
    - 调用栈（Call Stack）：用于存储执行上下文的栈结构，用来跟踪代码的执行位置。
    - 任务队列（Task Queue）：用于存储异步任务的队列，比如网络请求回调、定时器回调等。
    - 事件循环（Event Loop）：负责监听调用栈和任务队列，当调用栈为空时，从任务队列中取出任务并推入调用栈执行。
  ### 执行过程
    - 代码从上到下依次执行，遇到异步任务时，将其推入任务队列而不会阻塞代码的执行。
    - 当调用栈为空时，事件循环会检查任务队列。
    - 如果任务队列中有任务，则选择其中最早进入队列的任务，将其推入调用栈执行。
    - 执行任务时，可能会产生新的异步任务，将其推入任务队列。
    - 重复步骤 2-4，直到任务队列为空。
  - 事件循环中有宏任务和微任务的区分
  ### 宏任务
    - 整体代码块（Script）：整个脚本代码作为一个宏任务执行。
    - setTimeout 和 setInterval：定时器任务。
    - I/O 操作：包括文件读写、网络请求等异步 I/O 操作。
    - UI 渲染：更新页面布局、样式等操作。
    - requestAnimationFrame：用于实现动画效果的定时器。
    - 事件监听器回调：如点击事件、键盘事件等。
  ### 微任务
    - Promise 回调：在 Promise 的状态改变时执行的回调函数。
    - MutationObserver 回调：监测 DOM 变化时执行的回调函数。
    - process.nextTick（Node.js 环境）：在当前操作结束后立即执行的回调函数。
  <font color=red>注：事件循环</font>的执行过程中，宏任务的优先级高于微任务。
  <font color=red>注：任务队列</font>的执行过程中，微任务的优先级高于宏任务。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function syncCode() {
      console.log(1);
    }

    function asyncCode() {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(2);
          resolve();
        }, 1000);
      });
    }

    async function execute() {
      syncCode();
      await delay(1000);
      console.log(3);
      await asyncCode();
      console.log(4);
      await delay(1000);
      console.log(5);
    }

    execute()
      .then(() => {
        console.log(6);
        return delay(1000);
      })
      .then(() => {
        console.log(7);
        return delay(1000);
      })
      .then(() => {
        console.log(8);
        return delay(1000);
      })
      .then(() => {
        console.log(9);
      });

      <!-- 代码执行顺序的解释如下：

      首先执行 syncCode() 函数，输出 1。
      使用 await delay(1000) 实现一个 1 秒的延迟。
      输出 3。
      执行 asyncCode() 函数，其中包含一个 1 秒的延迟，在延迟结束后输出 2。
      输出 4。
      使用 await delay(1000) 实现一个 1 秒的延迟。
      输出 5。
      使用 Promise 的 then 方法进行连续的延时操作，分别输出 6、7、8。
      最后使用 then 方法输出 9。 -->
  ```
## 防抖&&节流
  ### 防抖
  - 在事件触发后等待一段时间，如果在这段时间内没有再次触发该事件，才执行对应的操作。如果在等待时间内又触发了该事件，就重新开始计时。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    function debounce(func, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }

    // 使用示例
    const debouncedFunction = debounce(myFunction, 300);
    element.addEventListener('input', debouncedFunction);
  ```
  ### 节流
  - 控制事件的触发频率，保证一定时间内只触发一次该事件。在设定的时间间隔内，不管事件触发了多少次，只有一次事件处理函数执行。
  <font color=#00FFFF>例：</font>
  ```JavaScript
    function throttle(func, delay) {
      let timer;
      return function(...args) {
        if (!timer) {
          timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
          }, delay);
        }
      };
    }

    // 使用示例
    const throttledFunction = throttle(myFunction, 300);
    element.addEventListener('scroll', throttledFunction);
  ```

## Promise
    - Promise 是 JavaScript 中用于处理异步操作的一种机制。它可以避免回调地狱的问题，并提供了一种更优雅的方式来处理异步代码。
    - 它可以有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。
    - 状态只可以改变一次（ pending ==> fulfilled ||  pending ==> rejected ）
    - 可以通过.then()链式调用,每个 .then() 方法都返回一个新的 Promise 对象;
    - .then() 方法来注册操作成功时的处理函数，使用 .catch() 方法来注册操作失败时的处理函数。
  基本语法 <font color=#00FFFF>例：</font>
  ```JavaScript
    const promise = new Promise((resolve, reject) => {
      // 异步操作
      // 如果操作成功，调用 resolve(value)
      // 如果操作失败，调用 reject(error)
    });
    promise
      .then((value) => {
        // 处理操作成功的结果
      })
      .catch((error) => {
        // 处理操作失败的结果
      });
  ```
  ### 静态方法
    #### Promise.resolve
      - Promise.resolve(value)：返回一个以给定值解析后的 Promise 对象。如果传入的值本身就是一个 Promise，则直接返回该 Promise。
      <font color=#00FFFF>例：</font>
      ```JavaScript
        const promise = Promise.resolve(42);
        promise.then(value => {
          console.log(value); // 输出 42
        });
      ```
    #### Promise.reject
      - Promise.reject(reason)：返回一个带有指定拒绝原因的 Promise 对象。
      <font color=#00FFFF>例：</font>
      ```JavaScript
        const promise = Promise.reject(new Error('Something went wrong'));
        promise.catch(error => {
          console.error(error); // 输出错误信息：Something went wrong
        });
      ```
    #### Promise.all
      - Promise.all(iterable)：接收一个可迭代对象（如数组或类数组对象），并返回一个 Promise 对象。
      - 该 Promise 对象在所有输入的 Promise 都已成功解析后才会解析，返回一个包含所有 Promise 结果的数组。
      - 如果其中任何一个 Promise 被拒绝，则返回的 Promise 会立即被拒绝。
      <font color=#00FFFF>例：</font>
      ```JavaScript
        const promises = [
          Promise.resolve(1),
          Promise.resolve(2),
          Promise.resolve(3)
        ];

        Promise.all(promises)
          .then(results => {
            console.log(results); // 输出 [1, 2, 3]
          })
          .catch(error => {
            console.error(error);
          });
      ```
    #### Promise.race
      - Promise.race(iterable)：接收一个可迭代对象，返回一个 Promise 对象。
      - 该 Promise 对象将与第一个解析或拒绝的 Promise 对象具有相同的结果。
      <font color=#00FFFF>例：</font>
      ```JavaScript
        const promises = [
          new Promise(resolve => setTimeout(() => resolve(1), 100)),
          new Promise(resolve => setTimeout(() => resolve(2), 200)),
          new Promise(resolve => setTimeout(() => resolve(3), 300))
        ];

        Promise.race(promises)
          .then(result => {
            console.log(result); // 输出 1（第一个解析的 Promise 结果）
          })
          .catch(error => {
            console.error(error);
          });
      ```
  ### 手写实现Promise.all
  ```JavaScript
    function myPromiseAll(promises) {
      return new Promise((resolve, reject) => {
        const results = [];
        let resolvedCount = 0;

        for (let i = 0; i < promises.length; i++) {
          promises[i]
            .then(result => {
              results[i] = result;
              resolvedCount++;

              if (resolvedCount === promises.length) {
                resolve(results);
              }
            })
            .catch(reject);
        }
      });
    }
  ```

## 事件委托（事件代理）
  - JavaScript 中的事件委托（事件代理）是一种常见的事件处理技术，它通过将事件绑定到一个父元素上，利用事件冒泡的特性，在父元素上统一处理子元素的事件。
  ### 优点
    - 减少内存消耗：只需要一个事件处理程序，而不是为每个子元素都创建一个处理程序，从而减少了内存消耗。
    - 动态绑定：对于后续添加的子元素，无需再次绑定事件，因为事件委托是基于事件冒泡的，新添加的元素也会受到委托的处理。
    - 简化代码：通过将事件处理程序绑定到父元素上，可以避免在多个子元素上编写重复的事件处理代码。
  <font color=#00FFFF>例：</font>
  ```html
    <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>

    <script>
      const list = document.getElementById('myList');

      list.addEventListener('click', function(event) {
        if (event.target.nodeName === 'LI') {
          // 在点击的列表项上执行操作
          console.log('Clicked item:', event.target.textContent);
        }
      });
    </script>
  ```
## 什么是模块化开发，如何实现模块化开发
  - 模块化开发是一种软件开发的方法，旨在将代码划分为独立、可维护和可重用的模块。模块化开发有助于提高代码的可读性、可维护性和可测试性，并促进团队合作和代码复用。
  ### 命名空间模式
  - 使用对象来组织代码，将相关的函数、变量等放在命名空间对象下。这种方式通过避免全局命名冲突来实现模块化。
    ```JavaScript
      // 命名空间模式示例
      var myModule = {
        // 模块内部的私有数据和函数
        privateData: '私有数据',
        privateFunction: function() {
          // 私有函数实现
        },
        // 模块内部的公共接口
        publicFunction: function() {
          // 调用私有函数和访问私有数据
        }
      };
    ```
  ### 立即执行函数表达式
  - 使用匿名函数创建一个独立的作用域，并立即执行该函数，从而创建模块化的代码。
  ```JavaScript
    // IIFE 模块化示例
    var myModule = (function() {
      // 模块内部的私有数据和函数
      var privateData = '私有数据';
      function privateFunction() {
        // 私有函数实现
      }

      // 模块内部的公共接口
      return {
        publicFunction: function() {
          // 调用私有函数和访问私有数据
        }
      };
    })();
  ```
  ### CommonJS 模块规范
  - 在服务器端使用广泛的模块化规范，通过 module.exports 导出模块，通过 require 引入模块。
  ```JavaScript
    // 模块导出
    module.exports = {
      // 模块的公共接口
      publicFunction: function() {
        // 实现代码
      }
    };

    // 模块引入
    var myModule = require('./myModule');
    myModule.publicFunction();
  ```
  ### ES6 模块化
  - 在现代 JavaScript 中，使用 import 和 export 关键字实现模块化。它是官方标准的模块化方案，广泛支持于现代浏览器和构建工具中。
  ```JavaScript
    // 模块导出
    export function publicFunction() {
      // 实现代码
    }

    // 模块引入
    import { publicFunction } from './myModule';
    publicFunction();
  ```
## es6模块化和CommonJS的区别
  - 语法差异
    ES6 模块化使用 import 和 export 关键字来导入和导出模块。
    CommonJS 使用 require 函数来导入模块，使用 module.exports 来导出模块。
  - 加载方式差异
    ES6 模块化是静态加载的，也就是在代码静态分析阶段就可以确定模块的依赖关系，可以在编译时进行优化和静态分析。
    CommonJS 是动态加载的，模块的加载和执行是在运行时进行的，无法在编译时进行优化。
  - 导入导出特性差异
    ES6 模块化支持命名导入和导出，可以选择性地导入和导出模块中的特定成员。
    CommonJS 模块化没有内置的命名导入和导出机制，导入的是整个模块对象，可以通过对象属性来访问导出的成员。
  - 作用域差异
    ES6 模块化在导入的模块中，顶层的 import 和 export 声明是静态的，模块内部的变量不会污染全局作用域。
    CommonJS 在导入的模块中，整个模块的内容被加载到一个对象中，模块内部的变量和函数都可以被其他模块访问到。
  - 运行环境差异
    ES6 模块化主要用于浏览器环境，也可以通过构建工具（如Webpack、Rollup）在 Node.js 环境中使用。
    CommonJS 主要用于 Node.js 环境，也可以通过使用转换工具（如Babel）将其转换为浏览器可用的模块。
## 如何操作DOM，常见的操作DOM方式有哪些
  - 通过 ID 选择元素
    - document.getElementById(id): 返回指定 ID 的元素。
  - 通过选择器选择元素
    - document.querySelector(selector): 返回匹配 CSS 选择器的第一个元素。
    - document.querySelectorAll(selector): 返回匹配 CSS 选择器的所有元素的 NodeList。
  - 通过标签名选择元素
    - document.getElementsByTagName(tagName): 返回指定标签名的元素集合。
  - 通过类名选择元素
    - document.getElementsByClassName(className): 返回指定类名的元素集合。
  - 创建元素
    - document.createElement(tagName): 创建一个具有指定标签名的元素节点。
  - 修改元素内容和属性
    - element.textContent: 设置或获取元素的文本内容。
    - element.innerHTML: 设置或获取元素的 HTML 内容。
    - element.setAttribute(name, value): 设置元素的属性。
    - element.getAttribute(name): 获取元素的属性值。
    - element.style.property = value: 设置元素的 CSS 样式。
  - 添加，移除和替换元素
    - element.appendChild(newChild): 在元素的子节点列表末尾添加一个新的子节点。
    - element.removeChild(child): 从元素的子节点列表中移除指定的子节点。
    - element.replaceChild(newChild, oldChild): 替换元素的指定子节点。
  - 添加和移除事件监听器
    - element.addEventListener(event, listener): 添加事件监听器
    - element.removeEventListener(event, listener): 移除事件监听器。
  - 修改元素的样式类
    - element.classList.add(className): 添加类名。
    - element.classList.remove(className): 移除类名。
    - element.classList.toggle(className): 切换类名的状态。
## 变量提升
  - 在 JavaScript 中，变量提升（Hoisting）是一种特性，它指的是在代码执行之前，JavaScript 引擎会将变量和函数的声明提升到当前作用域的顶部。
  - 声明提升
    - 在代码执行之前，JavaScript 引擎会扫描当前作用域内的变量声明，并将其提升到作用域顶部。
    - 可以在变量声明之前使用变量。
  - 函数提升
    - 与变量提升类似，JavaScript 引擎还会将函数的声明提升到作用域的顶部
    - 可以在函数声明之前调用函数。
## for in和for of的区别
  - 迭代的对象类型
    - for...in 循环用于迭代对象的属性，包括对象自身的可枚举属性以及继承的可枚举属性。
    - for...of 循环用于迭代可迭代对象（如数组、字符串、Set、Map 等）的元素值。
  - 迭代的顺序
    - for...in 循环的迭代顺序是不确定的，因为对象的属性没有固定的顺序。
    - for...of 循环的迭代顺序是按照可迭代对象的迭代器定义的顺序进行迭代。
  - 迭代变量的类型
    - for...in 循环中的迭代变量是字符串类型，表示对象的属性名。
    - for...of 循环中的迭代变量可以是任意类型，表示可迭代对象中的元素值。
  - 可迭代对象的要求
    - for...in 循环适用于任何对象，可以用于迭代普通对象的属性。
    - for...of 循环要求迭代的对象实现了迭代器（Iterator）接口，即具有一个 Symbol.iterator 方法。

## 数组方法
  ### 改变原数组
    - push()：向数组末尾添加一个或多个元素，并返回新数组的长度。
    - pop()：从数组末尾移除最后一个元素，并返回被移除的元素。
    - unshift()：向数组开头添加一个或多个元素，并返回新数组的长度。
    - shift()：从数组开头移除第一个元素，并返回被移除的元素。
    - splice()：从数组中添加、删除或替换元素。
    - reverse()：颠倒数组中元素的顺序。
    - sort()：对数组元素进行排序。
    - fill()：替换值和起始索引位置（可选）。替换值指定要替换的固定值，起始索引位置指定开始替换的位置，默认为 0。
  ### 不改变原数组
    - concat()：将两个或多个数组合并为一个新数组。
    - join()：将数组中的所有元素连接成一个字符串，并返回该字符串。
    - slice()：返回数组的指定部分（浅拷贝）。
    - indexOf()：返回指定元素在数组中的第一个匹配位置的索引。
    - lastIndexOf()：返回指定元素在数组中最后一个匹配位置的索引。
    - forEach()：对数组中的每个元素执行指定的函数。
    - map()：对数组中的每个元素执行指定的函数，并返回一个新数组。
    - filter()：根据指定的条件过滤数组中的元素，并返回一个新数组。
    - reduce()：对数组中的元素执行累加器函数，返回一个累计值。
    - every()：检查数组中的每个元素是否满足指定条件。
    - some()：检查数组中是否至少有一个元素满足指定条件。
    - find()：返回数组中满足指定条件的第一个元素。
    - findIndex()：返回数组中满足指定条件的第一个元素的索引。
  ### 数组去重
  - 使用 Set
  ```JavaScript
    const arr = [1, 2, 2, 3, 3, 4, 5, 5];
    const uniqueArr = [...new Set(arr)];
    console.log(uniqueArr); // 输出 [1, 2, 3, 4, 5]
  ```
  - 使用 filter() 和 indexOf()
  ```JavaScript
    const arr = [1, 2, 2, 3, 3, 4, 5, 5];
    const uniqueArr = arr.filter((value, index, array) => array.indexOf(value) === index);
    console.log(uniqueArr); // 输出 [1, 2, 3, 4, 5]
  ```
  - 使用 reduce() 和 includes()：
  ```JavaScript
    const arr = [1, 2, 2, 3, 3, 4, 5, 5];
    const uniqueArr = arr.reduce((result, value) => {
      if (!result.includes(value)) {
        result.push(value);
      }
      return result;
    }, []);
    console.log(uniqueArr); // 输出 [1, 2, 3, 4, 5]
  ```
  ### 数组扁平化
    - 递归
    ```JavaScript
      function flattenArray(arr) {
      let flattened = [];
      arr.forEach((item) => {
        if (Array.isArray(item)) {
          flattened = flattened.concat(flattenArray(item));
        } else {
          flattened.push(item);
        }
      });
      return flattened;
    }

    const nestedArray = [1, [2, [3, 4], 5], 6];
    const flattenedArray = flattenArray(nestedArray);
    console.log(flattenedArray); // 输出 [1, 2, 3, 4, 5, 6]
    ```
    - Array.prototype.flat()
    ```JavaScript
      const nestedArray = [1, [2, [3, 4], 5], 6];
      const flattenedArray = nestedArray.flat();
      console.log(flattenedArray); // 输出 [1, 2, [3, 4], 5, 6]

      const nestedArray = [1, [2, [3, 4], 5], 6];
      const flattenedArray = nestedArray.flat(2); // 指定扁平化层数为 2
      console.log(flattenedArray); // 输出 [1, 2, 3, 4, 5, 6]
    ```
    - 扩展运算符+递归
    ```JavaScript
      function flattenArray(arr) {
        return arr.reduce((result, item) => {
          if (Array.isArray(item)) {
            result.push(...flattenArray(item));
          } else {
            result.push(item);
          }
          return result;
        }, []);
      }

      const nestedArray = [1, [2, [3, 4], 5], 6];
      const flattenedArray = flattenArray(nestedArray);
      console.log(flattenedArray); // 输出 [1, 2, 3, 4, 5, 6]
    ```


