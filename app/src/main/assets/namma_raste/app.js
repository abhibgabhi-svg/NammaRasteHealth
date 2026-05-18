const roads = [
  { id: "r1", name: "Halli Main Road", village: "Gabbur", taluka: "Raichur", district: "Raichur", length: 5.2, built: "2021-05-12", warranty: "2026-05-11", code: "PMGSY-KA-RCH-104", contractor: "Kaveri Infra Works", contact: "+91 90000 10401", engineer: "Asha Patil", image: "assets/road-green.png", base: 88, traffic: "Medium", priority: "Market access", lat: 16.1724, lng: 77.3362 },
  { id: "r2", name: "APMC Link Road", village: "Manvi", taluka: "Raichur", district: "Raichur", length: 3.8, built: "2020-11-08", warranty: "2025-11-07", code: "PMGSY-KA-RCH-229", contractor: "Sri Lakshmi Roads", contact: "+91 90000 22902", engineer: "Rohit Kulkarni", image: "assets/road-amber.png", base: 68, traffic: "High", priority: "Crop transport", lat: 15.9913, lng: 77.0505 },
  { id: "r3", name: "Canal Bridge Road", village: "Sirwar", taluka: "Raichur", district: "Raichur", length: 2.4, built: "2019-07-18", warranty: "2024-07-17", code: "PMGSY-KA-RCH-318", contractor: "Tungabhadra Constructions", contact: "+91 90000 31803", engineer: "Meera Hegde", image: "assets/road-red.png", base: 42, traffic: "Heavy", priority: "Bridge approach", lat: 16.1716, lng: 77.0266 },
  { id: "r4", name: "School Bus Road", village: "Devadurga", taluka: "Raichur", district: "Raichur", length: 4.1, built: "2022-02-20", warranty: "2027-02-19", code: "PMGSY-KA-RCH-421", contractor: "Gram Setu Builders", contact: "+91 90000 42104", engineer: "Naveen Rao", image: "assets/road-school.png", base: 72, traffic: "Medium", priority: "Student safety", lat: 16.4134, lng: 76.9406 },
  { id: "r5", name: "Primary Health Centre Road", village: "Lingasugur", taluka: "Raichur", district: "Raichur", length: 6.0, built: "2023-01-14", warranty: "2028-01-13", code: "PMGSY-KA-RCH-512", contractor: "Kaveri Infra Works", contact: "+91 90000 10401", engineer: "Asha Patil", image: "assets/road-green.png", base: 91, traffic: "Medium", priority: "Ambulance route", lat: 16.1588, lng: 76.5227 },
  { id: "r6", name: "Milk Society Road", village: "Maski", taluka: "Raichur", district: "Raichur", length: 3.2, built: "2021-09-01", warranty: "2026-08-31", code: "PMGSY-KA-RCH-604", contractor: "Janatha Civil Works", contact: "+91 90000 60406", engineer: "Farhan Ali", image: "assets/road-amber.png", base: 64, traffic: "Low", priority: "Dairy logistics", lat: 15.9545, lng: 76.6593 },
  { id: "r7", name: "Anganwadi Cross Road", village: "Sindhanur", taluka: "Raichur", district: "Raichur", length: 2.9, built: "2024-03-10", warranty: "2029-03-09", code: "PMGSY-KA-RCH-707", contractor: "North Karnataka Infra", contact: "+91 90000 70707", engineer: "Latha Gowda", image: "assets/road-green.png", base: 94, traffic: "Low", priority: "Village services", lat: 15.7708, lng: 76.7556 },
  { id: "r8", name: "Tank Bund Service Road", village: "Kavital", taluka: "Raichur", district: "Raichur", length: 4.7, built: "2018-12-22", warranty: "2023-12-21", code: "PMGSY-KA-RCH-812", contractor: "Tungabhadra Constructions", contact: "+91 90000 31803", engineer: "Meera Hegde", image: "assets/road-red.png", base: 48, traffic: "Heavy", priority: "Flood-prone stretch", lat: 16.0729, lng: 76.9632 }
];

