const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

// Load members on page load
async function loadMembers() {
  try {
    const res = await fetch(BACKEND_URL + "/members");
    const data = await res.json();

    const list = document.getElementById("memberList");
    list.innerHTML = "";

    data.forEach(m => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${m.name}</b> — ${m.interest}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading members:", err);
  }
}

// Submit join form
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
      alert("🎉 Joined successfully!\nMember ID: " + data.memberId);
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
loadMembers();

