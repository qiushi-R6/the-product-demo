界面模块拆分说明

- 今日: `sections/today/index.html`
- 测评: `sections/assessment/index.html`
- 体验: `sections/experience/index.html`
- 小组: `sections/community/index.html`

每个界面都有独立样式文件:

- 今日: `sections/today/today.css`
- 测评: `sections/assessment/assessment.css`
- 体验: `sections/experience/experience.css`
- 小组: `sections/community/community.css`

`index.html` 只保留手机壳、进入页、顶部栏、底部导航和模块挂载点。
`app.js` 会在页面启动时加载上面四个模块，并统一处理跨界面跳转。
