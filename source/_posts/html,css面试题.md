---
title: 前端css,html面试题
cover: /img/post-css.jpg
categories:
  - 前端面试题
---

近期准备换个坑位，所以整理了一些面试题，希望有用！
本篇主要以html和css内容为主，如需其他，请阅读其他文章。

## HTML5 新特性、语义化

  ### 概念：
    HTML5的语义化指的是合理的使用语义化的标签来创建页面结构。【正确的标签做正确的事】

  ### 语义化标签
    header(头部)
      - 通常包含页面的标题、导航菜单、品牌标识等与页面头部相关的内容
    nav(导航栏)
      - 用于表示页面中的导航菜单或导航链接集合。
    main(内容区域)
      - 一般一个页面只应有一个main标签
    article(表示独立、完整、可以独立分配或复用的内容块的元素)
      - article标签应该包含独立的、自包含的内容，而不是被其他元素依赖或嵌套使用
    section(独立内容区块的元素)
      - 用于将相关的内容组织在一起，通常具有一个标题或主题。
    aside(侧边栏)
      - 通常包含与页面主要内容相关但又可以作为补充的内容
      - 不仅限于侧边栏的用法，它也可以用于其他附加信息的展示，例如广告、引用、附属内容等
    footer(底部内容)
      - 通常包含与页面相关的版权信息、联系信息、导航链接等。
  ### 优点
    - 在没CSS样式的情况下，页面整体也会呈现很好的结构效果
    - 代码结构清晰，易于阅读，
    - 利于开发和维护 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
    - 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

## css选择器优先级
  ### 选择器
    - 元素选择器：通过元素名称选取元素，如 p 选择所有 <p> 元素。
    - 类选择器：通过类名选取元素，以.开头，如 .my-class 选择所有具有 my-class 类名的元素。
    - ID选择器：通过元素的唯一ID选取元素，以#开头，如 #my-id 选择具有 my-id ID的元素。
    - 属性选择器：通过元素的属性值选取元素，如 [type="text"] 选择所有 type 属性值为 text 的元素。
    - 后代选择器：通过元素的后代关系选取元素，使用空格分隔，如 div p 选择所有 <p> 元素，它们是 <div> 元素的后代。
    - 直接子元素选择器：通过元素的直接子元素关系选取元素，使用 > 分隔，如 div > p 选择所有 <p> 元素，它们是 <div> 元素的直接子元素。
    - 兄弟选择器：通过元素的兄弟关系选取元素，使用 + 分隔，如 h2 + p 选择紧接在 <h2> 元素后的 <p> 元素。
    - 伪类选择器：通过元素的状态或特定条件选取元素，以:开头，如 :hover 选择鼠标悬停在元素上的状态。
    - 伪元素选择器：通过元素的特定部分选取元素，以::开头，如 ::before 选择元素的前置内容。
  ### 优先级
    1. ！important
    2. 内联样式
    3. ID选择器
    4. 类选择器，属性选择器，伪类选择器
    5. 元素选择器，伪元素选择器
    6. 通配符，子类，相邻选择器

## position 属性的值有哪些及其区别
  ### static(默认值):
    - 元素按照正常文档流进行定位，不受 top、right、bottom、left 等属性的影响。
  ### relative(相对定位):
    - 元素相对于其正常位置进行定位，通过设置 top、right、bottom、left 属性来调整元素的位置。相对定位不会影响其他元素的布局。
  ### absolute(绝对定位):
    - 元素相对于其最近的已定位（非 static）的父元素进行定位，如果没有已定位的父元素，则相对于文档根元素进行定位。通过设置 top、right、 bottom、  left 属性来指定元素的精确位置。绝对定位会使元素脱离正常文档流，并且不会为其保留空间。
  ### fixed(固定定位):
    - 元素相对于视口进行定位，即无论页面滚动与否，元素都会保持在固定位置。通过设置 top、right、bottom、left 属性来指定元素的精确位置。
  ### sticky(粘性定位):
    - 元素根据正常文档流进行定位，但在滚动到特定阈值时，会变为固定定位。通过设置 top、right、bottom、left 属性和 top、bottom 等阈值来调整元素的位置和触发条件。

