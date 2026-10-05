(() => {
  'use strict';
  const data = window.TRICLIP || {};
  const modules = Array.isArray(data.modules) ? data.modules : [];
  const devices = Array.isArray(data.devices) ? data.devices : [];
  const steps = Array.isArray(data.steps) ? data.steps : [];
  const questions = Array.isArray(data.quiz) ? data.quiz : [];
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const evidence = Array.isArray(data.evidence) ? data.evidence : [];
  const storageKey = 'triclip-learning-v1';
  let progress = { completed: [], quizBest: null };
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && Array.isArray(saved.completed)) progress.completed = [...new Set(saved.completed.filter(id => modules.some(m => m.id === id)))];
    if (saved && Number.isInteger(saved.quizBest) && saved.quizBest >= 0 && saved.quizBest <= questions.length) progress.quizBest = saved.quizBest;
  } catch { storageAvailable = false; }
  const main = document.getElementById('main');
  const dialog = document.getElementById('reset-dialog');
  const state = { search: '', filter: 'all', device: 0, step: 0, checks: {}, quiz: null };
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const icons = {
    home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    book: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Z"/><path d="M12 5v15"/>',
    device: '<path d="M10 3v9l-6 6 3 3 5-6 5 6 3-3-6-6V3"/><path d="M8 3h8"/>',
    flow: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="19" r="2"/><path d="M8 5h7a3 3 0 0 1 3 3v2M16 12H9a3 3 0 0 0-3 3v2"/>',
    quiz: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 11l2 2 5-5M8 17h8"/>',
    source: '<path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h8"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    heart: '<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 1 9 8 15 7-6 12-11 8-15Z"/><path d="M5 11h4l2-4 3 8 2-4h3"/>',
    image: '<path d="M4 7c4-4 12-4 16 0l-4 14H8L4 7Z"/><path d="M8 9c2-2 6-2 8 0M9 13c2-1 4-1 6 0"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
    external: '<path d="M14 3h7v7M21 3l-12 12M10 3H3v18h18v-7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.book}</svg>`;
  const navItems = [['overview', '課程總覽', 'home'], ['modules', '學習模組', 'book'], ['devices', 'G4 器材', 'device'], ['procedure', '流程練習', 'flow'], ['quiz', '知識測驗', 'quiz'], ['sources', '資料來源', 'source']];
  const moduleIcons = ['heart', 'image', 'device', 'flow', 'quiz', 'source'];
  const route = () => {
    const parts = location.hash.slice(1).split('/');
    return { page: navItems.some(n => n[0] === parts[0]) ? parts[0] : 'overview', id: parts[1] || '' };
  };
  const moduleUrl = m => `#modules/${encodeURIComponent(m.id)}`;
  const percent = () => modules.length ? Math.round(progress.completed.length / modules.length * 100) : 0;
  const slideRef = slides => {
    const label = Array.isArray(slides) ? slides.join('、') : slides;
    const linked = escape(label).replace(/\bS\d+\b/g, id => sources.some(s => s.id === id) ? `<a href="#sources/${id}">${id}</a>` : id);
    return label ? `<div class="citation">${String(label).startsWith('外部') ? '' : '教材 slide '}${linked} <span aria-hidden="true">·</span> <a href="#sources">查看來源與適用限制</a></div>` : '';
  };
  const caution = text => text ? `<aside class="caution"><strong>CLINICAL CONTEXT</strong>${escape(text)}</aside>` : '';
  const header = (label, title, lead) => `<header class="page-header"><span class="eyebrow">${escape(label)}</span><h1 class="page-title" tabindex="-1">${escape(title)}</h1><p class="page-lead">${escape(lead)}</p></header>`;
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); storageAvailable = true; }
    catch { storageAvailable = false; }
    updateProgress();
  }
  function updateProgress() {
    document.getElementById('nav-progress').textContent = `${progress.completed.length} / ${modules.length}`;
    document.getElementById('nav-progress-bar').style.width = `${percent()}%`;
    document.querySelector('.sidebar-bottom>p').textContent = storageAvailable ? '進度儲存在此瀏覽器' : '目前無法保存；進度僅供本次瀏覽';
  }
  let toastTimeout;
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('visible'), 3500);
  }
  function moduleCard(m, i) {
    const done = progress.completed.includes(m.id);
    return `<a class="module-card" href="${moduleUrl(m)}"><div class="card-top"><span class="module-icon">${icon(moduleIcons[i % moduleIcons.length])}</span><span class="module-number">MODULE ${String(i + 1).padStart(2, '0')}</span></div><div class="module-kicker">${escape(m.kicker)}</div><h3>${escape(m.title)}</h3><p>${escape(m.summary)}</p><div class="card-bottom"><span class="${done ? 'card-completed' : ''}">${done ? '✓ 已完成複習' : `${escape(m.minutes)} 分鐘 · 自主學習`}</span>${icon('arrow')}</div></a>`;
  }
  function valveArt() {
    return `<div class="hero-art" role="img" aria-label="原創抽象三瓣葉與中央 clip 示意，非實際解剖或工程比例"><svg viewBox="0 0 390 330" aria-hidden="true"><defs><linearGradient id="leaflet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b3c9b2"/><stop offset="1" stop-color="#6c947e"/></linearGradient><linearGradient id="leaflet-light" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d3dfc7"/><stop offset="1" stop-color="#8fac8f"/></linearGradient><filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#426b52" flood-opacity=".13"/></filter></defs><ellipse cx="194" cy="165" rx="135" ry="116" fill="none" stroke="#c2cfc0" stroke-width="1" stroke-dasharray="3 6" transform="rotate(-18 194 165)"/><ellipse cx="194" cy="165" rx="119" ry="100" fill="none" stroke="#d3deca" stroke-width="1" transform="rotate(-18 194 165)"/><g filter="url(#soft-shadow)" stroke="#f0f3e9" stroke-width="2"><path d="M111 97C148 47 257 62 286 127c12 30-36 26-78 21-40-5-111-23-97-51Z" fill="url(#leaflet-light)"/><path d="M292 145c23 66-33 129-96 124-34-2-23-40-5-74 19-37 77-81 101-50Z" fill="url(#leaflet)"/><path d="M176 263C99 267 55 188 86 135c17-29 55-13 79 19 27 38 46 108 11 109Z" fill="#b1c8a8"/></g><g fill="none" stroke="#eef3e7" stroke-width="1" opacity=".7"><path d="M130 94c38 0 72 17 97 37M103 155c26 21 45 46 55 78M261 170c-17 25-31 44-44 62"/></g><g transform="translate(188 168) rotate(-18)"><path d="M-11-30h22v38H-11z" fill="#c8d4c5" stroke="#698276"/><path d="M-5-20h10v28l25 27-9 9L0 24l-21 20-9-9L-5 8Z" fill="#e6a188" stroke="#b7775d" stroke-width="1.4"/><path d="M-4-29h8v24h-8z" fill="#eceee5" stroke="#99aa9a"/></g><path d="m97 108-21-9H34m226 118 20 13h54" fill="none" stroke="#95ad99" stroke-width="1"/><circle cx="97" cy="108" r="3" fill="#e6a188"/><circle cx="260" cy="217" r="3" fill="#e6a188"/><path d="M181 33h25m-12-12v25M46 200v8m-4-4h8M326 88v8m-4-4h8" stroke="#bacbb8" stroke-width="1"/></svg><span class="figure-label one">LEAFLET<br>APPROXIMATION</span><span class="figure-label two">EDGE-TO-EDGE<br>REPAIR</span><span class="art-note">原創概念示意 · 非解剖／工程比例</span></div>`;
  }
  function overviewPage() {
    const next = modules.find(m => !progress.completed.includes(m.id)) || modules[0];
    const totalMinutes = modules.reduce((sum, m) => sum + (Number(m.minutes) || 0), 0);
    return `<section class="hero"><div class="hero-copy"><span class="eyebrow accent">TRICUSPID TRANSCATHETER EDGE-TO-EDGE REPAIR</span><h1 tabindex="-1">從理解到實踐，<br>掌握 <em>TriClip G4</em></h1><p>為醫師與 Heart Team 設計的互動學習空間。連結病人選擇、影像判讀與器材操作，建立有依據的臨床思考。</p><div class="source-stamp"><strong>G4 專用課程</strong><span>2021 教材 · 外部資料查核 2026-10-05</span></div><a class="button" href="${next ? moduleUrl(next) : '#modules'}">${progress.completed.length ? '繼續我的學習' : '開始學習'} ${icon('arrow')}</a><div class="hero-caption">繁體中文教材 · 保留英文專業術語 · 自主學習</div></div>${valveArt()}</section><section class="stats-strip" aria-label="課程資訊"><div class="stat"><span class="stat-icon">${icon('book')}</span><strong class="stat-number">${String(modules.length).padStart(2, '0')}</strong><span class="stat-label">核心模組<br>循序建立知識</span></div><div class="stat"><strong class="stat-number">${totalMinutes || '—'}</strong><span class="stat-label">分鐘<br>預估學習時間</span></div><div class="stat"><div class="learning-stat"><div><span>課程完成進度</span><strong>${progress.completed.length} / ${modules.length} 模組</strong></div><div class="progress-track"><span style="width:${percent()}%"></span></div></div></div></section><section><div class="section-heading"><div><span class="eyebrow">YOUR LEARNING PATH</span><h2>每個環節，都有學習重點。</h2><p>從臨床評估出發，逐步連結影像與 procedure。</p></div><a class="text-link" href="#modules">全部模組 ${icon('arrow')}</a></div><div class="module-grid">${modules.map(moduleCard).join('') || '<div class="empty-state">教材正在準備中。</div>'}</div></section><section class="continue-banner"><span class="banner-icon">${icon('quiz')}</span><div class="banner-copy"><h3>把重點，轉化為你的判斷。</h3><p>完成 ${questions.length} 道知識題，以逐題解析檢視理解與盲點。</p></div><a class="button secondary small" href="#quiz">前往知識測驗 ${icon('arrow')}</a></section>`;
  }
  function filteredModules() {
    const query = state.search.trim().toLocaleLowerCase();
    return modules.filter(m => {
      const done = progress.completed.includes(m.id);
      const matchStatus = state.filter === 'all' || (state.filter === 'completed' ? done : !done);
      const corpus = [m.title, m.kicker, m.summary, ...(m.sections || []).flatMap(s => [s.title, s.body, ...(s.bullets || [])])].join(' ').toLocaleLowerCase();
      return matchStatus && (!query || corpus.includes(query));
    });
  }
  function moduleResults() {
    const results = filteredModules();
    return `<p class="results-label" role="status">顯示 ${results.length} 個模組</p><div class="module-grid">${results.length ? results.map(m => moduleCard(m, modules.indexOf(m))).join('') : '<div class="empty-state">沒有符合的模組。請試試其他關鍵字或篩選條件。</div>'}</div>`;
  }
  function modulesPage() {
    return `${header('THE LEARNING COLLECTION', '學習模組', '依循六個臨床環節閱讀，也可以搜尋你想複習的主題。每個模組皆附教材投影片出處。')}<div class="toolbar"><label class="search-field">${icon('search')}<input type="search" id="module-search" aria-label="搜尋模組" placeholder="搜尋主題，例如 imaging、leaflet…" value="${escape(state.search)}"></label><div class="filter-group" aria-label="依學習進度篩選">${[['all', '全部模組'], ['unread', '尚未完成'], ['completed', '已完成']].map(([id, title]) => `<button data-action="filter" data-value="${id}" class="${state.filter === id ? 'active' : ''}" aria-pressed="${state.filter === id}">${title}</button>`).join('')}</div></div><div id="module-results">${moduleResults()}</div>`;
  }
  function lessonPage(id) {
    const m = modules.find(item => encodeURIComponent(item.id) === id);
    if (!m) return `${header('LEARNING MODULE', '找不到這個模組', '請從學習模組清單重新選擇。')}<a href="#modules" class="button">回到學習模組 ${icon('arrow')}</a>`;
    const index = modules.indexOf(m);
    const done = progress.completed.includes(m.id);
    return `<a class="text-link back-link" href="#modules">${icon('back')} 返回學習模組</a><header class="lesson-head"><span class="eyebrow">MODULE ${String(index + 1).padStart(2, '0')} · ${escape(m.kicker)}</span><h1 class="page-title" tabindex="-1">${escape(m.title)}</h1><p class="page-lead">${escape(m.summary)}</p><div class="lesson-meta"><span class="pill">${escape(m.minutes)} 分鐘 · 自主學習</span>${done ? '<span class="pill complete">✓ 已完成複習</span>' : '<span class="pill coral">尚未完成</span>'}</div>${slideRef(m.slides)}</header><div class="lesson-layout"><div class="lesson-content">${(m.sections || []).map((s, i) => `<section id="lesson-section-${i}" class="lesson-section"><span class="section-counter">${String(i + 1).padStart(2, '0')} / ${String(m.sections.length).padStart(2, '0')}</span><h2>${escape(s.title)}</h2><p>${escape(s.body)}</p>${s.bullets?.length ? `<ul>${s.bullets.map(b => `<li>${escape(b)}</li>`).join('')}</ul>` : ''}${caution(s.caution)}${slideRef(s.slides || m.slides)}</section>`).join('')}<div class="lesson-finish"><div><h3>${done ? '你已完成這個模組。' : '完成閱讀，留下學習紀錄。'}</h3><p>完成標記僅記錄自主學習，不代表操作資格認證。</p></div><button class="button" data-action="complete" data-id="${escape(m.id)}">${icon(done ? 'book' : 'check')}${done ? '標記為待複習' : '標記為已完成'}</button></div>${modules[index + 1] ? `<div class="section-heading" style="margin-top:25px"><span class="tiny muted">下一個學習環節</span><a class="text-link" href="${moduleUrl(modules[index + 1])}">${escape(modules[index + 1].title)} ${icon('arrow')}</a></div>` : '<div class="button-row" style="margin-top:25px"><a class="button secondary" href="#quiz">檢視我的理解 ' + icon('arrow') + '</a></div>'}</div><aside class="lesson-toc"><p>本模組重點</p>${(m.sections || []).map((s, i) => `<button data-action="section" data-index="${i}"><span class="toc-number">${String(i + 1).padStart(2, '0')}</span>${escape(s.title)}</button>`).join('')}<p class="toc-note">對照原始教材閱讀；遇到器材操作或臨床決策時，回到當地最新 IFU 與正式訓練。</p></aside></div>`;
  }
  function deviceArt(device) {
    const wide = /W$/.test(device.name || device.id);
    const long = /^X/.test(device.name || device.id);
    const spread = wide ? 17 : 11;
    const length = long ? 83 : 62;
    return `<svg viewBox="0 0 200 230" role="img" aria-label="${escape(device.name)} 原創概念示意，非工程比例"><defs><linearGradient id="metal" x1="0" x2="1"><stop stop-color="#b2c2b0"/><stop offset=".5" stop-color="#f4f5ec"/><stop offset="1" stop-color="#9dae9b"/></linearGradient></defs><circle cx="100" cy="116" r="78" fill="none" stroke="#d5dfce" stroke-dasharray="3 5"/><path d="M95 15h10v72H95z" fill="url(#metal)" stroke="#91a18b"/><rect x="88" y="77" width="24" height="45" rx="6" fill="url(#metal)" stroke="#9bad93"/><g transform="translate(100 119)"><path d="M0 0L${-length} ${length * .58}l${spread} ${spread}L0 27l${length - spread} ${length * .58 + spread - 27} ${spread} ${-spread}Z" fill="#d8a28a" stroke="#b68164" stroke-width="1.5"/><path d="M0 8L${-length + 11} ${length * .58 - 8}m${length - 11} ${-length * .58 + 8}L${length - 11} ${length * .58 - 8}" stroke="#f4d0ba" stroke-width="3"/></g><path d="M100 26v-8m-4 4h8" stroke="#879c7e"/></svg>`;
  }
  function devicesPage() {
    const d = devices[state.device];
    return `${header('DEVICE EXPLORER', '認識 G4 的四種選擇', '切換型號，對照教材中的 clip arm length、width 與設計重點。尺寸資訊用於學習，不形成個案器材推薦。')}${!d ? '<div class="empty-state">器材教材正在準備中。</div>' : `<div class="device-tabs" role="group" aria-label="選擇 G4 型號">${devices.map((item, i) => `<button class="device-tab ${i === state.device ? 'active' : ''}" data-action="device" data-index="${i}" aria-pressed="${i === state.device}"><span>TRICLIP G4</span><strong>${escape(item.name)}</strong><small>${escape(item.armLength)} arm · ${escape(item.width)} width</small></button>`).join('')}</div><section class="device-detail" aria-label="選取器材的說明"><div class="device-art">${deviceArt(d)}<span class="art-note">原創概念示意 · 非工程比例</span></div><div class="device-copy"><span class="eyebrow">TRICLIP G4 SYSTEM</span><h2>${escape(d.name)}</h2><p>${escape(d.description)}</p><div class="dimension-grid"><div><span>Arm length（max.）</span><strong>${escape(d.armLength)}</strong></div><div><span>Arm width（max.）</span><strong>${escape(d.width)}</strong></div></div>${caution(d.caveat)}${slideRef(d.slides)}</div></section><section><div class="section-heading"><div><span class="eyebrow">SIDE-BY-SIDE</span><h2>型號規格對照</h2></div></div><div class="table-wrap"><table><thead><tr><th scope="col">G4 clip</th><th scope="col">Arm length（max.）</th><th scope="col">Arm width（max.）</th><th scope="col">教材出處</th></tr></thead><tbody>${devices.map((item, i) => `<tr class="${i === state.device ? 'selected-row' : ''}"><th scope="row">${escape(item.name)}</th><td>${escape(item.armLength)}</td><td>${escape(item.width)}</td><td>slide ${escape(Array.isArray(item.slides) ? item.slides.join('、') : item.slides || '—')}</td></tr>`).join('')}</tbody></table></div><p class="table-caption">型號差異必須放在 leaflet anatomy、影像品質與當地 IFU 的脈絡中判讀。</p></section>`}`;
  }
  function procedurePage() {
    const step = steps[state.step];
    return `${header('PROCEDURE WALKTHROUGH', '逐步梳理 procedure', '沿著手術流程回顧每一步的目標、影像觀察與注意事項。可直接切換到想複習的環節。')}${!step ? '<div class="empty-state">流程教材正在準備中。</div>' : `<div class="procedure-layout"><nav class="step-list" aria-label="學習步驟">${steps.map((s, i) => `<button class="step-button ${state.step === i ? 'active' : ''}" data-action="step" data-index="${i}" ${state.step === i ? 'aria-current="step"' : ''}><span class="step-num">${String(i + 1).padStart(2, '0')}</span><span>${escape(s.title)}</span></button>`).join('')}</nav><section class="step-detail"><span class="eyebrow">STEP ${String(state.step + 1).padStart(2, '0')} OF ${String(steps.length).padStart(2, '0')}</span><h2 tabindex="-1">${escape(step.title)}</h2><p>${escape(step.body)}</p><div class="focus-line"><span>LEARNING FOCUS</span>${escape(step.focus)}</div><h3 class="check-heading">自我複習提示</h3><div class="check-list">${(step.checks || []).map((check, i) => `<label class="check-item"><input type="checkbox" data-check="${state.step}-${i}" ${state.checks[`${state.step}-${i}`] ? 'checked' : ''}><span>${escape(check)}</span></label>`).join('')}</div>${caution(step.caution)}${slideRef(step.slides)}<div class="step-actions"><button class="button secondary small" data-action="step" data-index="${state.step - 1}" ${state.step === 0 ? 'disabled' : ''}>${icon('back')} 上一步</button>${state.step < steps.length - 1 ? `<button class="button small" data-action="step" data-index="${state.step + 1}">下一步 ${icon('arrow')}</button>` : '<a class="button small" href="#quiz">前往知識測驗 ' + icon('arrow') + '</a>'}</div></section></div>`}<p class="practice-note">這是教材的學習導覽。勾選複習提示不代表病人符合治療條件、器材可植入或 clip 可釋放；也不是術中即時 checklist。</p>`;
  }
  function quizIntro() {
    return `<section class="quiz-intro"><div class="quiz-symbol">${icon('quiz')}</div><span class="eyebrow">KNOWLEDGE INTO PRACTICE</span><h2>用問題，檢視你的理解。</h2><p>涵蓋病人選擇、影像、G4 器材及 procedure。每題提交後立即提供解析與教材出處；提交後鎖定該題答案，計分採本次首次提交結果。</p><div class="quiz-facts"><div><strong>${questions.length}</strong><span>道單選題</span></div><div><strong>自主</strong><span>不限作答時間</span></div><div><strong>${progress.quizBest === null ? '—' : `${progress.quizBest} / ${questions.length}`}</strong><span>此瀏覽器最佳成績</span></div></div><button class="button" data-action="quiz-start" ${questions.length ? '' : 'disabled'}>開始知識測驗 ${icon('arrow')}</button><p class="tiny muted" style="margin-top:18px">本測驗供自主複習，不提供臨床操作資格或能力認證。</p></section>`;
  }
  function quizQuestion() {
    const qState = state.quiz;
    const q = questions[qState.index];
    const answered = qState.answers[qState.index] !== null;
    const selected = answered ? qState.answers[qState.index] : qState.selected;
    const correct = selected === q.answer;
    return `<div class="quiz-shell"><div class="quiz-progress-label"><span>QUESTION ${String(qState.index + 1).padStart(2, '0')} / ${questions.length}</span><span>已提交 ${qState.answers.filter(a => a !== null).length} 題</span></div><div class="progress-track"><span style="width:${qState.answers.filter(a => a !== null).length / questions.length * 100}%"></span></div><section class="quiz-card"><span class="eyebrow">選出最適當的答案</span><h2 tabindex="-1">${escape(q.question)}</h2><fieldset class="quiz-options"><legend>${escape(q.question)}</legend>${q.options.map((option, i) => `<label class="quiz-option ${selected === i ? 'selected' : ''} ${answered ? 'locked' : ''} ${answered && i === q.answer ? 'correct' : ''} ${answered && selected === i && !correct ? 'incorrect' : ''}"><input type="radio" name="quiz-answer" value="${i}" ${selected === i ? 'checked' : ''} ${answered ? 'disabled' : ''}><span class="option-letter">${String.fromCharCode(65 + i)}.</span><span class="option-text">${escape(option)}</span></label>`).join('')}</fieldset>${answered ? `<div class="quiz-feedback ${correct ? '' : 'wrong'}" role="status"><h3>${correct ? '答對了，掌握這個重點。' : '這個重點值得再看一次。'}</h3><p><strong>正確答案：${String.fromCharCode(65 + q.answer)}.</strong> ${escape(q.options[q.answer])}</p><p style="margin-top:9px">${escape(q.explanation)}</p>${slideRef(q.slides)}</div>` : ''}<div class="quiz-controls"><span>${answered ? '本題答案已鎖定，成績僅計入一次。' : '提交前可以更換選項。'}</span><button class="button" data-action="${answered ? 'quiz-next' : 'quiz-submit'}" ${!answered && selected === null ? 'disabled' : ''}>${answered ? qState.index === questions.length - 1 ? '查看學習結果' : '下一題' : '提交答案'} ${icon('arrow')}</button></div></section></div>`;
  }
  function quizResult() {
    const score = state.quiz.answers.reduce((sum, a, i) => sum + (a === questions[i].answer ? 1 : 0), 0);
    return `<div class="quiz-shell"><section class="quiz-intro" style="margin:0"><div class="score-ring"><strong>${score} / ${questions.length}</strong><span>本次答對題數</span></div><span class="eyebrow">LEARNING REFLECTION</span><h2>${score === questions.length ? '知識串起來了。' : '找到下一個學習重點。'}</h2><p>本次成績依每題首次提交的答案計算。展開下方解析，將不確定的地方連回原始教材，再回到模組複習。</p><div class="button-row" style="margin-top:25px"><button class="button" data-action="quiz-start">重新測驗 ${icon('arrow')}</button><a class="button secondary" href="#modules">返回學習模組</a></div><p class="tiny muted" style="margin-top:18px">最佳成績：${progress.quizBest} / ${questions.length}。學習成績不等同臨床操作能力或資格認證。</p></section><div class="review-list">${questions.map((q, i) => `<details class="review-item"><summary><span>${state.quiz.answers[i] === q.answer ? '✓' : '○'} ${String(i + 1).padStart(2, '0')}</span>${escape(q.question)}</summary><div class="review-body"><p>你的答案：${escape(q.options[state.quiz.answers[i]])}</p><p><strong>正確答案：${escape(q.options[q.answer])}</strong></p><p>${escape(q.explanation)}</p>${slideRef(q.slides)}</div></details>`).join('')}</div></div>`;
  }
  function quizPage() {
    return header('KNOWLEDGE CHECK', '知識測驗', '讓每一次作答，成為回到證據與教材的起點。') + (!state.quiz ? quizIntro() : state.quiz.finished ? quizResult() : quizQuestion());
  }
  function sourcesPage() {
    const validUrl = value => /^https?:\/\//i.test(value || '');
    return `${header('SOURCES & EVIDENCE', '讓每個重點，都可回溯。', '以提供的 G4 訓練教材為主軸，將原始教材、外部證據及適用限制分開呈現。來源註記支持學習，也提醒證據的邊界。')}${evidence.length ? `<div class="evidence-grid">${evidence.map(e => `<article class="evidence-card"><span class="eyebrow">EVIDENCE CONTEXT</span><h3>${escape(e.title)}</h3><p>${escape(e.body)}</p>${e.sourceIds?.length ? `<div class="citation">相關來源：${e.sourceIds.map(id => `<button class="reset-link" style="color:inherit;font-size:inherit" data-action="source" data-id="${escape(id)}">${escape(id)}</button>`).join('、')}</div>` : ''}</article>`).join('')}</div>` : ''}<section><div class="section-heading"><div><span class="eyebrow">SOURCE LIBRARY</span><h2>教材與參考資料</h2></div><span class="pill">${sources.length} 筆來源</span></div><div class="source-list">${sources.map((s, i) => `<article class="source-card" id="source-${escape(s.id)}"><span class="source-id">${escape(s.id || String(i + 1).padStart(2, '0'))}</span><div class="source-copy"><span class="eyebrow">${escape(s.type)}</span><h3>${escape(s.title)}</h3><p>${escape(s.detail)}</p>${s.slides ? `<div class="citation">教材 slide ${escape(Array.isArray(s.slides) ? s.slides.join('、') : s.slides)}</div>` : ''}${validUrl(s.url) ? `<a class="text-link" href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">閱讀原始來源 ${icon('external')}<span class="tiny">（另開分頁）</span></a>` : ''}</div></article>`).join('') || '<div class="empty-state">參考資料正在準備中。</div>'}</div></section><aside class="practice-note">本網站為獨立教育整理，非 Abbott 官方網站，亦不代表製造商認證課程。器材使用應遵循所在地核准的最新 IFU；原始教材與器材商標之權利屬其各自權利人。</aside><div class="button-row" style="margin-top:24px"><button class="button secondary small" data-action="reset-open">重設此瀏覽器的學習紀錄</button><span class="tiny muted">不蒐集病人資料；學習進度儲存於本機。</span></div>`;
  }
  function render(focus = false) {
    const current = route();
    document.getElementById('navigation').innerHTML = navItems.map(([id, title, name]) => `<a class="nav-item ${current.page === id ? 'active' : ''}" href="#${id}" ${current.page === id ? 'aria-current="page"' : ''}>${icon(name)}<span>${title}</span></a>`).join('');
    const title = navItems.find(n => n[0] === current.page)[1];
    document.getElementById('breadcrumb').textContent = title;
    document.title = `${title}｜TriClip Learning Lab`;
    const pages = { overview: overviewPage, modules: () => current.id ? lessonPage(current.id) : modulesPage(), devices: devicesPage, procedure: procedurePage, quiz: quizPage, sources: sourcesPage };
    main.innerHTML = pages[current.page]();
    updateProgress();
    if (focus) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const heading = main.querySelector('h1') || main;
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    if (current.page === 'sources' && current.id) {
      const source = document.getElementById(`source-${current.id}`);
      source?.scrollIntoView({ block: 'start' });
      source?.setAttribute('tabindex', '-1'); source?.focus({ preventScroll: true });
    }
  }
  document.addEventListener('input', event => {
    if (event.target.id === 'module-search') {
      state.search = event.target.value;
      document.getElementById('module-results').innerHTML = moduleResults();
    }
  });
  document.addEventListener('change', event => {
    if (event.target.matches('[data-check]')) state.checks[event.target.dataset.check] = event.target.checked;
    if (event.target.name === 'quiz-answer' && state.quiz && state.quiz.answers[state.quiz.index] === null) {
      state.quiz.selected = Number(event.target.value);
      document.querySelectorAll('.quiz-option').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked));
      main.querySelector('[data-action="quiz-submit"]').disabled = false;
    }
  });
  document.addEventListener('click', event => {
    if (event.target.closest('.skip-link')) {
      event.preventDefault();
      main.focus();
      return;
    }
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === 'filter') {
      state.filter = button.dataset.value;
      document.querySelectorAll('[data-action="filter"]').forEach(el => { el.classList.toggle('active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
      document.getElementById('module-results').innerHTML = moduleResults();
    } else if (action === 'complete') {
      const id = button.dataset.id;
      if (!modules.some(m => m.id === id)) return;
      const done = progress.completed.includes(id);
      progress.completed = done ? progress.completed.filter(value => value !== id) : [...progress.completed, id];
      persist(); render();
      main.querySelector('[data-action="complete"]').focus({ preventScroll: true });
      toast((done ? '已標記為待複習' : '已記錄完成這個模組') + (storageAvailable ? '' : '；本次瀏覽結束後不會保存'));
    } else if (action === 'section') {
      const section = document.getElementById(`lesson-section-${button.dataset.index}`);
      section?.scrollIntoView({ block: 'start' });
      const heading = section?.querySelector('h2');
      heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true });
    } else if (action === 'device') {
      const i = Number(button.dataset.index);
      if (!devices[i]) return;
      state.device = i; render();
      main.querySelector(`[data-action="device"][data-index="${i}"]`).focus({ preventScroll: true });
    } else if (action === 'step') {
      const i = Number(button.dataset.index);
      if (!steps[i]) return;
      state.step = i; render();
      main.querySelector('.step-detail h2').focus({ preventScroll: true });
    } else if (action === 'quiz-start') {
      if (!questions.length) return;
      state.quiz = { index: 0, selected: null, answers: questions.map(() => null), finished: false }; render();
      main.querySelector('.quiz-card h2').focus({ preventScroll: true });
    } else if (action === 'quiz-submit') {
      const q = state.quiz;
      if (!q || q.selected === null || q.answers[q.index] !== null) return;
      q.answers[q.index] = q.selected; render();
      main.querySelector('[data-action="quiz-next"]').focus({ preventScroll: true });
    } else if (action === 'quiz-next') {
      const q = state.quiz;
      if (!q || q.answers[q.index] === null || q.finished) return;
      if (q.index < questions.length - 1) { q.index++; q.selected = null; }
      else {
        q.finished = true;
        const score = q.answers.reduce((sum, a, i) => sum + (a === questions[i].answer ? 1 : 0), 0);
        progress.quizBest = Math.max(progress.quizBest || 0, score); persist();
      }
      render();
      const heading = main.querySelector('.quiz-card h2, .quiz-intro h2');
      heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true });
    } else if (action === 'source') {
      const source = document.getElementById(`source-${button.dataset.id}`);
      source?.scrollIntoView({ block: 'start' });
      source?.setAttribute('tabindex', '-1'); source?.focus({ preventScroll: true });
    } else if (action === 'reset-open') dialog.showModal();
    else if (action === 'reset-cancel') dialog.close();
    else if (action === 'reset-confirm') {
      progress = { completed: [], quizBest: null }; state.quiz = null; state.checks = {}; persist(); dialog.close(); render(); toast(storageAvailable ? '此瀏覽器的學習紀錄已重設' : '本次進度已清空，但無法更新瀏覽器儲存；重新開啟可能恢復舊紀錄');
    }
  });
  window.addEventListener('hashchange', () => render(true));
  render();
})();
