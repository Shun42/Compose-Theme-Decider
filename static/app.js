const defaultSettings = {
  artists: [
    { name: "YOASOBI", weight: 5 },
    { name: "米津玄師", weight: 3 },
    { name: "Official髭男dism", weight: 7 },
    { name: "Queen", weight: 3 },
    { name: "ずっと真夜中でいいのに", weight: 10 },
    { name: "アリス", weight: 3 },
    { name: "NUMB", weight: 5 },
    { name: "10-FFEET", weight: 3 },
    { name: "Knocked Loose", weight: 5 },
    { name: "KAMIJO", weight: 7 },
    { name: "NEK!", weight: 3 },
    { name: "Sum 41", weight: 5 },
    { name: "D", weight: 5 },
    { name: "カラスは真っ白", weight: 5 },
    { name: "三月のパンタシア", weight: 3 },
    { name: "マザリ", weight: 3 },
    { name: "EGOIST", weight: 5 },
    { name: "UNISON SQUARE GARDEN", weight: 3 },
    { name: "CLAN QUEEN", weight: 5 },
    { name: "NOMELON NOLEMON", weight: 5 },
    { name: "thrown", weight: 5 },
    { name: "Keith Jarret", weight: 3 },
    { name: "マルシィ", weight: 3 },
    { name: "Art Blakey", weight: 3 },
    { name: "Oscar Peterson", weight: 3 },
    { name: "Ave Musica", weight: 7 },
    { name: "PALM", weight: 3 },
    { name: "AKASAKI", weight: 3 },
    { name: "indigo la End", weight: 7 },
    { name: "back number", weight: 7 },
    { name: "ANTHEM", weight: 5 },
    { name: "アイリフドーパ", weight: 5 },
    { name: "HER NAME IN BLOOD", weight: 3 },
    { name: "GIVEN BY THE FLAMES", weight: 3 },
    { name: "Sin Scripture", weight: 5 },
    { name: "結束バンド", weight: 3 },
    { name: "Get The Shot", weight: 3 },
    { name: "BAND-MAID", weight: 3 },
    { name: "Mettalica", weight: 3 },
    { name: "FIVE NEW OLD", weight: 3 },
    { name: "Veiled in Scarlet", weight: 5 },
    { name: "Every Little Thing", weight: 3 },
    { name: "シャ乱Q", weight: 3 },
    { name: "Green Day", weight: 5 },
    { name: "Body Snatcher", weight: 7 },
    { name: "B'z", weight: 7 },
    { name: "Nuclear Power Trio", weight: 5 },
    { name: "Nirvana", weight: 3 },
    { name: "純烈", weight: 5 },
    { name: "ovEnola", weight: 3 },
    { name: "Paleface Swiss", weight: 5 },
    { name: "村下孝蔵", weight: 5 },
    { name: "ピンク・レディー", weight: 5 },
    { name: "山口百恵", weight: 3 },
    { name: "ペンタゴン", weight: 5 },
    { name: "the GazzettE", weight: 3 },
    { name: "Lee Morgan", weight: 5 },
    { name: "アルルカン", weight: 5 },
    { name: "DADAROMA", weight: 5 },
    { name: "Prompts", weight: 3 },
    { name: "シド", weight: 5 },
    { name: "WANDS", weight: 3 },
    { name: "SILENT SIREN", weight: 3 },
    { name: "VICTIMOFDECEPTION", weight: 5 },
    { name: "Madmans Esprit", weight: 7 },
    { name: "竹内まりや", weight: 7 },
    { name: "石川さゆり", weight: 3 },
    { name: "野口五郎", weight: 7 },
    { name: "My Chemical Romance", weight: 3 },
    { name: "広瀬香美", weight: 3 },
    { name: "チェッカーズ", weight: 5 },
    { name: "NOCTURNAL BLOODLUST", weight: 3 },
    { name: "Wage War", weight: 3 },
    { name: "Hibria", weight: 5 },
    { name: "Slipknot", weight: 5 },
    { name: "Children Of Bodom", weight: 3 },
    { name: "Lamb of God", weight: 3 },
    { name: "Skid Row", weight: 5 },
    { name: "Arch Enemy", weight: 3 },
    { name: "Shrine of Malice", weight: 5 },
    { name: "Rhapsody", weight: 3 },
    { name: "Stratovarius", weight: 3 },
    { name: "Acid Black Cherry", weight: 7 },
    { name: "MinstreliX", weight: 5 },
    { name: "PassCode", weight: 5 },
    { name: "Chelsea Grin", weight: 3 },
    { name: "Thy Art is Murder", weight: 3 },
    { name: "Suicide Silence", weight: 3 },
    { name: "椎名林檎", weight: 5 },
  ],
  bpmMin: 80,
  bpmMax: 200,
  sections: ["イントロ", "Aメロ", "サビ"],
};

const storageKey = "composeThemeDeciderSettings";
let settings = loadSettings();

function cloneDefaultSettings() {
  return JSON.parse(JSON.stringify(defaultSettings));
}

function normalizeSettings(value) {
  const source = value && typeof value === "object" ? value : {};
  const artists = Array.isArray(source.artists)
    ? source.artists
        .map((artist) => ({
          name: String(artist.name || "").trim(),
          weight: Math.max(1, Number.parseInt(artist.weight, 10) || 1),
        }))
    : cloneDefaultSettings().artists;

  const sections = Array.isArray(source.sections)
    ? source.sections.map((section) => String(section).trim()).filter(Boolean)
    : [...defaultSettings.sections];

  const bpmMin = Number.parseInt(source.bpmMin, 10);
  const bpmMax = Number.parseInt(source.bpmMax, 10);
  const normalizedMin = Number.isFinite(bpmMin) ? bpmMin : defaultSettings.bpmMin;
  const normalizedMax = Number.isFinite(bpmMax) ? bpmMax : defaultSettings.bpmMax;

  return {
    artists,
    bpmMin: Math.min(normalizedMin, normalizedMax),
    bpmMax: Math.max(normalizedMin, normalizedMax),
    sections,
  };
}