## box-sizing属性(盒模型)
  ### content-box(标准盒模型)
    - 宽度和高度分别应用到元素的内容框，在宽度和高度之外绘制元素的内边距和边框。
    - width 指 content 部分的宽度。
  ### border-box(IE 盒子模型 | 怪异盒模型)
    - 为元素设定的宽度和高度决定了元素的边框盒。
    - width 表示 content+padding+border 这三个部分的宽度。
  ### inherit
    - 继承父元素的 box-sizing 值。

## BFC（块级格式上下文）
  ### 概念
    - 块级格式化上下文（Block Formatting Context，BFC）是CSS中的一个概念，用于描述元素在布局时的一种独立的渲染区域。每个BFC都是一个独立的容器，内部元素的布局不会影响到外部元素。
  ### 主要特征
    - 内部元素垂直方向的边距会发生重叠：当多个块级元素嵌套在同一个BFC中时，它们的上下边距可能会发生重叠。
    - BFC可以包含浮动元素：当一个元素触发了BFC，它可以包含浮动元素，并阻止浮动元素溢出到其他区域。
    - BFC可以阻止浮动元素造成的父元素塌陷：当一个元素的子元素都浮动时，如果父元素触发了BFC，它会根据子元素的高度进行布局，不会因为浮动元素而塌陷。
    - BFC在页面布局中的应用：通过触发元素的BFC特性，可以实现一些布局效果，如清除浮动、创建自适应的多栏布局等。
  ### 触发方式
    - 根元素（<html>）是一个BFC。
    - 设置元素的 float 属性为除 none 以外的值。
    - 设置元素的 position 属性为 absolute 或 fixed。
    - 设置元素的 display 属性为 inline-block、table-cell、table-caption 或 flex。

## 元素水平垂直居中
  ### flex布局
    ```css
      .element {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    ```
  ### 定位实现
  - 方式一:
    ```css
      .element {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    ```
  - 方式二:
   ```css
      .element {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    ```
  ### flex布局
    ```css
      .element {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    ```

## 隐藏元素的方式
  - display: none;
    - 元素完全被隐藏掉，文档流中不占据空间，改变布局。
    - 不可触发事件。
  - visibility: hidden;
    - 元素隐藏掉，但仍占据空间，不改变布局。
    - 不可触发事件
  - opacity: 0;
    - 元素变为透明，视觉上不可见，仍占据空间。
    - 可触发事件。

## css实现三角形
  - 思路： 宽高设为0，边框给一定粗度，然后将三边设置为透明
  - 使用边框：
    ```css
      .element {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid red;
      }
    ```
  - 使用伪元素：
    ```css
      .element {
        position: relative;
        width: 100px;
        height: 100px;
      }

      .element::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid blue;
      }
    ```
## 伪类和伪元素的区别
  - 伪类选择的是满足某个条件的元素，而伪元素选择的是元素的某个部分。
  - 伪类以单冒号（:）开头，伪元素以双冒号（::）开头。
  - 伪类用于选择元素的状态或行为，而伪元素用于插入或生成元素的内容。