let reports = JSON.parse(localStorage.getItem("nrh-reports") || "null") || [
  { id: "d1", roadId: "r3", type: "Pothole", severity: "Critical", reporter: "Citizen", description: "Deep pothole after canal turn", lat: 16.2051, lng: 77.3468, submittedAt: "2026-05-04T09:15:00+05:30" },
  { id: "d2", roadId: "r2", type: "Waterlogging", severity: "Moderate", reporter: "Gram Panchayat", description: "Water stands after rain near market", lat: 16.2123, lng: 77.3621, submittedAt: "2026-05-03T17:40:00+05:30" },
  { id: "d3", roadId: "r4", type: "Crack", severity: "Minor", reporter: "School Driver", description: "Small crack near school gate", lat: 16.2218, lng: 77.3714, submittedAt: "2026-05-02T08:10:00+05:30" },
  { id: "d4", roadId: "r8", type: "Drain Blockage", severity: "Critical", reporter: "Citizen", description: "Blocked side drain near tank bund", lat: 16.2312, lng: 77.3181, submittedAt: "2026-05-01T18:20:00+05:30" },
  { id: "d5", roadId: "r6", type: "Overloaded Vehicle", severity: "Moderate", reporter: "Gram Panchayat", description: "Sugarcane trucks damaging shoulder edge", lat: 16.1986, lng: 77.3824, submittedAt: "2026-04-30T12:05:00+05:30" }
];

const state = { screen: "dashboard", selectedRoad: roads[0], timelineFilter: "all" };
const mapState = { map: null, layer: null };
const severityWeight = { Minor: 6, Moderate: 14, Critical: 26 };
const damageTypes = [
  { type: "Crack", image: "assets/damage-crack.png" },
  { type: "Pothole", image: "assets/damage-pothole.png" },
  { type: "Waterlogging", image: "assets/damage-waterlogging.png" },
  { type: "Drain Blockage", image: "assets/damage-drain.png" },
  { type: "Overloaded Vehicle", image: "assets/damage-overload.png" }
];

function healthScore(road) {
  const roadReports = reports.filter((report) => report.roadId === road.id);
  const penalty = roadReports.reduce((sum, report) => sum + severityWeight[report.severity], 0);
  return Math.max(0, Math.min(100, road.base - penalty));
}

function healthColor(score) {
  if (score > 70) return "Green";
  if (score >= 40) return "Amber";
  return "Red";
}

function roadWithHealth(road) {
  const score = healthScore(road);
  return { ...road, score, color: healthColor(score), reports: reports.filter((report) => report.roadId === road.id) };
}

function saveReports() {
  localStorage.setItem("nrh-reports", JSON.stringify(reports));
}

function go(screen) {
  state.screen = screen;
  document.querySelectorAll(".screen").forEach((node) => node.classList.toggle("active", node.id === `${screen}Screen`));
  document.querySelectorAll(".bottom-nav button").forEach((node) => node.classList.toggle("active", node.dataset.go === screen));
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
  if (screen === "map") {
    window.setTimeout(renderIndiaMap, 120);
  }
}

function renderDashboard() {
  const enriched = roads.map(roadWithHealth);
  const counts = { Green: 0, Amber: 0, Red: 0 };
  enriched.forEach((road) => counts[road.color] += 1);
  document.querySelector("#totalRoads").textContent = roads.length;
  document.querySelector("#healthyPercent").textContent = `${Math.round((counts.Green / roads.length) * 100)}%`;
  document.querySelector("#reportCount").textContent = reports.length;
  document.querySelector("#healthRings").innerHTML = ["Green", "Amber", "Red"].map((color) => `
    <div class="ring ${color.toLowerCase()}"><strong>${counts[color]}</strong><span>${color}</span></div>
  `).join("");
  document.querySelector("#criticalRoads").innerHTML = enriched
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(compactRoadCard)
    .join("");
}

