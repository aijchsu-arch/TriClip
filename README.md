# TriClip Learning Lab — G4 專業教學

以使用者提供的 **TRN1002301 Ver A（©2021 Abbott）** 為主教材，供醫師與 Heart Team 學習的繁體中文互動網站。這是獨立整理的教育初稿，並非 Abbott 官方網站或正式器材訓練認證。

## 公開網站

[開啟 TriClip Learning Lab](https://aijchsu-arch.github.io/TriClip/)

網站由 GitHub Pages 提供 HTTPS 公開存取，不依賴本機預覽伺服器。公開版與 localhost 的學習進度各自儲存。

## 使用方式

直接以 Chrome、Safari 或 ego-lite 開啟 `index.html`，不需要安裝套件、註冊帳號或網路。網站的外部參考連結需要網路。

若要以本機網址瀏覽，在此資料夾開啟 Terminal，執行：

```sh
python3 -m http.server 8386 --bind 127.0.0.1
```

再開啟 <http://127.0.0.1:8386>。看到首頁代表啟動成功；停止時在該 Terminal 按 `Ctrl+C`。若顯示 address already in use，改用其他 port，例如 `8387`。

## 第一版內容

- 六個學習模組：病人選擇、影像、G4 系統、定位、grasp／assessment、deployment／safety。
- NT／NTW／XT／XTW 的互動比較與概念示意。
- 八段流程學習自查。
- 十題測驗、逐題解析與成績。
- 教材頁碼、官方 IFU、RCT 與 guideline 來源。
- 本機學習進度；無病人資料輸入、帳號、追蹤程式或後端服務。

勾選自查及閱讀完成只代表學習進度，不代表臨床資格、認證或可放行手術。瀏覽器可能限制 `file://` 的儲存，若進度無法保留，請使用上述 localhost 方式。不同瀏覽器、網址與裝置不共用進度。

## 檔案

- `index.html`：入口與基本結構。
- `styles.css`：桌機／手機樣式。
- `app.js`：互動與學習進度。
- `content.js`：可編輯的教學內容與來源。
- `SOURCE_NOTES.md`：版本、內容轉換方式與使用限制。

## GitHub 與後續發布

所有網站檔案採相對路徑，可存入 TriClip repo，也可部署到 GitHub Pages 的 project path，不需 build。原始 PPTX、影片、speaker notes 與原始 XML 不在網站中。

依使用者 2026-10-06 指示，以 GitHub Pages 公開發布此教育初稿；未設定登入保護。公開內容為重新整理的教學摘要與原創概念圖，原始簡報、內部 notes 與臨床影片仍保留在本機。公開上線不代表已完成醫師內容核准或正式器材訓練認證。

## 更新原則

1. 編輯 `content.js` 時保留每項內容對應的教材頁碼或外部 source ID。
2. 分別標記教材版本、器材世代、適用市場與查核日期。
3. 不將舊教材 cutoff、trial inclusion criteria 或概念示意當成當前完整 IFU。
4. 不放入病人識別資訊、內部討論、API key 或未確認可公開的影片。

網站教育摘要不取代當地最新 IFU、正式器材訓練及 Heart Team 判斷。

## 本版驗證

已於 2026-10-05 使用 ego-lite 檢查桌機及 390px 手機畫面：搜尋／無結果、模組完成與重新載入保存、器材切換、流程自查、完整測驗 9/10 計分與提交鎖定、重設取消／確認、儲存受限提示、來源跳轉及直接 `file://` 開啟。這些是網站功能測試，不是臨床驗證或醫師內容核准。
