# 界面编辑说明

你可以优先编辑 `interface-edit-map.json`。

推荐流程：

1. 打开 `interface-edit-map.json`
2. 找到要编辑的界面，例如 `today`
3. 找到模块，例如 `heroCard`、`dailyQuestion`、`recommendedExperience`
4. 修改里面的文字、位置、字号、按钮风格等参数
5. 保存后告诉 Codex：“请根据 interface-edit-map.json 同步今日界面”

示例：

```json
"questionText": "你真正想靠近的人生，会在哪个瞬间发光？"
```

或者：

```json
"position": {
  "top": "24px",
  "left": "22px",
  "align": "left"
}
```

如果你不知道具体数值，也可以写自然语言：

```json
"style": "更轻盈、更唯美，按钮像金色月光描边"
```

我会把这些描述翻译成对应的 HTML/CSS 修改。