function roadCard(road) {
  return `
    <article class="road-card ${road.color.toLowerCase()}">
      <img class="card-image" src="${road.image}" alt="" />
      <div class="road-row">
        <h3>${road.name}</h3>
        <span class="badge ${road.color}">${road.color} ${road.score}</span>
      </div>
      <p>${road.village}, ${road.taluka} | ${road.length} km | ${road.priority}</p>
      <p><strong>${road.code}</strong> | ${road.reports.length} report(s) | ${road.traffic} traffic</p>
      <button type="button" data-road="${road.id}">Open Life-Book</button>
    </article>
  `;
}

function compactRoadCard(road) {
  return `
    <article class="mini-card">
      <div><h3>${road.name}</h3><p>${road.village} | ${road.reports.length} report(s)</p></div>
      <span class="badge ${road.color}">${road.score}</span>
    </article>
  `;
}

function renderRoads() {
  const query = document.querySelector("#roadSearch").value.toLowerCase().trim();
  const filter = document.querySelector("#healthFilter").value;
  const visible = roads.map(roadWithHealth).filter((road) => {
    const text = `${road.name} ${road.village} ${road.taluka} ${road.code} ${road.contractor}`.toLowerCase();
    return (!query || text.includes(query)) && (!filter || road.color === filter);
  });
  document.querySelector("#roadList").innerHTML = visible.length ? visible.map(roadCard).join("") : `<div class="road-card">No roads match this search.</div>`;
}

function renderDetail() {
  const road = roadWithHealth(state.selectedRoad);
  document.querySelector("#detailTitle").textContent = road.name;
  document.querySelector("#detailImage").src = road.image;
  document.querySelector("#roadDetail").innerHTML = `
    <div class="detail-grid">
      <div class="info-card accent-${road.color.toLowerCase()}">
        <span class="badge ${road.color}">${road.color} health | ${road.score}/100</span>
        <h3>${road.name}</h3>
        <p>${road.village}, ${road.taluka}, ${road.district}</p>
        <p><strong>PMGSY ID:</strong> ${road.code}</p>
        <p><strong>Length:</strong> ${road.length} km | <strong>Built:</strong> ${road.built}</p>
        <div class="segment-row">${segmentClasses(road).map((color) => `<span class="segment ${color}"></span>`).join("")}</div>
      </div>
      <div class="contractor-card">
        <img class="card-image" src="assets/contractor-panel.png" alt="" />
        <h3>Contractor Information</h3>
        <p><strong>${road.contractor}</strong></p>
        <p>Contact: ${road.contact}</p>
        <p>Warranty ends: ${road.warranty}</p>
        <p>Assigned engineer: ${road.engineer}</p>
      </div>
      <div class="action-row">
        <button class="primary" type="button" data-go="timeline">View Timeline</button>
        <button class="secondary" type="button" data-go="report">Add Report</button>
      </div>
    </div>
  `;
}

function segmentClasses(road) {
  const roadReports = reports.filter((report) => report.roadId === road.id);
  return Array.from({ length: Math.max(3, Math.ceil(road.length)) }, (_, index) => {
    const related = roadReports.filter((_, reportIndex) => reportIndex % Math.ceil(road.length) === index);
    const score = road.base - related.reduce((sum, report) => sum + severityWeight[report.severity], 0);
    return healthColor(score);
  });
}

function renderReportForm() {
  document.querySelector("#reportRoad").innerHTML = roads.map((road) => `<option value="${road.id}">${road.name} | ${road.village}</option>`).join("");
  const selectedDamage = document.querySelector("#damageType").value;
  document.querySelector("#damagePicker").innerHTML = damageTypes.map((damage) => `
    <button class="damage-option ${damage.type === selectedDamage ? "active" : ""}" type="button" data-damage="${damage.type}">
      <img src="${damage.image}" alt="" />
      <span>${damage.type}</span>
    </button>
  `).join("");
}

