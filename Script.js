const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

// Load members from backend
async function loadMembers() {
  try {
    const res = await fetch(BACKEND_URL + "/members");
    const members = await res.json();

    const list = document.getElementById("memberList");
    list.innerHTML = "";

    members.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${m.name} (${m.interest})`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading members:", err);
  }
}

// Handle join form submission
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
      alert("🎉 Joined successfully! Member ID: " + data.memberId);
      document.getElementById("joinForm").reset();
      loadMembers();
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("❌ Server error");
  }
});

// Initial load
window.onload = loadMembers;
