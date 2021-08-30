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
      const gparent = e.target.parentElement.parentElement;
      div.textContent = e.target.alt == "" ? "Alt not found" : e.target.alt;
      addClasses(div);
      gparent.appendChild(div);
      gparent.addEventListener("mouseout", handleMouseOutImage, {
        once: true,
      });
    }
  }
  function handleMouseOutImage(e) {
    if (isImage(e)) {
      div.classList.add("twitter-alt-div--hidden");
    }
  }

  function isImage(e) {
    return (
      e.target.tagName == "IMG" &&
      !e.target.src.includes("https://abs-0.twimg.com/emoji/")
    );
  }

  function addClasses(instertedDiv) {
    instertedDiv.classList.add("twitter-alt-div--hidden", "twitter-alt-div");
    requestAnimationFrame(() => {
      instertedDiv.classList.remove("twitter-alt-div--hidden");
    });
  }
})();
