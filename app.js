const sectionMounts = document.querySelector("#section-mounts");
const sectionLoader = document.querySelector("#section-loader");
const tabs = document.querySelectorAll(".tabbar button");
const entryScreen = document.querySelector("#entry-screen");
const entryAction = document.querySelector("#entry-action");
const accountScreen = document.querySelector("#account-screen");
const accountForm = document.querySelector("#account-form");
const accountTitle = document.querySelector("#account-title");
const accountSubmit = document.querySelector("#account-submit");
const accountRegister = document.querySelector("#account-register");
const accountForgot = document.querySelector("#account-forgot");
const accountError = document.querySelector("#account-error");
const accountUsername = document.querySelector("#account-username");
const accountPassword = document.querySelector("#account-password");
const accountAgreement = document.querySelector("#account-agreement");
const personaScreen = document.querySelector("#persona-screen");
const personaQuiz = document.querySelector("#persona-quiz");
const personaResult = document.querySelector("#persona-result");
const personaNext = document.querySelector("#persona-next");
const personaBack = document.querySelector("#persona-back");
const personaSkip = document.querySelector("#persona-skip");
const personaFinish = document.querySelector("#persona-finish");
const personaTitle = document.querySelector("#persona-title");
const personaStepCount = document.querySelector("#persona-step-count");
const personaProgressBar = document.querySelector("#persona-progress-bar");
const personaSection = document.querySelector("#persona-section");
const personaQuestion = document.querySelector("#persona-question");
const personaOptions = document.querySelector("#persona-options");
const personaHeroCard = document.querySelector("#persona-hero-card");
const personaResultTitle = document.querySelector("#persona-result-title");
const personaResultCopy = document.querySelector("#persona-result-copy");
const personaResultImage = document.querySelector("#persona-result-image");
const personaMeterList = document.querySelector("#persona-meter-list");
const personaModeTitle = document.querySelector("#persona-mode-title");
const personaModeCopy = document.querySelector("#persona-mode-copy");

let screens = [];
let accountMode = "login";
let personaIndex = -1;
let personaAnswers = [];

