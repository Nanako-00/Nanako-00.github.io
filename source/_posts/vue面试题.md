---
title: vue面试题
cover: /img/post-vue.jpg
categories:
  - 前端面试题
---

继续整理，本篇以vue为主，如需其他，请阅读其他文章。

## vue双向绑定
  - Vue 的双向数据绑定是通过 <font color=##00FF00>v-model</font> 指令实现的。
  - 当数据模型的属性值发生变化时，Vue 会自动检测到变化，并更新对应的视图。
  - 当用户与视图进行交互，例如在输入框中输入文本时，v-model 指令会监听用户的输入事件。
  - 当用户输入发生变化时，v-model 会自动更新数据模型的属性值，确保数据的同步更新。
  - 数据模型的更新会触发 Vue 的响应式系统，进而更新相关的视图。
  ### 实现原理
  - 在编译阶段，Vue.js 会将 v-model 解析为一个属性和一个事件。
  - 属性部分是绑定数据的值，通常是一个变量。
  - 事件部分是监听输入事件，一般是 input 事件，可以通过修饰符指定其他事件，如 change、keyup 等。
  - 当用户在表单元素中输入内容时，触发对应的输入事件。
  - Vue.js 捕获到输入事件后，将用户输入的值更新到绑定的属性上，实现数据的更新。
  - 同时，v-model 还会将最新的属性值反映到表单元素的 value 属性上，确保视图和数据的同步。

## 生命周期
  ### beforeCreate
    - 在实例初始化之后、数据观测 (data observation) 和 event/watcher 事件配置之前被调用。
    - <font color=#00FF00>无法访问到组件的数据和方法</font>
  ### created
    - 在实例创建完成后被立即调用。
    - <font color=#00FF00>可以访问到组件的数据和方法。</font>
    - 通常在这个阶段进行数据的初始化、异步请求的发起等操作。
  ### beforeMount
    - 在挂载开始之前被调用
    - 模板编译已经完成，但<font color=#00FF00>尚未将组件挂载到页面上</font>。
  ### mounted
    - 在挂载完成后被调用
    - 组件已经被挂载到页面上，<font color=#00FF00>可以操作 DOM 元素、进行初始化</font>工作或与第三方库进行集成。
  ### beforeUpdate
    - 在数据更新之前被调用，发生在虚拟 DOM 重新渲染和打补丁之前。
    - 可以进行一些数据的预处理或在更新前进行额外的操作。
  ### updated
    - 在数据更新完成后被调用，发生在虚拟 DOM 重新渲染和打补丁之后
    - 组件已经重新渲染，<font color=#00FF00>可以执行 DOM 操作</font>。
  ### beforeUnmount (Vue 3.x) / beforeDestroy (Vue 2.x)
    - 进行一些<font color=#00FF00>清理</font>清理工作，如清除定时器、取消订阅等。
  ### unmounted (Vue 3.x) / destroyed (Vue 2.x)
    - 在组件销毁完成后被调用。此时，组件已经被销毁，可以进行最后的清理工作。

## 计算属性和侦听器的区别
  - 计算属性使用<font color=#00FF00>computed</font>声明；侦听器使用<font color=#00FF00>watch</font>声明
  - 计算属性的值会根据依赖的数据进行<font color=#00FF00>缓存</font>，只有当依赖的数据发生变化时，才会重新计算。
  - 计算属性的值会随着依赖的数据变化而自动更新，即当依赖的数据发生变化时，计算属性会自动重新计算并返回新的值。
  - 可以通过字符串形式监听单个数据，也可以通过函数形式监听多个数据。监听的数据发生变化时，侦听器会执行相应的回调函数。
  - 侦听器中的回调函数可以执行<font color=#00FF00>异步操作</font>，例如发送网络请求、操作 DOM 等。

