const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

async function loadMembers() {
  try {
    const res = await fetch(BACKEND_URL + "/members");
    const members = await res.json();

    const tbody = document.querySelector("#memberTable tbody");
    tbody.innerHTML = ""; // Clear old rows

    if (members.length === 0) {
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
    console.error("Error loading members:", err);
  }
}

// Form submission
document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const interest = document.getElementById("interest").value;

  try {
    const res = await fetch(BACKEND_URL + "/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile, interest })
    });

    const data = await res.json();

    if (data.success) {
      alert(`🎉 Joined successfully! Member ID: ${data.memberId}`);
      document.getElementById("joinForm").reset();
      loadMembers(); // Reload table automatically
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("❌ Server error");
    console.error(err);
  }
});

// Load members on page load
window.onload = loadMembers;
      
