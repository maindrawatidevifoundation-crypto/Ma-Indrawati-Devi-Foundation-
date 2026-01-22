alert("SCRIPT CONNECTED")
form.reset();
const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");

  if (!form) {
    console.error("Join form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚫 PAGE RELOAD STOP

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const interest = document.getElementById("interest").value;

    if (!name || !mobile || !interest) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, mobile, interest })
      });

      const data = await res.json();

      if (data.success) {
        alert(`🎉 Joined successfully! Member ID: ${data.memberId}`);
        form.reset();
      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  });
});
// =========================
// LOAD JOINED MEMBERS
// =========================

async function loadMembers() {
  try {
    const res = await fetch(`${BACKEND_URL}/members`);
    const members = await res.json();

    const tbody = document.getElementById("membersTableBody");

    if (!tbody) {
      console.warn("membersTableBody not found");
      return;
    }

    tbody.innerHTML = "";

    members.forEach((m, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${m.name}</td>
          <td>${m.mobile}</td>
          <td>${m.interest}</td>
          <td>${m.memberId}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

  } catch (error) {
    console.error("Error loading members:", error);
  }
}
