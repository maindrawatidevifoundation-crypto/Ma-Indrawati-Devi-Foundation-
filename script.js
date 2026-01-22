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
