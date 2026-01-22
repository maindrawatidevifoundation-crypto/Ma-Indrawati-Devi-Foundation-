const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

// Ensure JS loads
console.log("✅ Script Connected");

// -------- Load Members and Display --------
async function loadMembers() {
  try {
    const res = await fetch(`${BACKEND_URL}/members`);
    const members = await res.json();

    const tbody = document.getElementById("membersTableBody");
    tbody.innerHTML = ""; // Clear previous rows

    if (!members.length) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" style="text-align:center; padding:8px;">No members joined yet.</td>`;
      tbody.appendChild(row);
      return;
    }

    members.forEach(m => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="padding:8px; border:1px solid #ccc;">${m.name}</td>
        <td style="padding:8px; border:1px solid #ccc;">${m.mobile}</td>
        <td style="padding:8px; border:1px solid #ccc;">${m.interest}</td>
        <td style="padding:8px; border:1px solid #ccc;">${m.memberId}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("❌ Error loading members:", err);
  }
}

// -------- Join Form Submit --------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page reload

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const interest = document.getElementById("interest").value;

    if (!name || !mobile || !interest) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, interest })
      });

      const data = await res.json();

      if (data.success) {
        alert(`🎉 Joined successfully! Member ID: ${data.memberId}`);
        form.reset();
        loadMembers(); // Reload table
      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server error. Try again later.");
    }
  });

  // Load members on page load
  loadMembers();
});
