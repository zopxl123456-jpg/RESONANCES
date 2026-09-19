function discordButton(url) {
    const a = document.createElement("a");
    a.className = "discord-btn";

    if (url && !url.includes("YOUR_ID")) {
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "DISCORD ↗";
    } else {
        a.href = "#";
        a.textContent = "DISCORD — TBA";
        a.classList.add("disabled");

        a.addEventListener("click", (e) => {
            e.preventDefault();
        });
    }

    return a;
}


// ========================================
// ทำให้การ์ดผู้เล่นกดได้
// ========================================

function makeProfileInteractive(element, player) {
    element.classList.add("profile-clickable");
    element.tabIndex = 0;
    element.setAttribute("role", "button");

    element.addEventListener("click", (event) => {

        // ถ้ากดปุ่ม Discord ไม่ต้องเปิด Profile
        if (event.target.closest(".discord-btn")) {
            return;
        }

        openPlayerProfile(player);
    });


    element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPlayerProfile(player);
        }
    });
}


// ========================================
// CAPTAIN / VICE CAPTAIN
// ========================================

function renderFeatured(id, player) {
    const root = document.getElementById(id);

    if (!root) return;

    root.innerHTML = "";


    const img = document.createElement("img");
    img.className = "featured-photo";
    img.src = player.image;
    img.alt = player.name;


    const info = document.createElement("div");
    info.className = "player-info";


    const name = document.createElement("h3");
    name.textContent = player.name;


    const role = document.createElement("div");
    role.className = "player-role";
    role.textContent = player.role;


    const desc = document.createElement("p");
    desc.className = "player-desc";
    desc.textContent = player.description || "";


    info.append(
        name,
        role,
        desc,
        discordButton(player.discord)
    );


    root.append(
        img,
        info
    );


    makeProfileInteractive(root, player);
}


// ========================================
// MEMBERS
// ========================================

function renderMembers() {
    const grid = document.getElementById("memberGrid");

    if (!grid) return;

    grid.innerHTML = "";


    TEAM_DATA.members.forEach((player) => {

        const card = document.createElement("article");
        card.className = "player-card";


        const img = document.createElement("img");
        img.className = "player-photo";
        img.src = player.image;
        img.alt = player.name;


        const name = document.createElement("h3");
        name.textContent = player.name;


        const role = document.createElement("div");
        role.className = "player-role";
        role.textContent = player.role;


        card.append(
            img,
            name,
            role,
            discordButton(player.discord)
        );


        makeProfileInteractive(card, player);

        grid.appendChild(card);
    });
}


// ========================================
// เปิด PLAYER PROFILE
// ========================================

function openPlayerProfile(player) {
    const modal = document.getElementById("playerModal");

    if (!modal) {
        console.error("ไม่พบ #playerModal ใน HTML");
        return;
    }


    const image = document.getElementById("modalPlayerImage");
    const name = document.getElementById("modalPlayerName");
    const role = document.getElementById("modalPlayerRole");

    const teamRole = document.getElementById("modalTeamRole");
    const competitiveRole = document.getElementById("modalCompetitiveRole");
    const region = document.getElementById("modalRegion");
    const mains = document.getElementById("modalMains");

    const description = document.getElementById(
        "modalPlayerDescription"
    );

    const quote = document.getElementById("modalQuote");

    const discordSlot = document.getElementById(
        "modalDiscordSlot"
    );
    
    const career =
    document.getElementById("modalCareer");

const careerList =
    document.getElementById("modalCareerList");


    image.src = player.image || "";
    image.alt = player.name || "Player";

    name.textContent = player.name || "PLAYER";

    role.textContent = player.role || "MEMBER";

    teamRole.textContent =
        player.role || "TBA";

    competitiveRole.textContent =
        player.competitiveRole || "TBA";

    region.textContent =
        player.region || "TBA";

    mains.textContent =
        Array.isArray(player.mains)
            ? player.mains.join(" / ")
            : player.mains || "TBA";

    description.textContent =
        player.description || "";

    quote.textContent =
        player.quote
            ? `"${player.quote}"`
            : "";


    discordSlot.innerHTML = "";

    discordSlot.appendChild(
        discordButton(player.discord)
    );


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}


// ========================================
// ปิด PLAYER PROFILE
// ========================================

function closePlayerProfile() {
    const modal = document.getElementById("playerModal");

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}


// ========================================
// ACHIEVEMENTS
// ========================================

