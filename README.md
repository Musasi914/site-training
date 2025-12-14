# Site Training

サイトで使うアニメーションや、こんな機能作れますよという資材置き場のようなもの

## サイト

https://site-training-zeta.vercel.app/

## 概要

このプロジェクトは、Web サイトで使用できるアニメーションや機能のサンプル集です。各サンプルは独立したページとして実装されており、実際のプロジェクトで参考にできるようになっています。

## 技術スタック

- React 19.2.3
- TypeScript
- Vite
- React Router
- GSAP (アニメーション)
- Lenis (スムーススクロール)
- Tailwind CSS

## 新しいページの追加方法

`src/router/pageList.ts`に新しいページを追加するだけで、自動的にルーティングが設定されます。

```typescript
import Site3 from "../sites/site3/site3.tsx";

export const pageList: PageConfig[] = [
  // ... 既存のページ
  {
    path: "/site3",
    component: Site3,
    title: "Site3",
    description: "説明文",
  },
];
```
