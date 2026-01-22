// Backend URL
const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");
  const tableBody = document.getElementById("membersTableBody");

  // -------- Load Members Function --------
  async function loadMembers() {
    try {
      const res = await fetch(`${BACKEND_URL}/members`);
      const members = await res.json();

      tableBody.innerHTML = "";

      if (!members.length) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No members yet</td></tr>`;
        return;
      }

      members.forEach(m => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${m.name}</td>
          <td>${m.mobile}</td>
          <td>${m.interest}</td>
          <td>${m.memberId}</td>
        `;
        tableBody.appendChild(row);
      });

    } catch (err) {
      console.error("Error loading members:", err);
      tableBody.innerHTML = `<tr><td colspan="4" style="color:red; text-align:center;">Error loading members</td></tr>`;
    }
  }

  // -------- Form Submit Event --------
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page reload

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, interest })
      });

      const data = await res.json();

      if (data.success) {
        alert(`🎉 Joined successfully! Member ID: ${data.memberId}`);
        form.reset();
        loadMembers(); // Reload table automatically
      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.error("Server error:", err);
      alert("❌ Server error. Try again later.");
    }
  });

  // -------- Initial Members Load --------
  loadMembers();
});