const personaQuestions = [
  {
    section: "当前状态",
    question: "最近两周，你更接近哪一种生活感受？",
    accent: "calm",
    options: [
      { text: "想先慢下来，恢复一点稳定感", scores: { comfort: 3, creation: 1 } },
      { text: "日子有点重复，想看见别人的生活", scores: { reflection: 3, exploration: 1 } },
      { text: "有点闷，想试试陌生但安全的事", scores: { exploration: 3, openness: 2 } },
      { text: "想把一个真实任务做完，获得掌控感", scores: { business: 3, structure: 2 } },
    ],
  },
  {
    section: "体验动机",
    question: "如果给你半天时间，你最想获得什么？",
    accent: "gold",
    options: [
      { text: "完成一件可触摸、可带走的作品", scores: { creation: 3, comfort: 1 } },
      { text: "观察一个普通职业的一天", scores: { reflection: 2, exploration: 2 } },
      { text: "认识一群同频的人，一起行动", scores: { contribution: 2, social: 2 } },
      { text: "学习小店、品牌或活动如何运转", scores: { business: 3, structure: 1 } },
    ],
  },
  {
    section: "舒适边界",
    question: "面对陌生体验时，你更希望系统怎样安排？",
    accent: "mint",
    options: [
      { text: "流程清楚，随时可以退出", scores: { structure: 3, comfort: 2 } },
      { text: "保留一点惊喜，但安全边界要明确", scores: { openness: 2, exploration: 2 } },
      { text: "有人带队，也有人一起复盘", scores: { social: 2, reflection: 2 } },
      { text: "给我真实任务，我想自己推进", scores: { business: 2, exploration: 1 } },
    ],
  },
  {
    section: "表达方式",
    question: "体验结束后，你最愿意留下哪种记录？",
    accent: "blue",
    options: [
      { text: "一件作品或一张完成照", scores: { creation: 3 } },
      { text: "一段采访、照片或城市观察笔记", scores: { reflection: 3, exploration: 1 } },
      { text: "一次帮助别人后的行动反馈", scores: { contribution: 3 } },
      { text: "一份经营复盘：哪里做对了，哪里能优化", scores: { business: 3, structure: 1 } },
    ],
  },
  {
    section: "社交能量",
    question: "你更适合哪种体验人数？",
    accent: "pink",
    options: [
      { text: "一个人或两个人，安静一点", scores: { comfort: 2, creation: 1 } },
      { text: "小组可以，但最好有清楚分工", scores: { structure: 2, business: 1 } },
      { text: "我喜欢听不同人的故事", scores: { social: 3, reflection: 1 } },
      { text: "只要目标有意义，人多一点也可以", scores: { contribution: 2, social: 1 } },
    ],
  },
  {
    section: "下一段人生样本",
    question: "如果今天就开始，你会先选择哪张体验卡？",
    accent: "dark",
    options: [
      { text: "陶艺、花艺、烘焙、刺绣", scores: { creation: 3, comfort: 1 } },
      { text: "咖啡店早班、小店运营、文创策划", scores: { business: 3, structure: 1 } },
      { text: "城市夜行、普通人纪录片、职业观察", scores: { exploration: 2, reflection: 3 } },
      { text: "社区环保、宠物救助、非遗传承", scores: { contribution: 3, social: 1 } },
    ],
  },
  {
    section: "点亮瞬间",
    question: "什么瞬间最容易让你觉得“被点亮”？",
    accent: "gold",
    options: [
      { text: "亲手完成一个东西，看到它真的成形", scores: { creation: 3, comfort: 1 } },
      { text: "听到一个人的真实故事，突然理解另一种生活", scores: { reflection: 3, social: 1 } },
      { text: "进入一个从没接触过的场景，发现自己也可以适应", scores: { exploration: 3, openness: 2 } },
      { text: "做的事情真的帮到了别人或改善了一点现实", scores: { contribution: 3, social: 1 } },
    ],
  },
  {
    section: "安全感",
    question: "报名一个体验前，哪件事最能给你安全感？",
    accent: "mint",
    options: [
      { text: "提前知道流程、时长、地点、退出方式", scores: { structure: 3, comfort: 2 } },
      { text: "知道这个体验有一点未知，但风险被筛掉了", scores: { openness: 2, exploration: 2 } },
      { text: "知道会有向导陪同，也能和别人交流", scores: { social: 2, comfort: 1 } },
      { text: "知道自己会被分配一个清楚的小任务", scores: { business: 2, structure: 2 } },
    ],
  },
  {
    section: "体验角色",
    question: "你更愿意在体验中扮演哪种角色？",
    accent: "blue",
    options: [
      { text: "安静参与者：慢慢感受，不急着表现", scores: { comfort: 3, reflection: 1 } },
      { text: "记录者：观察细节，把它变成故事", scores: { reflection: 3, creation: 1 } },
      { text: "尝试者：愿意先上手，再边做边学", scores: { exploration: 2, openness: 2 } },
      { text: "推进者：把任务拆开、组织好、做出结果", scores: { business: 3, structure: 2 } },
    ],
  },
  {
    section: "改善期待",
    question: "你最想靠一次体验改善什么？",
    accent: "pink",
    options: [
      { text: "让自己从疲惫里缓一缓", scores: { comfort: 3 } },
      { text: "找到一点新的表达欲或创作欲", scores: { creation: 3, reflection: 1 } },
      { text: "摆脱重复生活，打开新的可能性", scores: { exploration: 3, openness: 1 } },
      { text: "确认自己还能对现实产生一点作用", scores: { contribution: 3, business: 1 } },
    ],
  },
  {
    section: "体验成果",
    question: "以下哪种体验成果最吸引你？",
    accent: "calm",
    options: [
      { text: "作品、照片、纪念册：能被保存下来的东西", scores: { creation: 2, comfort: 1 } },
      { text: "故事、访谈、观察笔记：能被讲述出来的东西", scores: { reflection: 3 } },
      { text: "技能、流程、方法：以后也可能用得上的东西", scores: { business: 2, structure: 2 } },
      { text: "关系、连接、行动反馈：和真实世界发生联系", scores: { contribution: 2, social: 2 } },
    ],
  },
  {
    section: "下一束光",
    question: "如果系统给你推送“下一束光”，你希望它更像什么？",
    accent: "dark",
    options: [
      { text: "一盏小夜灯：温柔、稳定、慢慢恢复", scores: { comfort: 3, creation: 1 } },
      { text: "一扇窗：让我看见别人真实的一天", scores: { reflection: 3, exploration: 1 } },
      { text: "一条岔路：带我进入陌生但安全的可能性", scores: { exploration: 3, openness: 2 } },
      { text: "一张任务卡：让我进入真实世界并完成一件事", scores: { business: 2, contribution: 1, structure: 1 } },
    ],
  },
];