function renderTimeline() {
  const allReports = reports
    .map((report) => ({ ...report, road: roads.find((road) => road.id === report.roadId) }))
    .filter((report) => state.timelineFilter === "all" || report.severity === state.timelineFilter)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  document.querySelector("#timelineList").innerHTML = allReports.length ? allReports.map((report) => `
    <article class="timeline-card">
      <img class="card-image" src="${damageImage(report.type)}" alt="" />
      <span class="badge ${report.severity === "Critical" ? "Red" : report.severity === "Moderate" ? "Amber" : "Green"}">${report.severity}</span>
      <h3>${report.type} on ${report.road?.name || "Unknown road"}</h3>
      <p>${report.description || "No description added."}</p>
      <p><strong>Reporter:</strong> ${report.reporter || "Citizen"} | <strong>GPS:</strong> ${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}</p>
      <p><strong>Timestamp:</strong> ${new Date(report.submittedAt).toLocaleString()}</p>
    </article>
  `).join("") : `<div class="timeline-card">No reports for this filter.</div>`;
}

function damageImage(type) {
  return damageTypes.find((damage) => damage.type === type)?.image || "assets/damage-report.png";
}

function renderMap() {
  const enriched = roads.map(roadWithHealth);
  renderIndiaMap();
  document.querySelector("#mapBox").innerHTML = enriched.map((road, index) => `
    <span class="map-line map-${road.color.toLowerCase()}" style="left:${16 + (index % 4) * 78}px; top:${40 + index * 27}px; width:${180 + (index % 3) * 34}px;"></span>
  `).join("") + reports.slice(-8).map((report, index) => `<span class="map-pin" title="${report.type}" style="left:${50 + (index % 4) * 72}px; top:${72 + Math.floor(index / 2) * 42}px;"></span>`).join("");
  document.querySelector("#mapLegend").innerHTML = enriched.map((road) => `
    <article class="mini-card">
      <div><h3>${road.name}</h3><p>${road.length} km | ${road.reports.length} pin(s) | score ${road.score}</p></div>
      <span class="badge ${road.color}">${road.color}</span>
    </article>
  `).join("");
}

function leafletColor(color) {
  return { Green: "#17935c", Amber: "#d18b12", Red: "#d94b57" }[color] || "#2577c7";
}

