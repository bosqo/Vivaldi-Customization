(function liquidBorderTabs() {
  "use strict";

  const LIQUID_BORDER_STYLE = `
    /* Liquid border animation for active tabs */
    @property --liquid-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @property --liquid-pos {
      syntax: '<percentage>';
      initial-value: 0%;
      inherits: false;
    }

    @keyframes liquid-rotate {
      0% {
        --liquid-angle: 0deg;
      }
      100% {
        --liquid-angle: 360deg;
      }
    }

    @keyframes liquid-flow {
      0%, 100% {
        --liquid-pos: 0%;
      }
      50% {
        --liquid-pos: 100%;
      }
    }

    @keyframes liquid-morph {
      0%, 100% {
        border-radius: 4px 4px 0 0;
      }
      25% {
        border-radius: 6px 3px 0 0;
      }
      50% {
        border-radius: 3px 6px 0 0;
      }
      75% {
        border-radius: 5px 4px 0 0;
      }
    }

    /* Active tab wrapper styling */
    #tabs-container .tab-strip .tab-position.active .tab-wrapper {
      position: relative;
      z-index: 1;
      animation: liquid-morph 4s ease-in-out infinite;
    }

    /* The animated border pseudo-element */
    #tabs-container .tab-strip .tab-position.active .tab-wrapper::before {
      content: '';
      position: absolute;
      inset: -2px;
      z-index: -1;
      border-radius: inherit;
      background: conic-gradient(
        from var(--liquid-angle),
        var(--colorAccentBg, #4d6bfe) 0%,
        transparent 10%,
        var(--colorAccentBg, #4d6bfe) 20%,
        transparent 30%,
        var(--colorAccentBg, #4d6bfe) 40%,
        transparent 50%,
        var(--colorAccentBg, #4d6bfe) 60%,
        transparent 70%,
        var(--colorAccentBg, #4d6bfe) 80%,
        transparent 90%,
        var(--colorAccentBg, #4d6bfe) 100%
      );
      animation: liquid-rotate 3s linear infinite;
      opacity: 0.9;
      filter: blur(1px);
    }

    /* Inner background to create the border effect */
    #tabs-container .tab-strip .tab-position.active .tab-wrapper::after {
      content: '';
      position: absolute;
      inset: 1px;
      z-index: -1;
      border-radius: inherit;
      background: var(--colorBg, #1e1e1e);
    }

    /* Glow effect behind the border */
    #tabs-container .tab-strip .tab-position.active .tab-wrapper {
      box-shadow:
        0 0 10px color-mix(in srgb, var(--colorAccentBg, #4d6bfe) 40%, transparent),
        0 0 20px color-mix(in srgb, var(--colorAccentBg, #4d6bfe) 20%, transparent);
    }

    /* Alternative: Liquid blob style - uncomment to use instead */
    /*
    @keyframes liquid-blob {
      0%, 100% {
        border-radius: 4px 4px 0 0;
        transform: scale(1) rotate(0deg);
      }
      25% {
        border-radius: 8px 2px 0 0;
        transform: scale(1.01) rotate(0.5deg);
      }
      50% {
        border-radius: 2px 8px 0 0;
        transform: scale(0.99) rotate(-0.5deg);
      }
      75% {
        border-radius: 6px 4px 0 0;
        transform: scale(1.005) rotate(0.25deg);
      }
    }

    #tabs-container .tab-strip .tab-position.active .tab-wrapper {
      animation: liquid-blob 6s ease-in-out infinite;
    }
    */
  `;

  // Alternative more fluid version with wave effect
  const LIQUID_BORDER_STYLE_V2 = `
    /* Liquid wave border animation */
    @property --wave-offset {
      syntax: '<length>';
      initial-value: 0px;
      inherits: false;
    }

    @keyframes wave-flow {
      0% {
        --wave-offset: 0px;
      }
      100% {
        --wave-offset: 200px;
      }
    }

    @keyframes pulse-glow {
      0%, 100% {
        opacity: 0.6;
        filter: blur(2px);
      }
      50% {
        opacity: 1;
        filter: blur(1px);
      }
    }

    @keyframes subtle-morph {
      0%, 100% {
        border-radius: 4px 4px 0 0;
      }
      33% {
        border-radius: 5px 3px 0 0;
      }
      66% {
        border-radius: 3px 5px 0 0;
      }
    }

    #tabs-container .tab-strip .tab-position.active .tab-wrapper {
      position: relative;
      z-index: 1;
      animation: subtle-morph 5s ease-in-out infinite;
      isolation: isolate;
    }

    #tabs-container .tab-strip .tab-position.active .tab-wrapper::before {
      content: '';
      position: absolute;
      inset: -2px;
      z-index: -2;
      border-radius: inherit;
      background:
        linear-gradient(
          90deg,
          transparent 0%,
          var(--colorAccentBg, #4d6bfe) 20%,
          transparent 40%,
          var(--colorAccentBg, #4d6bfe) 60%,
          transparent 80%,
          var(--colorAccentBg, #4d6bfe) 100%
        );
      background-size: 200% 100%;
      animation:
        wave-flow 2s linear infinite,
        pulse-glow 3s ease-in-out infinite;
    }

    #tabs-container .tab-strip .tab-position.active .tab-wrapper::after {
      content: '';
      position: absolute;
      inset: 1px;
      z-index: -1;
      border-radius: inherit;
      background: var(--colorBg, #1e1e1e);
    }

    #tabs-container .tab-strip .tab-position.active .tab-wrapper {
      box-shadow:
        0 0 8px color-mix(in srgb, var(--colorAccentBg, #4d6bfe) 30%, transparent),
        0 0 16px color-mix(in srgb, var(--colorAccentBg, #4d6bfe) 15%, transparent);
    }
  `;

  // Config: Choose which style to use
  const USE_WAVE_STYLE = true; // Set to false for rotating conic gradient style

  const init = () => {
    const style = document.createElement("style");
    style.id = "liquid-border-tabs-style";
    style.innerHTML = USE_WAVE_STYLE ? LIQUID_BORDER_STYLE_V2 : LIQUID_BORDER_STYLE;
    document.head.appendChild(style);
    console.log("LiquidBorderTabs: Animation styles injected");
  };

  // Initialize when browser is ready
  const waitForBrowser = () => {
    if (document.querySelector("#browser")) {
      init();
    } else {
      setTimeout(waitForBrowser, 100);
    }
  };

  setTimeout(waitForBrowser, 500);
})();
