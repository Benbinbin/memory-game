# 记忆游戏项目

## 游戏原理

该项目构建一个基于浏览器的卡片匹配游戏（也称作 Concentration）。游戏板包含 16 个网格形式的「卡片」，由 8 对不同的卡片组成，每个都在每侧有不同的符号。卡片在网格上随机排列，初始符号朝下。游戏规则很简单：每次翻开两个隐藏的卡片，找到匹配的卡片，直至所有卡片都正确匹配！

每轮游戏：

- 玩家翻开一张卡片，看看符号是什么。
- 玩家然后翻开第二张卡片，尝试找到具有相同符号的对应卡片。
- **如果卡片匹配，两张卡片都保持翻开状态。**
- **如果卡片不匹配，两张卡片都继续盖起来。**

当所有卡片都正确匹配后，游戏结束。

## 游戏演示

### 猜测正确

<video src="Demo/MemoryGameMATCH.mp4"></video>

### 猜测错误

<video src="Demo/MemoryGameWRONG.mp4"></video>

#### 游戏获胜

<video src="Demo/MemoryGameWINNING.mp4"></video>

## 使用技术
使用 HTML 和 CSS 搭建版型，并通过 JavaScript 添加交互。此外该项目还使用了 [jQuery](https://jquery.com/) 和 [Animate.css](https://animate.style/) 框架。

## 说明
该项目的初始代码（静态非交互版本）来自 Udacity 课程[《前端开发（进阶）》](https://cn.udacity.com/course/front-end-web-developer-nanodegree--nd001-cn-advanced)中的[记忆游戏项目](https://github.com/udacity/cn-frontend-development-basic/tree/master/memory-game_zh)。