# 产品 Demo 自动部署说明

这是一个纯静态 demo。推荐使用 `GitHub + Netlify` 自动部署：

- 其他用户访问 Netlify 公网链接
- 你每次更新 demo 后提交并推送到 GitHub
- Netlify 自动重新部署
- 公开链接保持不变，内容更新为最新版本

## 推荐方式：GitHub + Netlify

1. 在 GitHub 创建一个空仓库
2. 把本项目推送到该仓库
3. 打开 https://app.netlify.com
4. 选择 `Add new site` -> `Import an existing project`
5. 选择 GitHub，并选择这个仓库
6. Build command 留空
7. Publish directory 填 `.`
8. 点击 Deploy
9. Netlify 会生成一个公开链接，例如 `https://your-demo.netlify.app`

## 后续更新方式

每次修改 demo 后：

```bash
git add .
git commit -m "Update demo"
git push
```

Netlify 会自动部署最新版本。

## 生成二维码

拿到公开链接后，把链接发给 Codex：

```text
请帮我把这个链接生成二维码：https://your-demo.vercel.app
```

Codex 会生成二维码图片，方便你发给其他用户扫码访问。
