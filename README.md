# rating-component

> rating vue component 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

# rating-vue-component

我记得当时我拿起CakePHP，我很喜欢开始使用它是多么容易。这些文档不仅结构合理，详尽无遗，而且用户友好。多年以后，这正是我在Vue.js中感受到的。然而，与Cake相比，Vue文档仍然缺少一件事：一个真实的项目教程。

无论框架的文档记录如何，这对每个人来说都是不够的。阅读概念并不总是有助于了解大局或了解如何使用它们来实际制作某些东西。如果您像我一样，通过制作一些可用的组件来更好地学习，并在编码时参考文档，帮助记忆文档和熟练使用Vue。

在本教程中，我们将构建星级评分系统组件。我们将学习几种Vue.js中的概念，我们会在项目中使用到他们，并将讨论为什么我们使用它们。


![rating.gif](https://upload-images.jianshu.io/upload_images/1626952-2c883b42cc4e4902.gif?imageMogr2/auto-orient/strip)

这篇文章深入介绍了如何以及为何。它旨在帮助您掌握Vue.js的一些核心概念，并教您如何为未来的项目做出设计决策。如果您想了解整个思考过程，请继续阅读。否则，您可以查看[CodeSandbox](https://codesandbox.io/s/38k1y8x375)上的最终代码。

## 入门

Vue.js，当然你会以自己作为一个简单的脚本运行而觉得已经不错了，但是当你想使用[单文件组件](https://vuejs.org/v2/guide/single-file-components.html)时情况有点不同。当然，你不一定必须构建以组件的这种方式。您可以完美地使用定义全局组件`Vue.component`。问题是，这需要权衡，例如必须使用字符串模板，没有范围的CSS支持，也没有构建步骤（因此，没有预处理器）。然而，我们希望更深入地学习如何构建一个可以在实际项目中使用的实际组件。出于这些原因，我们将采用由Webpack提供支持的实际设置。

为了简化操作并缩短配置时间，我们将使用[vue-cli](https://github.com/vuejs/vue-cli)和[webpack-simple](https://github.com/vuejs-templates/webpack-simple) Vue.js模板。

首先，您需要在全局安装vue-cli。启动终端并键入以下内容：

    npm install -g vue-cli
    
您需要继续输入：

    vue init webpack-simple path/to/my-project
    
你会在这个过程中被问到几个问题。选择除“使用sass”以外的所有内容，都是为默认值。然后，vue-cli将初始化项目并创建package.json文件。完成后，您可以导航到项目的目录，安装依赖项并运行项目：

    cd path/to/my-project
    npm install
    npm run dev
    
不出意外！Webpack将开始在端口上提供项目8080（如果可用，8080端口没有被其他程序占用）并在浏览器中触发它。如果一切顺利，你应该看到像这样的欢迎页面。

![vue-js-welcome-page.png](https://upload-images.jianshu.io/upload_images/1626952-42f744674e41ebee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 短暂的暂停 - 调试工具

几乎！要正确调试Vue.js组件，您需要正确的工具。继续安装Vue.js devtools浏览器扩展程序（[Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) / [Chrome](https://chrome.google.com/webstore/category/extensions) / [Safari](https://github.com/vuejs/vue-devtools/blob/master/docs/workaround-for-safari.md)）。

## 你的第一个组件

最好的功能之一是Vue.js单文件组件（SFC）。它们允许您在一个文件中定义组件的结构，样式和行为，而没有混合HTML，CSS和JavaScript的常见缺点。

SFC以.vue扩展名结尾，具有以下结构：

    <template>
      <!-- Your HTML goes here -->
    </template>
    
    <script>
      /* Your JS goes here */
    </script>
    
    <style>
      /* Your CSS goes here */
    </style>

让我们来创建我们的第一个组件：创建一个`Rating.vue`文件`/src/components`，然后复制/粘贴上面的代码片段。然后，打开`/src/main.js`并调整现有代码：

    import Vue from 'vue'
    import Rating from './components/Rating'
    
    new Vue({
      el: '#app',
      template: '<Rating/>',
      components: { Rating }
    })
    
最后，为您的`Rating.vue`添加一些HTML：

    <template>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </template>
    
现在查看浏览器中的页面，您应该看到列表！Vue.js将您的`<Rating>`组件附加到`#app`元素中`index.html`。如果检查HTML，则应该看不到该`#app`元素的符号：Vue.js将其替换为`Rating`组件。

旁注：您是否注意到您甚至不需要重新加载页面？那是因为Webpack的[vue-loader](https://github.com/vuejs/vue-loader)带有热重载功能。与实时重新加载或浏览器同步相反，热重新加载不会在每次更改文件时刷新页面。相反，它会监视组件更改并仅刷新它们，保持状态不变。

现在我们已经花了一些时间来设置，但现在是我们实际编写有意义的代码的时候了。

### 模版template

我们将使用[vue-awesome](https://www.npmjs.com/package/vue-awesome)，一个用[Font Awesome](https://fontawesome.com/?from=io)图标构建的Vue.js的SVG图标组件。这允许我们只加载我们需要的图标。继续使用npm（或Yarn）安装它：

    npm install vue-awesome
    
然后编辑您的组件，如下所示：

    <template>
      <div>
        <ul>
          <li><icon name="star"/></li>
          <li><icon name="star"/></li>
          <li><icon name="star"/></li>
          <li><icon name="star-o"/></li>
          <li><icon name="star-o"/></li>
        </ul>
        <span>3 of 5</span>
      </div>
    </template>
    
    <script>
      import 'vue-awesome/icons/star'
      import 'vue-awesome/icons/star-o'
    
      import Icon from 'vue-awesome/components/Icon'
    
      export default {
        components: { Icon }
      }
    </script>

    
好吧好吧，让我们放慢脚步并解释所有这些内容😅

Vue.js使用原生ES6模块来处理依赖项和导出组件。`<script>`块中的前两行表示单独导入图标，因此您最终不会在最终bundle(资源)中找到您不需要的图标。第三个Icon组件是从`vue-awesome`中导出的，因此您可以在您的组件中使用它。

Icon也是一个Vue.js的单文件组件(SFC)，就像我们正在构建的组件那样。如果你打开文件，你会发现它具有与我们完全相同的结构。

该`export default`导出对象文字作为组件的视图模型。我们在当前的`components`中注册了`Icon`组件，因此我们可以在我们的本地使用它。

最后，我们在`<template>`使用HTML它并传递了一个name属性来定义我们想要的图标。组件可以通过将它们转换为kebab-case（例如：`MyComponent`成为`<my-component>）来用作自定义HTML标记。我们不需要在组件内嵌套任何东西，因此我们使用了自闭合标记。

**旁注**：您是否注意到在HTML周围添加了一个`<div>`包装？那是因为我们还在根级别添加了一个计数器`<span>`，而Vue.js中的组件模板只接受一个根元素。如果你不遵循这个规则，你会收到编译错误。

### 样式CSS

如果你已经使用过CSS一段时间了，你知道其中一个主要问题是必须处理它的全局性。嵌套一直被认为是解决这个问题的方法。现在我们知道它可以很快导致特殊性问题，使得样式难以覆盖，亦或无法重用，以及是扩展的噩梦。

像[BEM](http://getbem.com/)这样的方法被发明来通过命名空间类来规避这个问题并保持低特异性。在一段时间内，它是编写干净且可扩展的CSS的理想方式。然后，像Vue.js或React这样的框架和库出现了，并带来了范围样式。

React具有样式化的组件，Vue.js具有组件范围的CSS。它允许您编写特定于组件的CSS，而无需提供什么特定神奇的技巧。您使用“普通”类名编写常规CSS，并且Vue.js通过将数据属性分配给HTML元素并将其附加到已编译样式来确定处理范围。

让我们在组件上添加一些简单的类：

    <template>
      <div class="rating">
        <ul class="list">
          <li class="star active"><icon name="star"/></li>
          <li class="star active"><icon name="star"/></li>
          <li class="star active"><icon name="star"/></li>
          <li class="star"><icon name="star-o"/></li>
          <li class="star"><icon name="star-o"/></li>
        </ul>
        <span>3 of 5</span>
      </div>
    </template>
    

并添加上样式：

    <style scoped>
      .rating {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #a7a8a8;
      }
      .list {
        margin: 0 0 5px 0;
        padding: 0;
        list-style-type: none;
      }
      .list:hover .star {
        color: #f3d23e;
      }
      .star {
        display: inline-block;
        cursor: pointer;
        margin: 0 1px;
      }
      .star:hover ~ .star:not(.active) {
        color: inherit;
      }
      .active {
        color: #f3d23e;
      }
    </style>
    
你看到了scoped属性了吗？这就是告诉Vue.js，如何确定样式范围的原因，因此它们不会泄漏到任何其他地方。如果您正确地在`index.html`复制/粘贴HTML代码，您会注意到您的样式不生效：那是因为它们的作用域是组件！🎉

### 那么怎么样预处理呢？

Vue.js可以轻松地从普通的CSS切换到您最喜欢的预处理器模式。您只需要正确的使用`Webpack loader`，并在`<style>`块上设置简单的属性。还记得我们在生成项目的时候，问我们是否使用`sass`吗，如果选择"是"使用sass。同时vue-cli已经为我们安装并配置了[sass-loader](https://github.com/webpack-contrib/sass-loader)。现在，我们需要做的就是在`<style>`添加`lang="scss"`标记。

我们现在可以使用Sass进行编写组件级别风格的，通过`import`引入Sass，就像使用`import`引入变量，颜色定义等。如果你喜欢的缩进语法（或“sass”符号），只需`lang`属性切换`scss`为`sass`。

### behavior - 行为

现在我们的组件看起来很好，是时候让它工作了。目前，我们有一个硬编码模板。让我们设置一些初始模拟状态并调整模板以便它反映出来：

    <script>
      ...
      export default {
        components: { Icon },
        data() {
          return {
            stars: 3,
            maxStars: 5
          }
        }
      }
    </script>

模版修改：

    <template>
      <div class="rating">
        <ul class="list">
          <li v-for="star in maxStars" :class="{ 'active': star <= stars }" class="star">
            <icon :name="star <= stars ? 'star' : 'star-o'"/>
          </li>
        </ul>
        <span>3 of 5</span>
      </div>
    </template>

我们在这里做的是使用Vue `data`来设置组件状态。您定义的每个属性都会跟着data中的属性进行绑定：如果它发生变化，它将反映在视图中。

我们正在制作一个可重用的组件，因此data需要是一个工厂函数而不是一个对象字面量。通过这种方式，我们获得了一个新对象，而不是对将在多个组件之间共享的现有对象的引用。

我们的data工厂返回两个属性：stars表示当前“激活”星数量，maxStars表示总的星星数量。从这些，我们调整了我们的模板，以便它反映实际组件的状态。Vue.js附带了一系列指令，可以让您在模板中添加表示逻辑，而无需将其与纯JavaScript混合使用。该v-for指令遍历任何可迭代对象（数组，对象文字，映射等）。它也可以将数字作为重复x次的范围。这就是我们所做的v-for="star in maxStars"，所以我们`<li>`对组件中的每个星都有一个。

您可能已经注意到某些属性以冒号为前缀：这是该v-bind指令的简写，它将属性动态绑定到表达式。我们本来可以用它的不省略形式写出来：`v-bind:class`。

当星号处于激活状态时，我们需要<li>元素上附加`active`类。在我们的例子中，这意味着每个`<li>`索引都应该小于`star`才能附加`active`类。我们在`:class`指令中使用了一个表达式，只在当前`star`小于`stars`的时候追加`active`。我们使用相同的条件，这次使用三元运算符来定义与Icon组件一起使用的图标：`star`或`star-o`。


### 计数器应该如何

既然我们的star列表与实际数据绑定，那么我们就应该为计数器做同样的事了。最简单的方法是使用“胡子语法”进行文本插值：

    <span>{{ stars }} of {{ maxStars }}</span>
    
很直白，不是吗？现在在我们的例子中，这可以解决问题，但如果我们需要更复杂的JavaScript表达式，最好在计算属性中对其进行抽象。
    
    export default {
      ...
      computed: {
        counter() {
          return `${this.stars} of ${this.maxStars}`
        }
      }
    }
    
这里有点矫枉过正。我们可以使用模板内表达式可以保持可读性。然而，当您必须处理更复杂的逻辑时，请记住计算属性​​。

我们需要做的另一件事是提供一种方法来隐藏计数器，如果我们不想要它。最简单的方法是使用`v-if`带有布尔值的指令。

    <span v-if="hasCounter">{{ stars }} of {{ maxStars }}</span>
    
data中添加hasCounter属性

    export default {
      ...
      data() {
        return {
          stars: 3,
          maxStars: 5,
          hasCounter: true
        }
      }
    }
    
### 交互

我们差不多完成了，但我们仍然需要实现组件中最有趣的部分：反应性。我们将使用`v-on`处理事件的Vue.js指令，以及`methods`一个可以附加所有方法的Vue.js属性。

    <template>
      ...
      <li @click="rate(star)" ...>
      ...
    </template>
    
methods中

    export default {
      ...
      methods: {
        rate(star) {
          // do stuff
        }
      }
    }
    
我们在上面添加了一个`@click`属性`<li>`，这是一个简写`v-on:click`。该指令包含我们在methods组件属性中定义的rate方法的调用。

**“等一下......这看起来非常熟悉HTML的onclick属性。在HTML中使用内联JavaScript不是一种过时的错误做法吗？“**

确实如此，但即使语法看起来很像`onclick`，比较两者也是一个错误。当您构建Vue.js组件时，您不应将其视为分离的HTML / CSS / JS，而应将其视为使用多种语言的一个组件。当项目在浏览器中编译后，所有HTML和指令都编译为纯JavaScript。如果在浏览器中检查呈现的HTML，则不会看到任何指令的迹象，也不会看到任何onclick属性。Vue.js编译了您的组件并创建了正确的绑定。这也是您可以直接从模板访问组件上下文的原因：因为指令绑定到视图模型。与具有单独HTML的传统项目相反，模板是组件的组成部分。

回到我们的`rate`方法。我们需要在click时候修改stars为当前`li`的索引，所以我们从`@click`指令传递索引，我们可以执行以下操作：

    export default {
      ...
      methods: {
        rate(star) {
          this.stars = star
        }
      }
    }

在浏览器中查看页面并尝试点击星标：**它有效！**

如果您在浏览器devtools中打开Vue面板并选择该<Rating>组件，您将在单击星标时看到数据发生变化。这表明您的stars属性是被绑定的：当您对其进行修改时，它会将其更改分派给视图。这个概念称为数据绑定，如果你曾经使用过像Backbone.js或Knockout这样的框架，你应该熟悉它。不同之处在于Vue.js与React一样，仅在一个方向上执行：这称为单向数据绑定。但这个话题又可以用另一篇文章来讨论了😊

到这个点上，我们可以称之为完成，但我们可以做更多的工作来改善用户体验。

现在，我们实际上不能给出零等级，因为点击一个星标将`stars`设置为其索引，而`li`的索引永远大于0。更好的做法是重新点击同一颗星并让它切换当前状态而不是保持活跃状态​​。

    export default {
      ...
      methods: {
        rate(star) {
          this.stars = this.stars === star ? star - 1 : star
        }
      }
    }
    
现在，如果点击的星的索引等于当前值stars，我们减少它的值。否则，我们为其赋值star。

如果我们想彻底，我们还应该添加一层保护，以确保stars永远不会分配一个没有意义的值。我们需要确保stars永远不会少于0，永远不会超过maxStars，并且这是一个合适的数字。

    export default {
      ...
      methods: {
        rate(star) {
          if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
            this.stars = this.stars === star ? star - 1 : star
          }
        }
      }
    }


### passing props 属性传递

现在，组件的数据在data属性中是硬编码的。如果我们希望我们的组件实际可用，我们需要能够从其实例传递自定义数据。在Vue.js中，我们用props可以做到。

    export default {
      props: ['grade', 'maxStars', 'hasCounter'],
      data() {
        return {
          stars: this.grade
        }
      },
      ...
    }
    
并在`main.js`：

    new Vue({
      el: '#app',
      template: '<Rating :grade="3" :maxStars="5" :hasCounter="true"/>',
      components: { Rating }
    })

这里有三件事需要注意：

首先，我们使用`v-bind`简写来从组件实例传递props：这就是Vue.js所谓的动态语法。当您想要传递字符串值时，您不需要它，使用文字语法（不带v-bind的正常属性）将起作用。但在我们的例子中，由于我们传递数字和布尔值，所以我们这样做很重要。

`props`和`data`特性是在编译时合并了，所以props中的属性会被视图模型中的标签绑定(如果定义了)。但出于同样的原因，我们不能使用相同的名称props和data属性，否则data中的属性会被props中的属性覆盖。

最后，我们定义了一个grade props，并通过它作为一个data的stars属性。之所以我们这样做，而不是直接使用grade props，是因为当我们改变等级时，star会发生修改。在Vue.js中，props是从父母组件传递给孩子组件，而不是相反，所以你不会意外地改变父母的状态。这将违反单向数据流原则并使事情更难调试。这就是为什么你应该不尝试修改子组件内的属性。相反，定义一个data使用prop的初始值作为自己的本地属性，也是一个很好的选择。

### 最后的修改

我们将使用Vue.js中的一个很不错的功能: prop validation

Vue.js允许您在将数据传递给组件之前对其进行控制。您可以执行以下四项主要操作：检查类型，要求定义prop，设置默认值以及执行自定义验证。

    export default {
      props: {
        grade: {
          type: Number,
          required: true
        },
        maxStars: {
          type: Number,
          default: 5
        },
        hasCounter: {
          type: Boolean,
          default: true
        }
      },
      ...
    }
    
我们使用类型检查来确保将正确类型的数据传递给组件。如果我们忘记使用动态语法传递非字符串值，这将特别有用。我们还确保`grade`是符合组件的给定要求进行传递的。对于其他道具，我们定义了默认值，因此即使没有传递自定义数据，组件也能正常工作。

现在我们可以通过执行以下操作来实例化组件：

    <Rating :grade="3"/>
    
就是这样！您创建了第一个Vue.js组件，并探讨了很多概念，包括生成与样板谟[VUE-CLI](https://github.com/vuejs/vue-cli)，单文件组件，在组件数据传递，[scope style](https://vuejs.org/v2/guide/comparison.html#Component-Scoped-CSS)，指令，事件处理，计算属性，[Vue methods](https://vuejs.org/v2/guide/instance.html#Data-and-Methods)，单方式数据流，props和prop validation。而这仅仅是Vue.js所提供的浅显的功能！

这是一个非常密集的教程，所以如果你不理解一切，不要担心。再次阅读，在各部分之间暂停，探索并摆弄CodeSandbox上的代码。如果您对本教程有任何疑问或评论，请不要犹豫，在[微博](https://weibo.com/2616693565/fans?topnav=1&wvr=6&mod=message&need_filter=1)上@我！

## 结尾

如果您有幸已经读到这里，相信一定对您有所帮助。

本文为翻译文，并添加一些自己的讨论，很多地方不流畅，请见谅。

本文的源码[rating-vue-component](https://github.com/beyondverage0908/rating-vue-component)，如果对您有用，希望您给个star