/* Source-based educational summaries. The original 2021 deck stays outside this repository. */
window.TRICLIP = {
  modules: [
    { id: 'selection', kicker: '01 · PATIENT SELECTION', title: '病人選擇與證據邊界', minutes: 8, summary: '把症狀、解剖可行性、RV 與預期獲益放進同一場 Heart Team 討論。', slides: '8、23、26–27、171–173；外部資料 S2–S6', sections: [
      {title:'先辨識教材的時間與市場',body:'本課程主要來源為 2021 年 TRN1002301 Ver A，共 176 張投影片。原教材第 8 頁列出的 gap ≤1.0 cm、sPAP >60 mmHg 等條件，屬該年代訓練版本，不可直接當成今日各市場的通用適應症。',caution:'實際使用須核對所在地、確切 G4 型號與最新 IFU。本站尚未核驗台灣現行核准範圍。'},
      {title:'Heart Team 的評估問題',body:'先確認 severe TR 對症狀與功能的影響，並檢視 optimal medical therapy 後的狀態；再討論手術風險、預期獲益與 TEER 的解剖可行性。',bullets:['影像是否足以辨識目標瓣葉、抓取區與 leaflet insertion？','是否有抓取區 cleft、tethering、複雜 prolapse 或導線干擾？','RV dysfunction、pulmonary vascular disease 與整體病程，是否限制介入的臨床獲益？']},
      {title:'當代參考與舊版教材分開讀',body:'2024 年美國 G4 IFU：對 OMT 後仍有 symptomatic severe TR、手術風險 intermediate 或以上，且 Heart Team 預期 TEER 可將 TR 降至 moderate 或以下者，以改善 QoL 與功能為治療目的。這是美國文件，並非台灣核准聲明。',bullets:['該 IFU 的禁忌包括無法耐受程序抗凝、無法處理的植入物材料過敏，以及 active endocarditis／其他 active TV infection。','2025 ESC/EACTS 對無須同時接受 left-sided valve surgery 的指定 high-risk severe TR 情境給予 transcatheter TV treatment Class IIa A；須無 severe RV dysfunction 或 pre-capillary PH。'],caution:'Guideline 的 transcatheter TV treatment 建議涵蓋治療類別，不是 G4 個別病人的自動許可。詳見資料來源 S2、S6。'},
      {title:'情境思考：症狀明顯，但瓣葉看不清楚',body:'「severe TR + 高風險」仍不足以證明 TEER 適合。先改善影像並釐清 leaflet insertion 可否確認，再由 Heart Team 評估方案。生活品質、HF hospitalization 與 mortality 的證據應分開說明。',caution:'TRILUMINATE 兩年結果支持較低 recurrent HF hospitalization；尚未證實 mortality benefit。研究結果不能全數標為 G4-only 效果。'}
    ]},
    { id:'imaging', kicker:'02 · IMAGING', title:'用影像建立共同座標', minutes:9, summary:'每個 view 都有任務：定位、垂直度、瓣葉辨識與 insertion 確認。', slides:'28–41、104–105、113–114', sections:[
      {title:'先把「垂直」說清楚',body:'DC shaft 要相對 valve plane 垂直；implant arms 則相對目標 line of coaptation 垂直。這是不同的空間條件，需要多切面交叉確認。',bullets:['使用 aortic–posterior 與 septal–lateral 的解剖方向溝通。','以 aorta、septum 等 landmark 辨識瓣葉；不要固定假設 tactile marker 永遠對應同一瓣葉。']},
      {title:'TEE view 與任務對照',body:'教材角度是取得影像的起點，實際切面須依個別解剖與影像品質調整。',bullets:['Bicaval：搭配 fluoroscopy，協助 straddle 與初始 RA positioning。','RV inflow/outflow 約 60–90° + X-plane：沿 septal leaflet 定位、檢查 DC 軸向與 grasp。','4-chamber 約 0–40°／long axis 約 140–180°：評估 S/A 或 S/P grasp、leaflet insertion。','Transgastric SAX 約 30–50°：觀察 arms 對 coaptation line 的方向；術前就要評估能否取得。','3D en face：辨識瓣葉及 valve 上方的位置與方向。']},
      {title:'Leaflet insertion 是獨立的確認工作',body:'以多切面確認兩片瓣葉都有足夠 insertion、相對 arm tips 的活動受限，以及形成的 valve orifice 與 residual TR。影像漂亮或 color jet 變小，都不能單獨取代 insertion assessment。',bullets:['教材建議於約 60° arm angle 進行系統性評估。','TEE 若仍無法確認，可評估補充 TTE 或 ICE（教材 p.31、114）。'],caution:'Fluoroscopy 反映器材姿態與標記，不能取代 echo 對瓣葉的評估。'},
      {title:'情境思考：TR 下降，但只有一側 insertion 清楚',body:'先補足另一側瓣葉的影像確認；若仍不確定，不能把 TR reduction 當成已完成雙瓣葉捕捉。回到影像、軸向與 grasp 品質檢查，必要時依正式訓練重新評估 grasp。'}
    ]},
    {id:'device', kicker:'03 · DEVICE SYSTEM',title:'認識 G4 系統與四種 implant',minutes:7,summary:'分清楚 arm length、arm width 與 leaflet insertion，理解 CGA 的角色。',slides:'12、14–24',sections:[
      {title:'器材由哪些部分協作？',body:'TriClip Steerable Guide Catheter（TSGC）提供 RA access 與 guide positioning；delivery system 由 sleeve、delivery catheter、handle 與 implant 組成。Stabilizer、lift 與 support plate 提供系統支撐。',bullets:['Guide +/−：調整高度與 curve。','Guide S/L 與 torque：調整 septal–lateral 位置與 approach。','TCDS F/E：調整 flex／extend。','Stabilizer translation：移動系統的 aortic–posterior 位置。']},
      {title:'四種 implant：長度 × 寬度',body:'NT／NTW 為 9 mm arm length；XT／XTW 為 12 mm。NT／XT 的 arm width 為 4 mm；NTW／XTW 為 6 mm。這些值不是整體 implant span，也不是 coaptation gap。',caution:'原教材 p.20 把 arm length 標 nominal；p.22／171 與 2024 美國 IFU 表 2 標 maximum。本站比較表採 maximum arm length／maximum arm width，並保留版本差異。'},
      {title:'尺寸選擇需要考慮什麼？',body:'較長的 arm 需要足夠瓣葉組織插入；較寬的 arm 會改變夾持範圍。教材以 NT／NTW 約 6 mm、XT／XTW 約 9 mm insertion 說明完整 frictional element engagement 的概念。',bullets:['共同評估可用 leaflet length、tethering、jet width、chordae／lead 干擾與 gradient。','較長或較寬不代表對所有解剖都更合適。'],caution:'Insertion 長度不能單獨構成植入判準；需以實際多切面影像確認。'},
      {title:'Controlled Gripper Actuation（CGA）',body:'CGA 允許 simultaneous 或 independent leaflet grasping。兩個 gripper lever 各自控制一側；下瓣前應在 RA 辨認 gripper orientation 及 lever 對應關係。',bullets:['教材先嘗試 simultaneous capture，未成功時再依影像評估 leaflet optimization／independent grasping。','Latch 時應確認兩個 lever 高度一致，避免干擾 gripper angle。']}
    ]},
    {id:'positioning',kicker:'04 · POSITIONING',title:'定位、垂直度與安全移動',minutes:8,summary:'把高度、軸向和 coaptation line 分別確認，理解動作之間的影響。',slides:'2–3、85–105',sections:[
      {title:'初始 RA positioning 的三個目標',body:'在 aortic–posterior 與 septal–lateral 方向對準目標，使 DC shaft 對 valve plane 垂直，並讓 implant tip 保持在瓣葉上方。每次調整後重新確認各切面。',caution:'不同解剖與 valve orientation 會改變調整的效果；不能把 knob 方向當成固定的三維導航公式。'},
      {title:'進入與 flex 的重要提醒',body:'教材強調 implant 通過 guide、離開 guide RO ring 時 guide 應相當平直；確認 sleeve 與 guide alignment markers 的關係，再依 IFU 調整系統。',bullets:['Sleeve tip 不可 deflect 超過 90°（教材 p.96）。','顯著阻力是停止強行操作、重新評估的訊號。','尚未準備 grasp 前，維持 implant 在瓣葉上方以降低 chordal entanglement 風險。']},
      {title:'下瓣前先確認 orientation',body:'在 RA 以多切面完成 arms 對 coaptation line 的方向確認、釋放 stored torque，並辨識 gripper orientation。下瓣前再查核 septal–lateral alignment 與 DC 軸向。',caution:'教材 p.101、103 的旋轉限制屬特定步驟，不能合併成通用角度上限；完整操作請依對應 IFU。'},
      {title:'情境思考：要在 RV 內大幅旋轉修正嗎？',body:'教材反對在 RV 內大幅調整 arms orientation，因為可能纏繞 subvalvular apparatus。先辨識目前位置、組織關係與影像，依正式訓練回到適當位置重整 alignment。'}
    ]},
    {id:'grasp',kicker:'05 · GRASP & ASSESS',title:'抓取與植入前評估',minutes:10,summary:'把「捕捉到了」與「足夠且穩定的 insertion」分開驗證。',slides:'108–123、27、171–172',sections:[
      {title:'Grasp 的前提',body:'確認 grippers 已抬起、DC axial alignment 合適、arms 與目標 coaptation line 垂直。依教材，grasp 時 arms 約 120°，瓣葉應可自由在 arms 上方移動。',caution:'這是訓練概念摘要，不是完整 bedside 操作指令。Grasp 過程需 echo 與 fluoroscopy 監控。'},
      {title:'捕捉後保護瓣葉',body:'確認雙側 grippers 已落在瓣葉上，再進入 closure 與 insertion assessment；避免在 capture 後增加瓣葉張力。',bullets:['雙側 leaflet immobilization 與 insertion 應在多切面可被確認。','TR reduction 是綜合評估的一部分，不是唯一判準。','疑似 inadequate grasp 時，依 IFU 與受訓團隊判斷重新評估，不以強力閉合補救。']},
      {title:'不要為了更小的 jet 過度閉合',body:'教材要求適當 coaptation 與 TR reduction，並避免過度用力或閉合過緊。完成 pre-deployment implant assessment 時，還需檢查 final arm angle、穩定性與 mean transvalvular gradient。',caution:'教材 p.27／172 提醒 pre-implant mean gradient ≤3 mmHg 與 ≥5 mmHg 的 stenosis 風險。這是教材提醒值；不能以單一數字取代完整血流動力與當地 IFU 評估。'},
      {title:'情境思考：還有 residual TR，要直接再放一枚嗎？',body:'先釐清 residual jet 位置、目前 clip insertion 與穩定性，並重新評估 gradient、剩餘 valve orifice 及可用瓣葉。再放一枚可能改善 TR，也可能增加 stenosis 或干擾既有 implant；需整合評估。'}
    ]},
    {id:'deployment',kicker:'06 · DEPLOYMENT & SAFETY',title:'Deployment 與安全檢核',minutes:8,summary:'理解關鍵先後關係，以及 deployment 後仍須完成的影像確認。',slides:'123–137、141–158、171–175',sections:[
      {title:'從確認到 deployment',body:'Pre-deployment assessment 包括 insertion、TR reduction、gradient 與 final arm angle。接著依完整 IFU 進行 lock line removal 及 delivery catheter detachment。',caution:'不可把這個摘要當成 lock、unlock 或 release 的完整操作手冊。'},
      {title:'關鍵順序：Gripper levers',body:'教材 p.125、130–132 強調：在 actuator 完成對應釋放步驟後，須 fully retract gripper levers，再依規定 retract DC handle。漏做可能增加 detachment force 與對瓣葉施加的力量。',bullets:['阻力出現時，先停下並依影像確認 implant 是否已與 DC 分離。','不同 separation 狀態有不同 troubleshooting 分支；不要自行把 force 加大。']},
      {title:'Deployment 後再確認',body:'以 echo 確認 implant position、雙側 leaflet insertion、valve function 與 residual TR。若考慮第二枚 implant，須避免移位或扯落既有 implant，並持續評估 gradient。',bullets:['Deployment 不是影像檢查的終點。','SLDA、chordal injury、embolization、perforation／tamponade 與 vascular complications 都屬安全教學重點。']},
      {title:'附帶 implant 撤回的概念',body:'這與已 deployment 後移除 delivery system 的路徑不同。教材 p.150、158 提醒 guide 平直、F/E 與 S/L neutral，以及 arms 對 guide curve plane 的方向。',caution:'撤回步驟還包含 guide／introducer、aspiration 與 air embolism 預防，必須使用完整 IFU；本站不重製該完整故障處置流程。'}
    ]}
  ],
  devices:[
    {id:'nt',name:'NT',armLength:'9 mm',width:'4 mm',description:'短 arm、標準寬度。學習重點是把可用 leaflet length 與足夠 insertion 一起評估。',caveat:'數字為 maximum arm length／arm width；不是展開後 span。型號不由單一 gap 數字決定。',slides:'20–23、171；S2 p.4'},
    {id:'ntw',name:'NTW',armLength:'9 mm',width:'6 mm',description:'短 arm、較寬 arm。W 表示 wider；相較 4 mm arm 寬度增加 50%。',caveat:'較寬的夾持範圍仍需評估 gradient、組織與鄰近結構；不代表治療效果增加 50%。',slides:'20–23、171；S2 p.4'},
    {id:'xt',name:'XT',armLength:'12 mm',width:'4 mm',description:'長 arm、標準寬度。教材強調較長 arm 需要相應的瓣葉 insertion。',caveat:'Arm length 不等於 leaflet insertion。教材約 9 mm insertion 為 frictional element engagement 概念，非獨立適應症。',slides:'20–23、171；S2 p.4'},
    {id:'xtw',name:'XTW',armLength:'12 mm',width:'6 mm',description:'長 arm、較寬 arm。同時考慮 leaflet length、jet width 與 valve gradient。',caveat:'最大尺寸不代表最適合。需評估 chordae／lead 干擾、leaflet tethering 及 stenosis 風險。',slides:'20–23、171；S2 p.4'}
  ],
  steps:[
    {title:'術前規劃',focus:'可行性與預期獲益',body:'用 Heart Team 問題清單整理 severe TR、症狀、治療、影像及風險。',checks:['能說明治療目標與 evidence limitations','能列出影像、RV／PH 與解剖評估需求'],caution:'這是學習自查，不會產生個案 eligibility 或手術放行判定。',slides:'8、23、26–31；S2、S6'},
    {title:'準備與進入',focus:'Access 與器材準備',body:'辨認 guide、sleeve、delivery catheter 與 stabilizer，理解 flushing、de-airing 及監測的重要性。完整步驟由正式 IFU 提供。',checks:['能分辨各組件及其功能','知道器材準備與 air embolism 預防不可省略'],caution:'本站不提供簡化的抗凝處方或完整 sterile preparation SOP。',slides:'14–19、59–88'},
    {title:'RA positioning',focus:'高度與 approach',body:'建立 aortic–posterior、septal–lateral 定位，確認 DC 軸向及足夠瓣上高度。',checks:['能區分 shaft 對 valve plane 與 arms 對 coaptation line 的垂直度','知道每次動作後要交叉確認影像'],caution:'顯著阻力時不強行旋轉或推進。',slides:'89–99'},
    {title:'方向與下瓣前確認',focus:'多切面 alignment',body:'在 RA 辨識 gripper orientation、確認 target leaflets 與 arms 方向，再依正式流程下瓣。',checks:['能解釋為何先辨認 lever 與 gripper 的對應','能說明避免在 RV 內大幅重新定向的原因'],caution:'Tactile marker 不保證永遠對應同一瓣葉。',slides:'100–109'},
    {title:'Grasp 與 insertion',focus:'雙側組織捕捉',body:'確認雙側 leaflet insertion、活動度與 coaptation，再評估 residual TR。需要時以其他切面或影像方式補強。',checks:['知道 TR reduction 不能單獨證明 grasp 安全','能說明 capture 後避免增加瓣葉張力'],caution:'影像仍有疑慮時，不能直接視為 grasp 成功。',slides:'110–119'},
    {title:'植入前評估',focus:'穩定性與 gradient',body:'整合 insertion、valve function、TR、final arm angle 及 mean pressure gradient。',checks:['能列出部署前需要複核的影像項目','理解過度閉合與 stenosis 風險'],caution:'自查勾選不代表可進行 deployment。',slides:'120–123、27'},
    {title:'Deployment',focus:'順序與阻力',body:'完整依 IFU 進行 release；記得 gripper levers 與 DC detachment 的先後關係。',checks:['知道 retract DC handle 前須完成 gripper lever 對應步驟','知道遇阻力應辨識分離狀態並依 IFU troubleshooting'],caution:'不是 bedside 操作指南，不能只照本站執行 release。',slides:'125–134'},
    {title:'最終評估與撤回',focus:'確認結果與安全移除',body:'重新確認 implant 與雙側 leaflet insertion、TR 與 gradient；區分有無 attached implant 的移除流程。',checks:['知道 deployment 後仍須影像驗證','能區分 additional implant 與 removal 的主要風險'],caution:'完整撤回及 air embolism 預防須依對應 IFU。',slides:'135–158'}
  ],
  quiz:[
    {id:'q1',question:'原教材第 8 頁列出 gap ≤1 cm。最合適的解讀是？',options:['可直接視為所有市場今日的唯一 eligibility cutoff','這是 2021 訓練版本條件，須核對當地現行 IFU 與完整解剖','只要 gap 較小就不需要 Heart Team','可以用來預測 mortality benefit'],answer:1,explanation:'教材有時間與市場邊界。不能把舊版 inclusion 或訓練條件直接提升成今日通用適應症。',slides:'8、171；S2'},
    {id:'q2',question:'NTW 的 6 mm 指的是什麼？',options:['Arm width（maximum）','Arm length','最小可治療 coaptation gap','完整 implant 在 180° 的 span'],answer:0,explanation:'NTW 的 arm length 為 9 mm，arm width 為 6 mm。Arm 寬度、長度、展開 span 與 gap 是不同定義。',slides:'20–23；S2 p.4'},
    {id:'q3',question:'哪一組最符合教材的影像任務？',options:['Fluoroscopy 直接確認 leaflet insertion','3D en face 單獨取代全部抓取影像','Transgastric SAX 觀察 arms 與 coaptation line 的方向','只使用一個固定 TEE angle'],answer:2,explanation:'Transgastric SAX 有助 arms alignment；多切面 echo 用於抓取與 insertion。Fluoroscopy 不能取代瓣葉影像。',slides:'29–40、105'},
    {id:'q4',question:'進入 RV 前，gripper lever 與瓣葉的關係應如何處理？',options:['固定假設 tactile marker 一定代表 septal leaflet','下瓣後才開始辨認','不需辨認，CGA 會自動選擇','在 RA 以 anatomical landmarks 與影像辨識對應'],answer:3,explanation:'解剖及系統 orientation 會影響 gripper 對應；事先辨認才能有意義地使用 independent grasping。',slides:'3、40、103–104'},
    {id:'q5',question:'抓取後 TR 明顯下降，但一側 insertion 不清楚。應如何解讀？',options:['TR 下降已證明雙側 capture','仍需補足雙側 insertion 的影像確認','直接更緊地閉合即可','立即以測驗勾選通過 deployment'],answer:1,explanation:'需綜合 leaflet immobilization、相對 arm tips 的活動與 insertion、valve orifice 及 residual TR。Color jet 改善不足以獨立判定。',slides:'113–121'},
    {id:'q6',question:'為何不應在 RV 內大幅旋轉修正 implant orientation？',options:['可能纏繞 subvalvular apparatus 並造成損傷','因為只能在 fluoroscopy 下旋轉','因為較寬的 implant 永遠不需調整','因為任何方向誤差都不影響 grasp'],answer:0,explanation:'教材要求下瓣前完善 alignment，並警告 RV 內大幅 orientation 調整的 chordal entanglement 風險。',slides:'101–109'},
    {id:'q7',question:'TR 仍有殘餘，但 gradient 已令人擔心。接下來的原則是？',options:['一定換最大 implant','不看 gradient，只追求最小 color jet','整合 insertion、orifice、gradient 與殘餘 TR 再評估','測驗答對即可判定加放 clip'],answer:2,explanation:'TR reduction 與 valve stenosis 風險必須共同評估；長／寬 implant 或追加 implant 都需考量 gradient。',slides:'22–27、123、137'},
    {id:'q8',question:'教材強調在對應 actuator release 步驟後、DC handle retract 前，須確認什麼？',options:['增加對瓣葉的張力','把 guide 轉到最大角度','跳過 final arm angle assessment','Gripper levers 已 fully retracted'],answer:3,explanation:'漏做 gripper lever retraction 可能增加 detachment force；這項記憶點不能取代完整 IFU deployment sequence。',slides:'125、130–132'},
    {id:'q9',question:'TRILUMINATE 2025 兩年 recurrent HFH 0.19 vs 0.26 的單位是？',options:['住院病人百分比','Event／patient-year','死亡相對風險','KCCQ 分數'],answer:1,explanation:'這是 recurrent HF hospitalization 的年化事件率，採完整 randomized cohort n=572；不是 19% vs 26% 的住院病人比例。',slides:'外部來源 S5'},
    {id:'q10',question:'如何向 Heart Team 說明目前的 randomized evidence？',options:['已證實所有 G4 病人的 survival benefit','Win ratio 等同 mortality risk ratio','區分 QoL、TR、HFH 與死亡；目前未證實 mortality benefit','2023 和 2025 的 cohort 一律都是 n=350'],answer:2,explanation:'2023 初始 cohort n=350，2025 完整 cohort n=572。兩年資料支持 recurrent HFH 降低，不能推論死亡獲益或 G4-only efficacy。',slides:'外部來源 S4、S5'}
  ],
  evidence:[
    {title:'2023 · TR 與生活品質',body:'TRILUMINATE Pivotal 初始 RCT n=350。一年 hierarchical composite win ratio 1.48（95% CI 1.06–2.13）；KCCQ 改善 12.3 vs 0.6 分。一年死亡／TV surgery 與 HFH 未顯示組間差異。',sourceIds:['S4']},
    {title:'2025 · Recurrent HF hospitalization',body:'完整 randomized cohort n=572。兩年 HFH 為 0.19 vs 0.26 event/patient-year；HR 0.72（one-sided upper confidence limit 0.93，P=0.02）。這是事件率，不是住院病人比例。',sourceIds:['S5']},
    {title:'死亡終點需獨立解讀',body:'兩年 all-cause mortality 17.9% vs 17.1%；未證實 mortality benefit。含 TV intervention 的複合終點受 control crossover 影響。這些 trial 資料不是 G4-only efficacy。',sourceIds:['S5']},
    {title:'2025 · ESC/EACTS guideline',body:'對 OMT 後仍有 symptomatic severe TR、無須同時接受 left-sided valve surgery 的 high-risk 病人，且無 severe RV dysfunction 或 pre-capillary PH，應考慮 transcatheter TV treatment（IIa A），改善 QoL 與 RV remodelling。仍須 Heart Team 評估。',sourceIds:['S6']}
  ],
  sources:[
    {id:'S1',title:'TriClip G4 Therapy Training',type:'主要教材 · 2021',detail:'Abbott，TRN1002301 Ver A，©2021，176 slides。使用者提供的 PPTX。本站為重新整理的教學摘要，不是逐頁全文或完整 IFU；來源頁碼指投影片順序。原始檔、內部 speaker notes、臨床影片均未納入網站。',slides:'1–176'},
    {id:'S2',title:'FDA · TriClip G4 Instructions for Use',type:'官方 IFU · 美國，2024-03-28',detail:'EL2140056；p.4 尺寸，p.5 適應症／禁忌。為可公開核對的美國核准文件，不宣稱是所有市場最新 IFU，也不等同台灣核准範圍。',url:'https://www.accessdata.fda.gov/cdrh_docs/pdf23/P230007C.pdf'},
    {id:'S3',title:'Abbott · TriClip 官方產品及安全資訊',type:'官方網站 · 查核 2026-10-05',detail:'頁面同時含 G4 與 G5 資訊。本站器材教學限定 G4，不能將其他世代規格直接套用；使用前請核對當地最新型號與 IFU。',url:'https://www.cardiovascular.abbott/us/en/hcp/products/structural-heart/transcatheter-valve-solutions/triclip.html'},
    {id:'S4',title:'Sorajja et al. · TRILUMINATE Pivotal',type:'RCT · NEJM 2023',detail:'Transcatheter Repair for Patients with Tricuspid Regurgitation. 初始 randomized cohort n=350；hierarchical endpoint 不是 mortality 單一終點。',url:'https://www.nejm.org/doi/full/10.1056/NEJMoa2300525'},
    {id:'S5',title:'Kar et al. · TRILUMINATE Pivotal 2-year outcomes',type:'RCT · Circulation 2025',detail:'完整 randomized cohort n=572；recurrent HFH 降低，未證實死亡獲益。已核對 PubMed 原始作者摘要；本次未取得出版社全文。DOI: 10.1161/CIRCULATIONAHA.125.074536。',url:'https://pubmed.ncbi.nlm.nih.gov/40159089/'},
    {id:'S6',title:'2025 ESC/EACTS Guidelines for valvular heart disease',type:'Guideline · 2025',detail:'Recommendation Table 9，severe TR 且不需同時 left-sided valve surgery 的情境；transcatheter TV treatment Class IIa A。由官方 guideline／slides 的可讀索引核對，直接全文／PDF 取用受限。',url:'https://doi.org/10.1093/eurheartj/ehaf194'},
    {id:'S7',title:'ESC · 官方 guideline recommendation slides',type:'官方教學資料 · 2025',detail:'供回查 recommendation 原始表格。適應症與 clinical eligibility 仍須整合個案評估。',url:'https://www.escardio.org/static-file/Escardio/Guidelines/Products/Slide%20sets/2025/2025%20official%20slides_VHD.pdf'}
  ]
};