## 实现响应式设计
  ### 媒体查询
  - 媒体查询是 CSS 中的一种功能，它允许根据不同的媒体特性（如屏幕宽度、设备类型等）应用不同的样式。通过在 CSS 中定义不同的媒体查询规则，可以根据设备的特征为不同的屏幕尺寸提供不同的布局和样式。
  ### 弹性网格布局
  - 弹性网格布局使用相对单位（如百分比）来定义网格的列宽和行高，使得布局可以根据屏幕尺寸的变化自动调整。通过使用弹性网格布局，网页的各个元素可以根据屏幕大小灵活地改变宽度和位置。
  ### 流式布局
  - 流式布局使用相对单位和百分比来定义元素的尺寸，使得页面可以根据屏幕尺寸进行伸缩。相对于固定的像素单位，流式布局可以更好地适应不同设备的屏幕尺寸，提供更好的响应性。
  ### 图片响应式设计
  - 图片响应式设计通过使用不同的图片源（如不同大小或分辨率的图片）来适应不同的屏幕尺寸。可以使用 CSS 的 max-width 属性和 <img> 标签的 srcset 属性来实现图片的响应式展示，以确保在不同设备上加载适合的图片。
  ### 设备像素比
  - 设备像素比是设备物理像素与 CSS 像素之间的比率。通过使用媒体查询和 CSS 的 min-device-pixel-ratio 或 max-device-pixel-ratio 属性，可以针对不同的设备像素比提供不同的样式和布局。
    #### min-device-pixel-ratio && max-device-pixel-ratio
    - 是一个用于媒体查询的 CSS 属性，用于检测设备的像素密度。它用于确定设备物理像素和 CSS 像素之间的比率，并根据设备的像素密度应用不同的样式或布局
    <font color=#00FFFF>例：</font>下面的媒体查询将应用于 min-device-pixel-ratio 属性，仅在设备像素密度比率大于或等于 2 的情况下生效
    ```css
      @media (-webkit-min-device-pixel-ratio: 2),
            (min--moz-device-pixel-ratio: 2),
            (min-device-pixel-ratio: 2) {
        /* 根据高像素密度设备的需要应用样式或布局 */
      }
    ```
    <font color=red>注：</font> min-device-pixel-ratio 属性的值是一个 <font color=red>浮点数</font>，可以根据具体需求进行调整和匹配。同时，由于不同浏览器和设备对于 min-device-pixel-ratio 的支持可能存在差异，建议在使用时进行适当的兼容性处理和测试。
## 优雅降级和渐进增强
  ### 概念
  - 优雅降级和渐进增强是两种前端开发的策略，用于确保网站或应用在不同浏览器或设备上具备基本的可用性和用户体验。
  ### 区别
    - 优雅降级是指首先针对具有较高性能和功能的现代浏览器开发网站或应用，然后逐步提供对较旧或不支持某些功能的浏览器的支持。
    - 渐进增强是指从基本的、核心功能开始，然后根据浏览器的能力逐步增强网站或应用的功能和体验。
## 动画（animation）
  ### 属性
  - animation-name：定义动画的名称，对应关键帧规则中的动画名称。
  - animation-duration：指定动画的持续时间，单位可以是秒（s）或毫秒（ms）。
  - animation-timing-function：设置动画的时间函数，控制动画的速度变化。
  - animation-delay：指定动画开始之前的延迟时间，单位可以是秒（s）或毫秒（ms）。
  - animation-iteration-count：定义动画的播放次数，可以是具体的次数或 infinite（无限循环）。
  - animation-direction：指定动画的播放方向，可以是 normal（正向播放）、reverse（反向播放）或 alternate（来回播放）。
  - animation-fill-mode：设置动画在播放之前和之后的样式状态，可以是 none、forwards、backwards 或 both。
  - animation-play-state：控制动画的播放状态，可以是 paused（暂停）或 running（播放）。
  <font color=red>注：</font> 除了上述属性外，还有一些与动画相关的属性，如 <font color=red>transform、opacity、transition</font> 等，它们可以与动画属性结合使用，实现更丰富的动画效果。
  <font color=#00FFFF>例：</font>
  ```css
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .element {
      animation-name: fade-in;
      animation-duration: 2s;
      animation-delay: 1s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    <!-- 上述示例定义了一个名为 "fade-in" 的动画，通过逐渐改变元素的透明度，实现了一个淡入效果。然后将动画应用于具有 ".element" 类的元素，并设置动画的持续时间为 2 秒，延迟时间为 1 秒，时间函数为 ease-in-out，并无限循环播放。通过组合和调整这些动画属性，可以创建各种各样的 CSS 动画效果，如淡入淡出、平移、旋转、缩放等。根据具体的需求和创意，可以灵活运用这些属性来设计和实现自定义的动画效果。 -->
  ```

## 如何实现溢出省略号
  ### 单行省略号
  ```css
    .ellipsis {
      width: 200px; /* 设置容器的宽度，根据需要进行调整 */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  ```
  ### 多行省略号
    ```css
      .ellipsis {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* 设置显示的最大行数，根据需要进行调整 */
        }
   ```