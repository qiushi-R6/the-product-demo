const sectionMounts = document.querySelector("#section-mounts");
const sectionLoader = document.querySelector("#section-loader");
const tabs = document.querySelectorAll(".tabbar button");
const entryScreen = document.querySelector("#entry-screen");
const entryAction = document.querySelector("#entry-action");

let screens = [];

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
    });
  }
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
