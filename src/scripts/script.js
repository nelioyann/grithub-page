const elToggle = document.querySelector(".toggle-input");
const elBody = document.querySelector("body");
// Extract the dark and light colors from the css
let dark = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-dark"
);
let light = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-light"
);

const changeUiTheme = (theme) => {
  if (theme == "light") {
    elBody.classList.remove("theme-dark");
    elBody.classList.add("theme-light");
    document.documentElement.style.setProperty("--background", light);
    document.documentElement.style.setProperty("--foreground", dark);
  } else {
    elBody.classList.remove("theme-light");
    elBody.classList.add("theme-dark");
    document.documentElement.style.setProperty("--background", dark);
    document.documentElement.style.setProperty("--foreground", light);
  }
};

const getPreferedTheme = () => {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
  let preferedTheme = localStorage.getItem("theme");
  return preferedTheme;
};

const updateToggle = (theme) => {
  if (theme === "light") {
    elToggle.checked = true;
  } else {
    elToggle.checked = false;
  }
};

// Retrieve the preference
let preferedTheme = getPreferedTheme();
changeUiTheme(preferedTheme);
updateToggle(preferedTheme);
console.log("First, you prefer", preferedTheme);

// Default theme is retrieved from localstorage or defaulted to dark
let background = preferedTheme === "dark" ? dark : light;
let foreground = preferedTheme === "dark" ? light : dark;

elToggle.addEventListener("click", () => {
  let preferedTheme = elToggle.checked ? "light" : "dark";
  changeUiTheme(preferedTheme);
  localStorage.setItem("theme", preferedTheme);
});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();

  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".loading-screen", {
    duration: 0.8,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.4,
  });
  tl.set(".loading-screen", {
    left: "-100%"
  });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".animate-fade-up", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

barba.init({
  sync: true,

  transitions: [{
    async leave(data) {
      const done = this.async();

      pageTransition();
      await delay(1000);
      done();
    },

    async enter(data) {
      contentAnimation();
    },

    async once(data) {
      contentAnimation();
    },
  }, ],
});