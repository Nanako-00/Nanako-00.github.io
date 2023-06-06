---
title: react面试题
cover: /img/post-react.jpg
categories:
  - 前端面试题
---

继续整理，本篇以react为主，如需其他，请阅读其他文章。

## 什么是 React？它的主要特点是什么？
 - React 是由 Facebook 开发的用于构建用户界面的 JavaScript 库。
 ### 特点:
 - 组件化开发: React 提倡将 UI 划分为独立、可重用的组件，每个组件负责自身的状态管理和渲染逻辑，便于开发和维护复杂的应用程序。
 - 虚拟 DOM：React 使用虚拟 DOM 作为中间层，将组件的状态变化映射到虚拟 DOM 树上，然后通过 diff 算法找出变化的部分，并进行高效的更新操作，减少对真实 DOM 的操作，提高性能。
 - 单向数据流：React 遵循单向数据流的原则，数据的流动是自顶向下的，从父组件传递到子组件，子组件通过 props 接收和渲染数据，保证了数据的可追踪性和可维护性。
 - 声明式编程：React 采用声明式编程模型，开发者只需要关注界面应该是什么样子的，而不需要关注具体的 DOM 操作，简化了开发过程。
 - 高效更新：通过使用虚拟 DOM 和 diff 算法，React 能够高效地更新页面，只更新变化的部分，减少了不必要的 DOM 操作，提升了性能。
 - 生态丰富：React 拥有庞大的生态系统，有许多第三方库和工具可供选择，例如 React Router 用于路由管理、Redux 用于状态管理等，可以快速构建复杂的应用程序。

## 类组件和函数组件
  ### 类组件
  - 类组件是使用 ES6 类语法定义的组件。它们继承自 React.Component 类。
  - 通过继承来获得 React 提供的特性和生命周期方法。
  - 必须包含一个render()方法，返回要渲染的jsx元素
  <font color=#00FFFF>例：</font>
  ```javascript
  import React, { Component } from 'react';

  class MyComponent extends Component {
    render() {
      return <div>Hello, I'm a class component!</div>;
    }
  }
  ```
  ### 函数组件
  - 是纯粹的 JavaScript 函数，接收一个 props 对象作为参数，并返回要渲染的 JSX 元素。
  - 没有自己的状态和生命周期方法。
  - 在 React 16.8 版本之后，引入了 Hooks
  - 通过使用 Hooks，使得函数组件也能具有类组件的一些特性，如状态管理和生命周期钩子的功能
  <font color=#00FFFF>例：</font>
  ```javascript
  import React from 'react';

  function MyComponent(props) {
    return <div>Hello, I'm a function component!</div>;
  }
  ```

## 什么是jsx
  - JSX（JavaScript XML）是一种在 JavaScript 代码中编写类似 HTML 结构的语法扩展
  ### 如何使用？
  - 在项目中使用 React 库：在你的项目中引入 React 库，可以使用 npm 或者在 HTML 页面中通过 <script> 标签引入 React 库。
  - 编写 JSX 代码：在 JavaScript 文件中，你可以使用 JSX 语法编写组件的结构。JSX 代码看起来类似于 HTML，但它实际上是 JavaScript 代码。

## React 中的状态（state）和属性（props）有什么区别？
  ### State
  - 状态是组件内部管理的可变数据。它代表了组件的当前状态或数据的变化。
  - 状态是通过类组件的 state 属性来定义和管理的，使用类组件的 setState() 方法来更新状态。
  - 状态是私有的，只能在组件内部访问和修改。其他组件无法直接访问或修改组件的状态。
  - 状态的更新可能会触发组件的重新渲染，从而更新视图。
  ### props
  - 属性是从父组件传递给子组件的数据，用于定义和配置组件的行为和外部数据。
  - 属性是只读的，子组件无法直接修改自己的属性值。它们由父组件负责管理和更新。
  - 属性在父组件内部通过 JSX 语法进行传递，在子组件内部通过 this.props 来访问。
  - 属性的值是在父组件中定义的，并在子组件使用时传递给子组件。子组件无法直接更改属性的值，只能通过父组件的更新来影响属性的值。

## 虚拟Dom和真实Dom
  ### 虚拟Dom
  - 当组件状态发生变化时，React 会创建一个新的虚拟 DOM 树，与之前的虚拟 DOM 树进行比较。
  - React 通过比较新旧虚拟 DOM 树的差异，找出需要更新的部分，这个过程称为协调
  - 最后，React 将计算得到的差异应用于真实 DOM，只更新发生变化的部分，这个过程称为渲染（Rendering）。
  ### 区别
  - 性能优化： 虚拟 DOM 通过在 JavaScript 对象上进行操作，可以减少对真实 DOM 的直接访问，从而提高性能。
  - 批量更新： 通过比较新旧虚拟 DOM 树，React 可以一次性计算出所有需要更新的部分，并最小化对真实 DOM 的操作。
  - 抽象层： 开发者只需关注组件的状态更新，而无需手动操作真实 DOM。