const personaProfiles = {
  slow_recoverer: {
    label: "慢热修复者",
    summary: "你此刻更适合从温和、低压力、可退出的体验开始。先恢复能量，再慢慢靠近新的生活样本。",
    mode: "舒适模式",
    modeCopy: "先恢复能量，再慢慢探索新的生活样本。",
    recommendTags: ["陶艺", "花艺", "烘焙", "自然散步", "低社交手作"],
    image: "User_Profile/Reference/a.jpg",
  },
  aesthetic_creator: {
    label: "创作造物者",
    summary: "你容易被作品、美感和完成感点亮。比起空想，亲手做出一个东西更能帮你确认自己。",
    mode: "创作模式",
    modeCopy: "从看得见的作品开始，把审美、表达和完成感变成你的下一束光。",
    recommendTags: ["烘焙", "刺绣", "绘画", "花艺", "摄影", "空间布置"],
    image: "User_Profile/Reference/a.jpg",
  },
  city_observer: {
    label: "城市观察员",
    summary: "你适合从观察、记录和故事进入体验。看见普通人的一天，也是在拓宽自己的生活半径。",
    mode: "叙事模式",
    modeCopy: "用观察和记录把体验转化为你的个人故事。",
    recommendTags: ["城市夜行", "职业观察", "普通人纪录片", "摄影采访", "写作记录"],
    image: "User_Profile/Reference/b.jpg",
  },
  boundary_breaker: {
    label: "边界突破者",
    summary: "你对陌生但安全的体验有好奇心。适合在边界清楚的前提下，给生活打开一条岔路。",
    mode: "探索模式",
    modeCopy: "选择陌生但边界清晰的体验，给生活打开一条岔路。",
    recommendTags: ["盲盒体验", "飞行模拟", "赛车模拟", "非遗体验", "陌生职业半日观察"],
    image: "User_Profile/Reference/c.jpg",
  },
  life_operator: {
    label: "人生经营者",
    summary: "你适合进入真实任务，在组织流程、推进结果和解决问题中看见自己的能力。",
    mode: "经营模式",
    modeCopy: "从真实任务中理解自己如何组织资源、推进结果。",
    recommendTags: ["咖啡店早班", "小店运营", "文创策划", "活动执行", "办公室协作"],
    image: "User_Profile/Reference/d.jpg",
  },
  gentle_empath: {
    label: "温柔共情者",
    summary: "你容易在连接他人、照顾生命、参与公共行动时获得价值感。真实帮助会让体验更有重量。",
    mode: "贡献模式",
    modeCopy: "在帮助他人与连接真实世界时，找回价值感。",
    recommendTags: ["宠物救助", "社区环保", "养老陪伴", "非遗传承", "公益活动"],
    image: "User_Profile/Reference/b.jpg",
  },
};

const screenMap = {
  home: "screen-home",
  coach: "screen-coach",
  profile: "screen-profile",
  experiences: "screen-experiences",
  "experience-detail": "screen-experience-detail",
  report: "screen-report",
  community: "screen-community",
  plan: "screen-plan",
};

