// ===============================
// IMPORT FIREBASE SDKs
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getFirestore,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===============================
// FIREBASE CONFIG (YOUR PROJECT)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCrHOA7o1nDNxb903ykCCdEGDU553n2n4k",
  authDomain: "login-system-ce7b1.firebaseapp.com",
  projectId: "login-system-ce7b1",
  appId: "1:587035786838:web:fa11a16c1c4162ecd105f7"
};

// ===============================
// INITIALIZE FIREBASE
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===============================
// SIGN UP FUNCTION
// ===============================
window.signup = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// ===============================
// LOGIN FUNCTION
// ===============================
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// ===============================
// LOGOUT FUNCTION
// ===============================
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// ===============================
// AUTH PROTECTION
// ===============================
onAuthStateChanged(auth, user => {
  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "index.html";
  }
});

// ===============================
// SAVE DASHBOARD FORM TO FIRESTORE
// ===============================
const form = document.getElementById("profileForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    const dob = document.getElementById("dob").value;

    const gender =
      document.querySelector('input[name="gender"]:checked')?.value || "";

    try {
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        email,
        mobile,
        address,
        gender,
        dob,
      });

      alert("Profile saved successfully");
    } catch (error) {
      alert(error.message);
    }
  });
}

//....................database rules....................//
// rules_version = '2'; 
// service cloud.firestore {
//   match / databases / { database } / documents {
//     match / { document=**} { 
// allow read, write: if true;
//     }
//   }
// }
