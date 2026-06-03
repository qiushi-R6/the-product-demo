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

let screens = [];
let accountMode = "login";

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