const tabMap = {
  home: "home",
  plan: "home",
  coach: "coach",
  profile: "coach",
  report: "coach",
  experiences: "experiences",
  "experience-detail": "experiences",
  community: "community",
};

const experienceCategories = {
  career: {
    title: "职业体验",
    copy: "进入真实职业现场，观察任务、节奏和人与人的互动方式。",
    items: [
      {
        title: "咖啡店运营观察员",
        meta: "独立咖啡店 · 周六 14:00 · ¥79",
        match: "91%",
        thumb: "coffee",
        target: "experience-detail",
      },
      {
        title: "城市影像记录者",
        meta: "街拍工作坊 · 周日 10:00 · ¥129",
        match: "86%",
        thumb: "photo",
      },
      {
        title: "青年夜谈主持人",
        meta: "深度对话圆桌 · 周五 19:30 · ¥39",
        match: "82%",
        thumb: "social",
      },
    ],
  },
  creative: {
    title: "兴趣创造",
    copy: "用手作、影像、花艺和烘焙把兴趣变成可见成果。",
    items: [
      {
        title: "陶艺造物体验师",
        meta: "手作工坊 · 周六 10:30 · ¥119",
        match: "89%",
        thumb: "ceramic",
      },
      {
        title: "花艺情绪调色师",
        meta: "花艺工作室 · 周日 15:00 · ¥139",
        match: "87%",
        thumb: "floral",
      },
      {
        title: "甜点故事烘焙员",
        meta: "烘焙教室 · 周五 19:00 · ¥99",
        match: "84%",
        thumb: "bakery",
      },
    ],
  },
  "public-good": {
    title: "公益贡献",
    copy: "从小规模真实行动开始，体验照护、环保和社区连接。",
    items: [
      {
        title: "宠物救助陪伴员",
        meta: "动物救助站 · 周六 09:30 · 免费",
        match: "90%",
        thumb: "pet",
      },
      {
        title: "社区环保行动员",
        meta: "河岸清洁 · 周日 08:30 · 免费",
        match: "88%",
        thumb: "cleanup",
      },
      {
        title: "非遗故事记录者",
        meta: "老街访谈 · 周六 14:30 · ¥29",
        match: "83%",
        thumb: "heritage",
      },
    ],
  },
  nature: {
    title: "自然生活",
    copy: "用低压力的自然体验恢复感官，重新感受身体和生活节奏。",
    items: [
      {
        title: "森林慢行观察员",
        meta: "城市公园 · 周日 09:00 · ¥49",
        match: "92%",
        thumb: "forest",
      },
      {
        title: "城市农园共创者",
        meta: "社区农园 · 周六 16:00 · ¥39",
        match: "86%",
        thumb: "garden",
      },
      {
        title: "轻露营生活规划员",
        meta: "近郊营地 · 周六 13:00 · ¥159",
        match: "81%",
        thumb: "camp",
      },
    ],
  },
};

