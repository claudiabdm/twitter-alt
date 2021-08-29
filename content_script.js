// Put all the javascript code here, that you want to execute after page load.
(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const div = document.createElement("div");

  browser.runtime.onMessage.addListener((message) => {
    if (message.command == "on") {
      document.addEventListener("mouseover", handleMouseEnterImage);
    }
    if (message.command == "off") {
      document.removeEventListener("mouseover", handleMouseEnterImage);
    }
  });

  function handleMouseEnterImage(e) {
    if (isImage(e)) {
      const parent = e.target.parentElement;
      const gparent = e.target.parentElement.parentElement;
      div.textContent = e.target.alt == "" ? "Alt not found" : e.target.alt;
      addClasses(div, parent);
      gparent.appendChild(div);
      gparent.addEventListener("mouseout", handleMouseOutImage, {
        once: true,
      });
    }
  }
  function handleMouseOutImage(e) {
    if (isImage(e)) {
      const gparent = e.target.parentElement.parentElement;
      removeClasses(div, gparent);
    }
  }

  function isImage(e) {
    return (
      e.target.tagName == "IMG" &&
      !e.target.src.includes("https://abs-0.twimg.com/emoji/")
    );
  }

  function addClasses(instertedDiv, parent) {
    instertedDiv.classList.add("twitter-alt-div--hidden", "twitter-alt-div");
    parent.classList.add("twitter-alt-parent");
    requestAnimationFrame(() => {
      instertedDiv.classList.remove("twitter-alt-div--hidden");
    });
  }

  function removeClasses(instertedDiv, gparent) {
    instertedDiv.classList.add("twitter-alt-div--hidden");
    let starttime = null;
    requestAnimationFrame((timestamp) => {
      if (!starttime) starttime = timestamp;
      let runtime = timestamp - starttime;
      if (runtime > 2000) {
        gparent.removeChild(div);
      }
    });
  }
})();
