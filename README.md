# Stopwatch

素のHTML/CSS/JavaScriptのみで作成された、シンプル＆モダンなストップウォッチアプリです。フレームワークやビルドツールは一切使用していません。

## 特徴

- **スタート / ストップ / リセット** ボタン操作
- 表示形式は `MM:SS.cc`（分:秒.1/100秒）
- スタート中はボタンの表記と色が「ストップ」に切り替わり、状態が一目で分かる
- ダークモード基調のミニマルなデザイン
- スマートフォン対応のレスポンシブレイアウト
- `requestAnimationFrame` によるなめらかな描画と、`performance.now()` による高精度計測

## ファイル構成

```
.
├── index.html   # マークアップ
├── style.css    # スタイル（ダークモード／レスポンシブ）
├── script.js    # ストップウォッチのロジック
└── README.md    # このファイル
```

## ローカルでの動作確認

任意の方法でこのディレクトリを静的にホストしてください。

```bash
# 例: Python の組み込みサーバ
python3 -m http.server 8000
# → http://localhost:8000 をブラウザで開く
```

`index.html` をブラウザで直接開いても動作します。

## Vercel へのデプロイ手順

`vercel.json` などの設定ファイルは不要で、静的ファイルのみで動作します。

### 方法 1: Vercel CLI を使う

1. Vercel CLI をインストール
   ```bash
   npm i -g vercel
   ```
2. プロジェクトのルートで以下を実行
   ```bash
   vercel
   ```
3. 質問に回答（既存プロジェクトとリンクするか、新規作成するか等）すればデプロイ完了
4. 本番デプロイする場合は
   ```bash
   vercel --prod
   ```

### 方法 2: GitHub 連携でデプロイ

1. このリポジトリを GitHub にプッシュ
2. [Vercel ダッシュボード](https://vercel.com/new) で **Add New... → Project** を選択
3. 該当のリポジトリを **Import**
4. 設定はデフォルトのままで OK
   - Framework Preset: **Other**（自動検出されます）
   - Build Command: 空欄（不要）
   - Output Directory: 空欄（ルートをそのまま配信）
5. **Deploy** をクリック

数十秒で本番 URL が発行されます。以降、対象ブランチへの push で自動デプロイされます。

## ライセンス

MIT