async function loadSections() {
  if (!sectionMounts) return;

  const paths = sectionMounts.dataset.sections.split(/\s+/).filter(Boolean);
  const fragments = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Unable to load ${path}`);
      }
      return response.text();
    })
  );

  sectionMounts.innerHTML = fragments.join("\n");
  screens = Array.from(document.querySelectorAll(".screen"));
  renderExperienceCategory("career");

  if (sectionLoader) {
    sectionLoader.hidden = true;
  }
}

function showScreen(name) {
  const target = screenMap[name] || screenMap.home;
  const activeTab = tabMap[name] || "home";

  screens.forEach((screen) => screen.classList.toggle("active", screen.id === target));
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.go === activeTab));
}

function renderExperienceCategory(category = "career") {
  const data = experienceCategories[category] || experienceCategories.career;
  const filterGroup = document.querySelector("[data-experience-filters]");
  const note = document.querySelector(".experience-category-note");
  const list = document.querySelector("[data-experience-list]");

  filterGroup?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  if (note) {
    note.innerHTML = `
      <strong>${data.title}</strong>
      <p>${data.copy}</p>
    `;
  }

  if (!list) return;
  list.innerHTML = data.items
    .map(
      (item) => `
        <article class="list-item"${item.target ? ` data-go="${item.target}"` : ""}>
          <div class="thumb ${item.thumb}"></div>
          <div>
            <h4>${item.title}</h4>
            <p>${item.meta}</p>
          </div>
          <span>${item.match}</span>
        </article>
      `
    )
    .join("");
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const navTarget = event.target.closest("[data-go]");
    if (navTarget) {
      const target = navTarget.dataset.go;
      if (target) showScreen(target);
      return;
    }

    const chip = event.target.closest(".chip");
    if (chip) {
      chip.parentElement.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      return;
    }

    const experienceFilter = event.target.closest("[data-experience-filters] button");
    if (experienceFilter) {
      const category = experienceFilter.dataset.category;
      renderExperienceCategory(category);
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("#time-range")) {
      const timeOutput = document.querySelector("#time-output");
      if (timeOutput) {
        timeOutput.textContent = event.target.value;
      }
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("#quiz-form")) {
      event.preventDefault();
      showScreen("profile");
    }
  });

  if (entryScreen && entryAction) {
    entryAction.addEventListener("click", () => {
      entryScreen.classList.add("hidden");
      if (accountScreen) {
        accountScreen.classList.remove("hidden");
      }
    });
  }

  if (accountForm) {
    accountForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAccountSubmit();
    });
  }

  if (accountRegister) {
    accountRegister.addEventListener("click", () => {
      accountMode = accountMode === "login" ? "register" : "login";
      if (accountTitle) accountTitle.textContent = accountMode === "login" ? "Welcome" : "Create";
      if (accountSubmit) accountSubmit.textContent = accountMode === "login" ? "登录" : "注册";
      accountRegister.textContent = accountMode === "login" ? "注册账号" : "返回登录";
      setAccountError("");
    });
  }

  if (accountForgot) {
    accountForgot.addEventListener("click", () => {
      setAccountError("Demo 暂不支持找回密码，请先使用任意账号体验。");
    });
  }

  personaNext?.addEventListener("click", () => {
    if (personaIndex < 0) {
      startPersonaQuiz();
      return;
    }

    if (personaAnswers[personaIndex]) {
      goToNextPersonaQuestion();
    }
  });

  personaBack?.addEventListener("click", () => {
    if (personaResult && !personaResult.classList.contains("hidden")) {
      personaResult.classList.add("hidden");
      personaQuiz?.classList.remove("hidden");
      renderPersonaQuestion();
      return;
    }

    if (personaIndex > 0) {
      personaIndex -= 1;
      renderPersonaQuestion();
      return;
    }

    if (personaIndex === 0) {
      resetPersonaIntro();
    }
  });

  personaSkip?.addEventListener("click", () => {
    personaScreen?.classList.add("hidden");
    showScreen("home");
  });

  personaFinish?.addEventListener("click", () => {
    personaScreen?.classList.add("hidden");
    showScreen("home");
  });
}

function setAccountError(message) {
  if (accountError) {
    accountError.textContent = message;
  }
}

function handleAccountSubmit() {
  const username = accountUsername?.value.trim() || "";
  const password = accountPassword?.value || "";
  const agreed = accountAgreement?.checked;

  if (!username) {
    setAccountError("请输入用户名。");
    accountUsername?.focus();
    return;
  }

  if (password.length < 4) {
    setAccountError("请输入至少 4 位密码。");
    accountPassword?.focus();
    return;
  }

  if (!agreed) {
    setAccountError("请先阅读并同意用户协议与隐私政策。");
    accountAgreement?.focus();
    return;
  }

  localStorage.setItem(
    "lifeFittingRoomDemoUser",
    JSON.stringify({
      username,
      mode: accountMode,
      loginAt: new Date().toISOString(),
    })
  );

  setAccountError("");
  accountScreen?.classList.add("hidden");
  if (personaScreen) {
    personaScreen.classList.remove("hidden");
  }
  resetPersonaIntro();
}

function resetPersonaIntro() {
  personaIndex = -1;
  personaAnswers = [];
  personaQuiz?.classList.remove("hidden");
  personaResult?.classList.add("hidden");
  if (personaTitle) personaTitle.textContent = "找到下一段人生体验";
  if (personaStepCount) personaStepCount.textContent = "Intro";
  if (personaProgressBar) personaProgressBar.style.width = "8%";
  if (personaSection) personaSection.textContent = "开始之前";
  if (personaQuestion) {
    personaQuestion.textContent = "这不是测试你是谁，而是帮你找到下一段人生体验。";
  }
  if (personaHeroCard) personaHeroCard.dataset.accent = "calm";
  if (personaOptions) {
    personaOptions.innerHTML = `
      <div class="persona-intro-card">
        <span>约 2-4 分钟</span>
        <strong>12 道轻量问答</strong>
        <p>每道题选择最接近你的答案。结果只代表阶段性倾向，不会把你固定成某一种人。</p>
      </div>
    `;
  }
  if (personaBack) personaBack.disabled = true;
  if (personaNext) personaNext.textContent = "开始生成画像";
  if (personaSkip) personaSkip.textContent = "稍后再测";
}

function startPersonaQuiz() {
  personaIndex = 0;
  personaAnswers = [];
  renderPersonaQuestion();
}

function renderPersonaQuestion() {
  const item = personaQuestions[personaIndex];
  if (!item) return;

  if (personaTitle) personaTitle.textContent = "选择更接近你的答案";
  if (personaStepCount) personaStepCount.textContent = `${personaIndex + 1} / ${personaQuestions.length}`;
  if (personaProgressBar) {
    personaProgressBar.style.width = `${((personaIndex + 1) / personaQuestions.length) * 100}%`;
  }
  if (personaSection) personaSection.textContent = item.section;
  if (personaQuestion) personaQuestion.textContent = item.question;
  if (personaHeroCard) personaHeroCard.dataset.accent = item.accent;
  if (personaBack) personaBack.disabled = false;
  if (personaNext) personaNext.textContent = personaIndex === personaQuestions.length - 1 ? "查看画像" : "下一题";
  if (personaSkip) personaSkip.textContent = "跳过";

  if (!personaOptions) return;
  const selectedIndex = personaAnswers[personaIndex]?.optionIndex;
  personaOptions.innerHTML = item.options
    .map(
      (option, index) => `
        <button class="persona-answer ${selectedIndex === index ? "active" : ""}" type="button" data-option-index="${index}">
          <span>${String.fromCharCode(65 + index)}</span>
          <strong>${option.text}</strong>
        </button>
      `
    )
    .join("");

  personaOptions.querySelectorAll(".persona-answer").forEach((button) => {
    button.addEventListener("click", () => {
      const optionIndex = Number(button.dataset.optionIndex);
      personaAnswers[personaIndex] = {
        optionIndex,
        scores: item.options[optionIndex].scores,
      };
      personaOptions.querySelectorAll(".persona-answer").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      window.setTimeout(() => goToNextPersonaQuestion(), 180);
    });
  });
}

function goToNextPersonaQuestion() {
  if (personaIndex < personaQuestions.length - 1) {
    personaIndex += 1;
    renderPersonaQuestion();
    return;
  }

  showPersonaResult();
}

function showPersonaResult() {
  const result = calculatePersonaResult();
  const profile = personaProfiles[result.tag] || personaProfiles.slow_recoverer;

  localStorage.setItem(
    "lifeFittingRoomPersona",
    JSON.stringify({
      personaId: result.tag,
      tag: result.tag,
      label: profile.label,
      mode: result.mode,
      modeLabel: profile.mode,
      summary: profile.summary,
      image: profile.image,
      scores: result.scores,
      displayScores: result.displayScores,
      topDimensions: result.topDimensions,
      recommendTags: profile.recommendTags || [],
      createdAt: new Date().toISOString(),
    })
  );

  personaQuiz?.classList.add("hidden");
  personaResult?.classList.remove("hidden");
  if (personaResultTitle) personaResultTitle.textContent = profile.label;
  if (personaResultCopy) personaResultCopy.textContent = profile.summary;
  if (personaResultImage) personaResultImage.src = profile.image;
  if (personaModeTitle) personaModeTitle.textContent = profile.mode;
  if (personaModeCopy) personaModeCopy.textContent = profile.modeCopy;

  if (personaMeterList) {
    const meters = [
      ["creation", "创造表达"],
      ["exploration", "探索边界"],
      ["reflection", "叙事观察"],
      ["contribution", "贡献连接"],
      ["business", "经营实践"],
      ["comfort", "舒适恢复"],
    ];
    personaMeterList.innerHTML = meters
      .map(([key, label]) => {
        const value = result.displayScores[key] || 0;
        return `
          <div class="persona-meter">
            <span>${label}</span>
            <div><i style="width: ${value}%"></i></div>
            <b>${value}</b>
          </div>
        `;
      })
      .join("");
  }
}

function calculatePersonaResult() {
  const scores = {};
  personaAnswers.forEach((answer) => {
    Object.entries(answer?.scores || {}).forEach(([key, value]) => {
      scores[key] = (scores[key] || 0) + value;
    });
  });

  const getScore = (key) => scores[key] || 0;
  const topDimensions = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key, value]) => ({ key, value }));
  const displayScores = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [key, Math.min(100, Math.round((value / 15) * 100))])
  );

  let mode = "comfort_mode";
  if (getScore("comfort") >= 9 || getScore("comfort") + getScore("structure") >= 14) {
    mode = "comfort_mode";
  } else if (getScore("reflection") >= 10 || getScore("reflection") + getScore("exploration") >= 17) {
    mode = "story_mode";
  } else if (getScore("exploration") + getScore("openness") >= 17 && getScore("comfort") < 12) {
    mode = "explore_mode";
  } else if (getScore("business") + getScore("structure") >= 17 || getScore("business") >= 11) {
    mode = "operate_mode";
  } else if (getScore("contribution") + getScore("social") >= 15 || getScore("contribution") >= 10) {
    mode = "contribute_mode";
  } else if (getScore("creation") >= 11 && getScore("comfort") < 12) {
    mode = "create_mode";
  }

  let tag = "slow_recoverer";
  if (getScore("contribution") + getScore("social") >= 15 || getScore("contribution") >= 10) {
    tag = "gentle_empath";
  } else if (getScore("business") + getScore("structure") >= 17 || getScore("business") >= 11) {
    tag = "life_operator";
  } else if (getScore("reflection") + getScore("exploration") >= 17 || getScore("reflection") >= 10) {
    tag = "city_observer";
  } else if (getScore("exploration") + getScore("openness") >= 17 && getScore("comfort") < 12) {
    tag = "boundary_breaker";
  } else if (getScore("creation") >= 11 && getScore("comfort") < 12) {
    tag = "aesthetic_creator";
  } else if (getScore("comfort") >= 9 || getScore("comfort") + getScore("structure") >= 14) {
    tag = "slow_recoverer";
  } else {
    const highestDimension = topDimensions[0];
    const fallbackMap = {
      comfort: "slow_recoverer",
      creation: "aesthetic_creator",
      reflection: "city_observer",
      exploration: "boundary_breaker",
      openness: "boundary_breaker",
      business: "life_operator",
      structure: "life_operator",
      social: "gentle_empath",
      contribution: "gentle_empath",
    };
    tag = highestDimension && highestDimension.value >= 7 ? fallbackMap[highestDimension.key] || "slow_recoverer" : "slow_recoverer";
  }

  return { tag, mode, scores, displayScores, topDimensions };
}

async function init() {
  bindInteractions();

  try {
    await loadSections();
    showScreen("home");
  } catch (error) {
    if (sectionLoader) {
      sectionLoader.textContent = "界面加载失败，请通过本地服务器打开页面。";
    }
    console.error(error);
  }
}

init();
