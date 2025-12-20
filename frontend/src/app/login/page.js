
// "use client";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();

//     const res = await fetch("http://56.228.1.142:1337/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         identifier: email,
//         password: password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.error?.message || "Login failed");
//       return;
//     }

//     alert("Login Successful ✅");
//     console.log("JWT Token:", data.jwt);
//   }

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Enter Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Enter Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit">Login</button>
//     </form>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://56.228.1.142:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await res.json();
    console.log("Login Response:", data);

    // ❌ Failed Login
    if (!res.ok) {
      alert(data.error?.message || "Login failed");
      return;
    }

    // ✅ SUCCESS - Strapi v5 returns "token"
    const token = data.token;

    if (!token) {
      alert("No token received from Strapi");
      return;
    }

    // ✅ Save Token
    localStorage.setItem("token", token);

    alert("Login Successful ✅");

    // ✅ Redirect to home/dashboard
    router.push("/");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