function loadSettings() {
  try {
    return normalizeSettings(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    return cloneDefaultSettings();
  }
}

function saveSettings() {
  localStorage.setItem(storageKey, JSON.stringify(settings));
  document.getElementById("save-status").textContent = "保存済み";
}

function drawWeighted(items) {
  const totalWeight = items.reduce((total, item) => total + item.weight, 0);
  let cursor = Math.random() * totalWeight;

  for (const item of items) {
    cursor -= item.weight;
    if (cursor < 0) {
      return item.name;
    }
  }

  return items[items.length - 1].name;
}

function drawTheme() {
  const artists = settings.artists.filter((artist) => artist.name);
  const sections = settings.sections.filter(Boolean);

  return {
    artist: artists.length ? drawWeighted(artists) : "設定してください",
    bpm: Math.floor(Math.random() * (settings.bpmMax - settings.bpmMin + 1)) + settings.bpmMin,
    section: sections.length ? sections[Math.floor(Math.random() * sections.length)] : "設定してください",
  };
}

function renderTheme(theme) {
  document.getElementById("artist").textContent = theme.artist;
  document.getElementById("bpm").textContent = theme.bpm;
  document.getElementById("section").textContent = theme.section;
}

function renderArtistRows() {
  const list = document.getElementById("artist-list");
  list.replaceChildren();

  settings.artists.forEach((artist, index) => {
    const row = document.createElement("div");
    row.className = "artist-row";
    row.dataset.index = String(index);

    const nameLabel = document.createElement("label");
    nameLabel.className = "field artist-name-field";
    nameLabel.innerHTML = `<span>リファレンス</span><input type="text" value="">`;
    nameLabel.querySelector("input").value = artist.name;

    const weightLabel = document.createElement("label");
    weightLabel.className = "field artist-weight-field";
    weightLabel.innerHTML = `<span>重み</span><input type="number" min="1" max="99" value="">`;
    weightLabel.querySelector("input").value = String(artist.weight);

    const removeButton = document.createElement("button");
    removeButton.className = "icon-button";
    removeButton.type = "button";
    removeButton.textContent = "削除";
    removeButton.ariaLabel = `${artist.name}を削除`;

    row.append(nameLabel, weightLabel, removeButton);
    list.append(row);
  });
}

function renderSettingsForm() {
  document.getElementById("bpm-min").value = String(settings.bpmMin);
  document.getElementById("bpm-max").value = String(settings.bpmMax);
  document.getElementById("sections-input").value = settings.sections.join("\n");
  renderArtistRows();
  document.getElementById("save-status").textContent = "保存済み";
}

function updateArtist(index, key, value) {
  if (!settings.artists[index]) {
    return;
  }

  if (key === "name") {
    settings.artists[index].name = value.trim();
  } else {
    settings.artists[index].weight = Math.max(1, Number.parseInt(value, 10) || 1);
  }

  settings = normalizeSettings(settings);
  saveSettings();
}

function updateBpmRange() {
  settings = normalizeSettings({
    ...settings,
    bpmMin: document.getElementById("bpm-min").value,
    bpmMax: document.getElementById("bpm-max").value,
  });
  renderSettingsForm();
  saveSettings();
}

function updateSections() {
  settings = normalizeSettings({
    ...settings,
    sections: document.getElementById("sections-input").value.split(/\r?\n/),
  });
  saveSettings();
}

document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-button");
  const artistList = document.getElementById("artist-list");
  const addArtistButton = document.getElementById("add-artist-button");
  const resetButton = document.getElementById("reset-settings-button");
  const sectionsInput = document.getElementById("sections-input");

  renderSettingsForm();
  renderTheme(drawTheme());

  drawButton.addEventListener("click", () => {
    drawButton.disabled = true;
    drawButton.textContent = "抽選中...";

    window.setTimeout(() => {
      renderTheme(drawTheme());
      drawButton.disabled = false;
      drawButton.textContent = "もう一度抽選する";
    }, 120);
  });

  artistList.addEventListener("input", (event) => {
    const row = event.target.closest(".artist-row");
    const index = Number.parseInt(row.dataset.index, 10);
    const inputs = row.querySelectorAll("input");
    const key = event.target === inputs[0] ? "name" : "weight";
    updateArtist(index, key, event.target.value);
  });

  artistList.addEventListener("click", (event) => {
    if (!event.target.matches(".icon-button")) {
      return;
    }

    const row = event.target.closest(".artist-row");
    const index = Number.parseInt(row.dataset.index, 10);
    settings.artists.splice(index, 1);
    settings = normalizeSettings(settings);
    renderArtistRows();
    saveSettings();
  });

  addArtistButton.addEventListener("click", () => {
    settings.artists.push({ name: "新しいリファレンス", weight: 3 });
    renderArtistRows();
    saveSettings();
  });

  document.getElementById("bpm-min").addEventListener("change", updateBpmRange);
  document.getElementById("bpm-max").addEventListener("change", updateBpmRange);

  sectionsInput.addEventListener("input", updateSections);

  resetButton.addEventListener("click", () => {
    settings = cloneDefaultSettings();
    renderSettingsForm();
    saveSettings();
    renderTheme(drawTheme());
  });
});