function markerIcon(color) {
  return L.divIcon({
    className: `health-marker ${color.toLowerCase()}`,
    html: `<span>${color[0]}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
}

function routeForRoad(road, index) {
  const offset = 0.018 + (index % 3) * 0.007;
  return [
    [road.lat - offset, road.lng - offset],
    [road.lat, road.lng],
    [road.lat + offset, road.lng + offset]
  ];
}

function renderIndiaMap() {
  const mapEl = document.querySelector("#indiaMap");
  if (!mapEl || typeof L === "undefined") {
    if (mapEl) {
      mapEl.innerHTML = `<div class="map-fallback"><strong>Live map tiles need internet.</strong><span>The colored segment map below still works offline.</span></div>`;
    }
    return;
  }

  if (!mapState.map) {
    mapState.map = L.map("indiaMap", {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([22.9734, 78.6569], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapState.map);
  }

  if (mapState.layer) {
    mapState.layer.remove();
  }

  const enriched = roads.map(roadWithHealth);
  mapState.layer = L.layerGroup().addTo(mapState.map);
  enriched.forEach((road, index) => {
    const route = routeForRoad(road, index);
    const color = leafletColor(road.color);
    L.polyline(route, { color, weight: 7, opacity: 0.82 }).addTo(mapState.layer);
    L.circleMarker([road.lat, road.lng], {
      radius: 18,
      color,
      weight: 3,
      fillColor: color,
      fillOpacity: 0.2
    }).addTo(mapState.layer);
    L.marker([road.lat, road.lng], { icon: markerIcon(road.color) })
      .addTo(mapState.layer)
      .bindPopup(`
        <strong>${road.name}</strong><br>
        ${road.village}, ${road.taluka}<br>
        Health: ${road.color} ${road.score}/100<br>
        Reports: ${road.reports.length}<br>
        Contractor: ${road.contractor}
      `);
  });

  const bounds = L.latLngBounds(enriched.map((road) => [road.lat, road.lng]));
  mapState.map.fitBounds(bounds.pad(0.25));
  mapState.map.invalidateSize();
}

function contractorStats() {
  const byName = {};
  roads.map(roadWithHealth).forEach((road) => {
    byName[road.contractor] ||= { name: road.contractor, contact: road.contact, roads: [], avg: 0 };
    byName[road.contractor].roads.push(road);
  });
  return Object.values(byName).map((contractor) => {
    contractor.avg = Math.round(contractor.roads.reduce((sum, road) => sum + road.score, 0) / contractor.roads.length);
    return contractor;
  });
}

function renderContractors() {
  document.querySelector("#contractorList").innerHTML = contractorStats().sort((a, b) => b.avg - a.avg).map((contractor) => `
    <article class="contractor-card">
      <img class="card-image" src="assets/contractor-panel.png" alt="" />
      <div class="road-row"><h3>${contractor.name}</h3><span class="badge ${healthColor(contractor.avg)}">${contractor.avg}</span></div>
      <p>${contractor.roads.length} road(s) maintained | Contact: ${contractor.contact}</p>
      <div class="progress"><span style="width:${contractor.avg}%"></span></div>
      <p><strong>Roads:</strong> ${contractor.roads.map((road) => road.name).join(", ")}</p>
    </article>
  `).join("");
}

function renderAnalytics() {
  const enriched = roads.map(roadWithHealth);
  const average = Math.round(enriched.reduce((sum, road) => sum + road.score, 0) / enriched.length);
  const critical = enriched.filter((road) => road.color === "Red").length;
  const warrantyActive = enriched.filter((road) => new Date(road.warranty) > new Date("2026-05-15")).length;
  document.querySelector("#analyticsGrid").innerHTML = [
    ["Taluka Average", `${average}/100`, "teal"],
    ["Red Roads", critical, "rose"],
    ["Active Warranties", warrantyActive, "purple"],
    ["Citizen Reports", reports.length, "orange"]
  ].map(([label, value, color]) => `<div class="metric-card ${color}"><strong>${value}</strong><span>${label}</span></div>`).join("");
  document.querySelector("#budgetPlanner").innerHTML = enriched.sort((a, b) => a.score - b.score).slice(0, 5).map((road) => {
    const estimate = Math.round((100 - road.score) * road.length * 1800);
    return `<div class="budget-row"><div><strong>${road.name}</strong><span>${road.color} | ${road.length} km</span></div><b>Rs ${estimate.toLocaleString("en-IN")}</b></div>`;
  }).join("");
}

function renderLeaderboard() {
  document.querySelector("#leaderboardList").innerHTML = roads.map(roadWithHealth).sort((a, b) => b.score - a.score).map((road, index) => `
    <article class="road-card rank-${index + 1}">
      <div class="road-row"><h3>#${index + 1} ${road.name}</h3><span class="badge ${road.color}">${road.score}</span></div>
      <p>${road.contractor} | ${road.village} | ${road.reports.length} report(s)</p>
      <div class="progress"><span style="width:${road.score}%"></span></div>
    </article>
  `).join("");
}

function renderCitizenHub() {
  document.querySelector("#citizenHub").innerHTML = `
    <section class="panel sunset"><h2>Citizen Auditor Badges</h2><p>Encourages villagers, school drivers and health workers to report early damage before the road fails.</p></section>
    <div class="badge-grid">
      <div><strong>12</strong><span>Verified auditors</span></div>
      <div><strong>5</strong><span>School route alerts</span></div>
      <div><strong>3</strong><span>Waterlogging hotspots</span></div>
      <div><strong>91%</strong><span>Report completeness</span></div>
    </div>
    <button class="primary warm full" type="button" data-go="report">File New Citizen Report</button>
  `;
}

function renderAI() {
  const chat = document.querySelector("#aiChat");
  if (!chat.dataset.ready) {
    chat.dataset.ready = "true";
    chat.innerHTML = `<div class="chat-message">This offline GenAI prototype simulates image classification, monsoon risk prediction and officer-ready notices using the local road data.</div>`;
  }
}

function render() {
  renderDashboard();
  renderRoads();
  renderDetail();
  renderReportForm();
  renderTimeline();
  renderMap();
  renderContractors();
  renderAnalytics();
  renderLeaderboard();
  renderCitizenHub();
  renderAI();
}

document.addEventListener("click", (event) => {
  const goButton = event.target.closest("[data-go]");
  if (goButton) go(goButton.dataset.go);
  const roadButton = event.target.closest("[data-road]");
  if (roadButton) {
    state.selectedRoad = roads.find((road) => road.id === roadButton.dataset.road) || roads[0];
    go("detail");
  }
  const damageButton = event.target.closest("[data-damage]");
  if (damageButton) {
    document.querySelector("#damageType").value = damageButton.dataset.damage;
    renderReportForm();
  }
  const timelineButton = event.target.closest("[data-timeline]");
  if (timelineButton) {
    state.timelineFilter = timelineButton.dataset.timeline;
    document.querySelectorAll("[data-timeline]").forEach((button) => button.classList.toggle("active", button === timelineButton));
    renderTimeline();
  }
});

document.querySelector("#roadSearch").addEventListener("input", renderRoads);
document.querySelector("#healthFilter").addEventListener("change", renderRoads);
document.querySelector("#reportForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const roadId = document.querySelector("#reportRoad").value;
  const report = {
    id: `d${Date.now()}`,
    roadId,
    type: document.querySelector("#damageType").value,
    severity: document.querySelector("#severity").value,
    reporter: document.querySelector("#reporter").value,
    description: document.querySelector("#description").value,
    lat: 16.2071 + Math.random() / 100,
    lng: 77.3540 + Math.random() / 100,
    submittedAt: new Date().toISOString()
  };
  reports.push(report);
  saveReports();
  state.selectedRoad = roads.find((road) => road.id === roadId) || roads[0];
  event.target.reset();
  go("detail");
});

document.querySelectorAll("[data-ai]").forEach((button) => {
  button.addEventListener("click", () => {
    const responses = {
      photo: "AI result: Pothole detected, Moderate severity, repair recommended within 14 days. Confidence 86%.",
      risk: "Monsoon risk: Canal Bridge Road and Tank Bund Service Road show drainage and pothole patterns. Schedule inspection before heavy rainfall.",
      query: "Query result: Canal Bridge Road and Tank Bund Service Road are high priority roads built before 2020.",
      letter: "Draft notice: Please inspect the reported stretch within 72 hours and update action taken with photo proof, material used and completion date."
    };
    document.querySelector("#aiChat").insertAdjacentHTML("beforeend", `<div class="chat-message user">${button.textContent}</div><div class="chat-message">${responses[button.dataset.ai]}</div>`);
  });
});

document.querySelector("#languageToggle").addEventListener("click", (event) => {
  event.currentTarget.textContent = event.currentTarget.textContent === "Kannada" ? "English" : "Kannada";
});

document.querySelector("#locateIndia").addEventListener("click", () => {
  if (mapState.map) {
    mapState.map.setView([22.9734, 78.6569], 5);
  }
});

render();