## Vue组件通信的方式
  ### Props / $emit
    - 父组件通过 <font color=#00FF00>Props</font> 将数据传递给子组件，子组件通过 <font color=#00FF00>$emit</font> 发送事件给父组件
  ### $refs
    - 父组件通过 <font color=#00FF00>$refs</font> 引用子组件实例，并直接调用子组件的方法或访问子组件的属性
  ### 事件总线（Event Bus）
    - 创建一个全局的事件中心，用于父子组件之间的通信
    - 父组件通过事件中心 <font color=#00FF00>$emit</font> 发送事件，子组件通过事件中心 <font color=#00FF00>$on</font> 监听事件并做出响应
    - 适合用于兄弟组件之间的通信或者跨层级的组件通信。
  ### Vuex
    - Vuex 是 Vue 的状态管理库，可以用于管理应用的共享状态
  ### $parent / $children
    - 父组件可以通过 <font color=#00FF00>$children</font> 访问直接子组件的实例，子组件可以通过 <font color=#00FF00>$parent</font> 访问父组件的实例。
    - 直接访问父子组件的实例会增加组件间的耦合性，不够灵活。

## Vuex 的核心概念和基本用法。
  ### State
    - 存储应用程序的共享状态
    - 可以通过 <font color=#00FF00>this.$store.state</font> 访问
  ### Getter
    - 类似于计算属性，Getter 可以对状态进行计算和处理，并返回结果
    - 使用时需要定义在 getters 对象中
    - 通过 <font color=#00FF00>this.$store.getters</font> 访问
  ### Mutation
    - Mutation 是一个同步函数，接收状态作为参数，并对状态进行修改
    - 使用时需要定义在 mutations 对象中
    - 通过 <font color=#00FF00>this.$store.commit</font> 提交
  ### Action
    - 类似于 Mutation，但可以处理异步操作
    - 完成后提交 Mutation 来修改状态
    - 使用时需要定义在 actions 对象中
    - 通过 <font color=#00FF00>this.$store.dispatch</font> 分发
  ### Module
    - 用于将 Vuex 的状态划分为多个模块，每个模块可以拥有自己的 state、getters、mutations 和 actions

## Vue 中的动画是如何实现的
  ### 过渡类名
    - v-enter
    - v-enter-active
    - v-enter-to
    - v-leave
    - v-leave-active
    - v-leave-to
  ### 过渡钩子函数
    - before-enter
    - enter
    - after-enter
    - enter-cancelled
    - before-leave
    - leave
    - after-leave
    - leave-cancelled
  ### 过渡模式
    - in-out: 表示新元素先进行过渡，然后旧元素离开过渡
    - in-out: 表示旧元素先进行过渡，然后新元素进入过渡
  <font color=#00FFFF>例：</font>
  ```html
    <template>
      <transition name="fade" mode="out-in">
        <div v-if="show" key="fade">
          <!-- 进入过渡的元素 -->
          <h1>Hello Vue!</h1>
        </div>
      </transition>
      <button @click="toggleShow">Toggle</button>
    </template>
    <script>
    export default {
      data() {
        return {
          show: false,
        };
      },
      methods: {
        toggleShow() {
          this.show = !this.show;
        },
      },
    };
    </script>
    <style>
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    </style>
  ```

## 虚拟DOM
  - 虚拟DOM（Virtual DOM）是一种在内存中构建和操作的抽象DOM表示。它是由Vue和其他一些JavaScript库使用的技术，旨在提高DOM操作的性能和效率。
  ### 原理
    - 初始渲染：当应用程序加载时，Vue会将组件的模板解析成虚拟DOM树。
    - 更新触发：当组件的数据发生变化时，Vue会生成一个新的虚拟DOM树。
    - 对比差异：Vue会将新旧虚拟DOM树进行对比，找出它们之间的差异。
    - 更新DOM：根据差异的结果，Vue只会更新需要变化的部分到实际的DOM中，而不是重新渲染整个组件。
  ### 优势
    - 提高性能：通过对比差异并只更新需要变化的部分，<font color=#00FF00>减少了对实际DOM的操作和重绘</font>，从而提高了性能。
    - 简化开发：开发者可以专注于组件的状态和逻辑，而不需要手动操作DOM。虚拟DOM会自动处理DOM更新的细节。
    - 跨平台能力：虚拟DOM是与平台无关的中间层，可以在不同的环境中使用，如浏览器、移动端和服务器端。