## 生命周期
  - constructor(props): 在组件被创建时调用，用于初始化组件的状态（state）和绑定事件处理函数。
  - componentDidMount(): 在组件被插入到 DOM 树中后立即调用，通常用于进行一次性的操作，如获取远程数据、添加事件监听等。
  - componentDidUpdate(prevProps, prevState): 在组件更新后调用，用于对更新后的组件进行操作，比如根据新的 props 进行条件渲染、更新状态等。注意，在该方法内部更新状态时需要添加条件，以免进入无限循环。
  - componentWillUnmount(): 在组件被从 DOM 树中移除前调用，通常用于清理组件相关的资源、取消订阅、移除事件监听等。
  - shouldComponentUpdate(nextProps, nextState): 在组件更新前调用，用于判断是否需要进行组件的重新渲染。可以根据当前的 props 和 state 与下一次的 props 和 state 进行比较，返回 true 表示需要更新，返回 false 表示不需要更新。
  - static getDerivedStateFromProps(props, state): 在组件将要更新前调用，用于根据新的 props 计算并返回一个新的状态（state）。这个方法在 React 16.3 版本引入，替代了旧版本的 componentWillReceiveProps()。
  - render(): 在组件更新时调用，用于返回组件的 JSX 结构，描述组件的外观和结构。
  - getSnapshotBeforeUpdate(prevProps, prevState): 在组件更新前调用，用于在组件发生更新之前捕获当前的 DOM 状态。通常配合 componentDidUpdate() 方法使用，用于处理 DOM 更新后的一些操作，如滚动位置恢复等。

## React常用Hooks
  - useState：用于在函数组件中添加状态管理。
  - useEffect：用于处理副作用操作，如订阅事件、发起网络请求等。
  - useContext：用于访问 React 上下文。
  - useRef：用于创建可变的引用。
  - useCallback：用于优化函数的性能，避免重复创建函数实例。
  - useMemo：用于优化计算结果的性能，避免重复计算。
  - useReducer：用于管理复杂的状态逻辑，类似于 Redux 中的 reducer。
  - useLayoutEffect：类似于 useEffect，但在 DOM 更新之前同步执行，可以用于处理需要同步计算布局的情况。
  - useRef：用于在函数组件之间共享引用。
  - useImperativeHandle：用于自定义父组件通过 ref 访问子组件的实例方法。

## React 组件之间的通信
  - Props（属性）传递：通过父组件向子组件传递属性（props），子组件可以读取和使用这些属性。这是 React 中最常见的一种通信方式，适用于父子组件之间的数据传递。
  - 回调函数：父组件可以将一个函数作为 props 传递给子组件，子组件可以调用该函数，从而向父组件传递信息或触发某些操作。
  - Context 上下文：React 的上下文（Context）机制允许在组件树中共享数据，可以在父组件中创建上下文，并在需要的子组件中访问该上下文。这种方式适用于需要在多个层级的组件之间共享数据的情况。
  - 全局状态管理（如 Redux、MobX）：使用第三方状态管理库，例如 Redux、MobX，可以将组件的状态提升到全局状态中，并通过订阅和派发事件的方式实现组件之间的通信。
  - React Router：React Router 是 React 的官方路由库，通过路由配置和组件渲染，可以实现不同组件之间的导航和通信。

## 如何使用 Context 实现跨组件的数据共享？
   - Provider（提供者）：Provider 是 Context 的生产者，它通过将值传递给 Context 创建一个 Provider 组件，并将该组件包装在要共享数据的组件树的最顶层。
   - Consumer（消费者）：Consumer 是 Context 的消费者，它通过在组件树中使用 Consumer 组件来访问 Provider 提供的值。
   <font color=#00FFFF>例：</font>
   ```javascript
    // 创建 Context：使用 React.createContext() 创建一个 Context 对象，并提供默认的初始值。
    const MyContext = React.createContext(defaultValue);

    // 提供数据：在顶层组件或需要共享数据的组件上，使用 Context 提供者（Provider）包装组件，并将要共享的数据传递给 Provider。
    <MyContext.Provider value={sharedData}>
      {/* 其他组件 */}
    </MyContext.Provider>

    // 消费数据：在需要访问共享数据的组件中，使用 Context 消费者（Consumer）来接收提供者传递的数据，并在 Consumer 的回调函数中使用该数据。
    <MyContext.Consumer>
      {value => (
        {/* 使用共享的数据 */}
      )}
    </MyContext.Consumer>

   ```
