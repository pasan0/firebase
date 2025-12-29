// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase config (PASTE YOURS HERE)
const firebaseConfig = {
  apiKey: "AIzaSyCrHOA7o1nDNxb903ykCCdEGDU553n2n4k",
  authDomain: "login-system-ce7b1.firebaseapp.com",
  projectId: "login-system-ce7b1",
  appId: "1:587035786838:web:fa11a16c1c4162ecd105f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
window.signup = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Login
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// Protect Dashboard
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "index.html";
  }
});