function renderAchievements() {
    const grid = document.getElementById("achievementGrid");

    if (!grid) return;

    grid.innerHTML = "";

    const achievements =
        TEAM_DATA.achievements || [];


    if (achievements.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <span>THE ARCHIVE IS WAITING</span>

                <strong>
                    NO ACHIEVEMENTS RECORDED YET
                </strong>

                <p>
                    The next victory will leave its mark here.
                </p>
            </div>
        `;

        return;
    }


    achievements.forEach((achievement) => {

        const card =
            document.createElement("article");

        card.className =
            "achievement-card";

        card.innerHTML = `

            <div class="achievement-top">

                <span class="achievement-year">
                    ${achievement.year || ""}
                </span>

                <span class="achievement-symbol">
                    ✦
                </span>

            </div>

            <div class="achievement-placement">
                ${achievement.placement || "RESULT"}
            </div>

            <h3>
                ${achievement.tournament || "TOURNAMENT"}
            </h3>

            <p>
                ${achievement.detail || ""}
            </p>

        `;

        grid.appendChild(card);
    });
}


// ========================================
// MATCH HISTORY
// ========================================

function renderMatchHistory() {
    const container =
        document.getElementById("matchHistory");

    if (!container) return;

    container.innerHTML = "";

    const matches =
        TEAM_DATA.matchHistory || [];


    if (matches.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <span>
                    THE BATTLE LOG
                </span>

                <strong>
                    NO MATCHES RECORDED YET
                </strong>

                <p>
                    Future trials will appear here.
                </p>

            </div>
        `;

        return;
    }


    matches.forEach((match) => {

        const card =
            document.createElement("article");

        const result =
            (match.result || "TBA")
            .toUpperCase();


        card.className =
            `history-card ${result.toLowerCase()}`;


        card.innerHTML = `

            <div class="history-result">
                ${result}
            </div>

            <div class="history-opponent">

                <span>
                    RESONANCE VS
                </span>

                <strong>
                    ${match.opponent || "TBA"}
                </strong>

            </div>

            <div class="history-event">

                <span>
                    ${match.tournament || ""}
                </span>

                <small>
                    ${match.round || ""}
                </small>

            </div>

            <div class="history-score">
                ${match.score || "-"}
            </div>

            <div class="history-date">
                ${match.date || ""}
            </div>
        `;

        container.appendChild(card);
    });
}


// ========================================
// TOURNAMENT / RECORD
// ========================================

function renderAll() {

    const tournament =
        TEAM_DATA.tournament;

    const match =
        TEAM_DATA.currentMatch;

    const record =
        TEAM_DATA.record;


    document.getElementById(
        "tournamentName"
    ).textContent =
        tournament.name;


    document.getElementById(
        "tournamentStatus"
    ).textContent =
        tournament.status;


    document.getElementById(
        "tournamentRegion"
    ).textContent =
        tournament.region;


    document.getElementById(
        "tournamentFormat"
    ).textContent =
        tournament.format;


    document.getElementById(
        "opponentName"
    ).textContent =
        match.opponent;


    document.getElementById(
        "matchRound"
    ).textContent =
        `ROUND — ${match.round}`;


    document.getElementById(
        "matchStatus"
    ).textContent =
        `STATUS — ${match.status}`;


    document.getElementById(
        "winStreak"
    ).textContent =
        record.winStreak;


    document.getElementById(
        "wins"
    ).textContent =
        record.wins;


    document.getElementById(
        "losses"
    ).textContent =
        record.losses;


    const total =
        record.wins + record.losses;


    const winRate =
        total
            ? (
                (
                    record.wins /
                    total
                ) * 100
            ).toFixed(1)
            : 0;


    document.getElementById(
        "winRate"
    ).textContent =
        `${winRate}%`;


    document.getElementById(
        "headerDiscord"
    ).href =
        TEAM_DATA.discord;


    document.getElementById(
        "contactDiscord"
    ).href =
        TEAM_DATA.discord;
}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderFeatured(
            "captainCard",
            TEAM_DATA.captain
        );

        renderFeatured(
            "viceCaptainCard",
            TEAM_DATA.viceCaptain
        );

        renderMembers();

        renderAchievements();

        renderMatchHistory();

        renderAll();


        // ปุ่มปิด Modal
        document
            .querySelectorAll(
                "[data-close-modal]"
            )
            .forEach((element) => {

                element.addEventListener(
                    "click",
                    closePlayerProfile
                );

            });


        // ESC = ปิด Profile
        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {
                    closePlayerProfile();
                }

            }
        );

    }
);