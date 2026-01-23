const BASE_URL = "https://indufoundation-backend-11.onrender.com";

/* =======================
   JOIN FORM
======================= */
document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    interest: document.getElementById("interest").value
  };

  try {
    const res = await fetch(`${BASE_URL}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("joinMsg").innerText =
      result.message || "Joined successfully ✅";

    document.getElementById("joinForm").reset();
    loadMembers();
  } catch (err) {
    document.getElementById("joinMsg").innerText = "Error joining ❌";
  }
});

/* =======================
   LOAD MEMBERS
======================= */
async function loadMembers() {
  try {
    const res = await fetch(`${BASE_URL}/members`);
    const members = await res.json();

    const table = document.getElementById("membersTableBody");
    table.innerHTML = "";
members.forEach(m => {
  table.innerHTML += `
    <tr>
      <td>${m.name}</td>
      <td>${m.mobile}</td>
      <td>${m.interest}</td>
      <td>${m.memberId || "N/A"}</td>  <!-- fallback -->
    </tr>
  `;
});
(m => {
      table.innerHTML += `
        <tr>
          <td>${m.name}</td>
          <td>${m.mobile}</td>
          <td>${m.interest}</td>
          <td>${m.memberId}</td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Members load error", err);
  }
}

/* =======================
   INIT
======================= */
loadMembers();
