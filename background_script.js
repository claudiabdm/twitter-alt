// Put all the javascript code here, that you want to execute in background.
let isActive = false;

browser.windows.onFocusChanged.addListener(handleFocusChanged);
browser.tabs.onUpdated.addListener(handleActivation);

async function handleFocusChanged(windowId) {
  const activeTab = (
    await browser.tabs.query({ active: true, currentWindow: true })
  )[0];
  if (activeTab.url.includes("twitter"))
    return handleActivation(null, null, activeTab);
}

async function handleActivation(tabId, changeInfo, tab) {
  if (!tab.url.includes("twitter")) return;
  let { state } = await browser.storage.local.get("state");
  if (state == null) state = "on";
  browser.pageAction.onClicked.addListener(handleSwitch);
  changeState(tab, state);
}

async function handleSwitch(tab) {
  isActive ? await changeState(tab, "off") : await changeState(tab, "on");
}

async function changeState(tab, state) {
  browser.pageAction.setIcon({
    path: `icons/icon-${state}.svg`,
    tabId: tab.id,
  });
  browser.tabs.sendMessage(tab.id, {
    command: state,
  });
  isActive = state == "on";
  await browser.storage.local.set({ state });
}