## 单文件组件
  - 单文件组件（Single File Component，SFC）是Vue中一种组织代码的方式，它将组件的模板、脚本和样式都封装在一个文件中，通常使用<font color=#00FF00>.vue</font>作为文件扩展名。
  ### 优势
    - 模块化开发： 将一个组件的所有相关代码放在同一个文件中，提高了代码的可维护性和复用性。
    - 可读性增强：相关的部分可以紧密地结合在一起，便于查找和修改。
    - 构建工具支持： 可以与构建工具（如Webpack、Vue CLI等）配合使用，通过预处理器（如Babel、TypeScript、Sass等）进行编译和打包。
  ### 创建单文件组件
    - 一般以.vue为扩展名的文件，并在文件中编写组件的模板、脚本和样式。
    - 通过导入单文件组件，然后在模板中使用自定义的组件标签来引用和渲染组件。

## mixin混入
  - mixin是Vue中的一种机制，用于提取和共享组件的可复用逻辑
  - 可以减少重复编写代码，提高代码复用性和维护性
  - 使用mixin时需要注意命名冲突、依赖关系和全局污染等问题
  ### 优势
    - 代码复用：将常用的逻辑抽离为mixin，可以在多个组件中共享，避免重复编写相同的代码。
    - 灵活性：mixin的选项可以与组件的选项进行合并，提供了一种灵活的扩展和定制组件的方式
    - 维护性：将共享的逻辑放在mixin中，可以集中管理和维护，减少代码冗余和维护成本。
  ### 使用时需要注意以下几点：
    - 命名冲突：如果多个mixin中有相同的选项（如数据、方法），在合并到组件中时可能会发生命名冲突。可以使用命名空间或前缀来避免冲突。
    - 依赖关系：mixin中的选项会与组件的选项进行合并，<font color=#00FF00>如果存在相同选项，组件选项会覆盖mixin中的选项</font>。需要注意合并顺序和依赖关系，确保最终合并的结果符合预期。
    - 全局污染：mixin中的选项会被混入到所有使用该mixin的组件中，可能会导致全局污染和意外的副作用。需要谨慎使用，并确保mixin中的选项与组件的选项不产生冲突。

## vue中key的作用
  - key属性是用于给Vue的列表渲染（v-for指令）中的每个元素分配一个<font color=#00FF00>唯一标识</font>的特殊属性。
  ### 使用时注意事项
    - key的值应该是唯一且稳定的，最好使用每个元素在列表中的唯一标识作为key值，以确保元素身份的正确追踪。
    - 不推荐使用随机数或索引作为key值，因为它们在列表顺序变化时可能会导致错误的更新行为。
    - 当使用组件进行列表渲染时，key属性也会影响到组件的复用。不同key值的组件会被视为不同的实例，而相同key值的组件会被视为同一个实例，以实现组件的高效复用。

## vue常用指令
  - v-model：用于实现表单元素与Vue实例数据的双向绑定。
  - v-bind：用于动态绑定属性或绑定Vue实例中的数据到HTML元素上。
  - v-if：根据表达式的值来条件性地渲染DOM元素。
  - v-for：用于循环渲染数组或对象的每个元素。
  - v-on：用于监听DOM事件，触发相应的Vue实例方法。
  - v-show：根据表达式的值来显示或隐藏DOM元素。
  - v-text：用于设置元素的文本内容。
  - v-html：用于将HTML代码作为元素的内容进行渲染。
  - v-cloak：用于解决Vue编译过程中的闪烁问题，一般与CSS配合使用。

## v-if与v-show区别
  - v-if 指令根据表达式的值来动态地<font color=#00FF00>添加或移除</font>元素
  - v-show 指令也是根据表达式的值来控制元素的<font color=#00FF00>显示和隐藏</font>
  - v-if 有更高的切换开销
  - 需要频繁切换的场景中，建议使用v-show

## v-if与v-for一起使用
  - vue2中，当它们同时存在于同一个元素上时，Vue 会先执行 v-for 循环，然后再在每次循环中根据 v-if 的条件判断是否渲染对应的元素，会产生不必要的性能开销。
  - vue3 可以在template上使用v-for。
  - vue3 以在同一个元素上同时使用， 并且只进行一次判断。

## vue常用修饰符
  - .prevent：阻止默认事件行为。
  - .stop：阻止事件冒泡。
  - .once：只触发一次事件，即事件处理程序只会执行一次。
  - .capture：使用事件捕获模式，即从外部元素开始触发事件。
  - .self：只在触发事件的元素自身上触发事件，而不是其子元素。
  - .passive：使事件监听器为被动模式，不会调用 preventDefault()，可以提高滚动性能。
  - .sync：用于实现父子组件之间的双向数据绑定。