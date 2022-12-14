// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_x7I1W5vx11OjXGh8d6K68e4ATYm_FW8",
  authDomain: "chatapp-2748a.firebaseapp.com",
  projectId: "chatapp-2748a",
  storageBucket: "chatapp-2748a.appspot.com",
  messagingSenderId: "568214790896",
  appId: "1:568214790896:web:581463172c0acf76ae1835",
  measurementId: "G-F72R2QXLGD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let signup = document.getElementById("signup");
let login = document.getElementById("login");
let anker1 = document.getElementById("anker1");
let anker2 = document.getElementById("anker2");

anker1.addEventListener("click", () => {
  login.style.display = "none";
  signup.style.display = "block";
});

anker2.addEventListener("click", () => {
  signup.style.display = "none";
  login.style.display = "block";
});

// variables
let loginSubmit = document.getElementById("loginSubmit");
let email = document.getElementById("email");
let password = document.getElementById("password");

loginSubmit.addEventListener("click", () => {
  event.preventDefault();
  const emptyEmailRegix = /^\s*$/.test(email.value);
  const emailRegix =
    /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email.value);
  const emptyPasswordRegix = /^\s*$/.test(password.value);
  const passwordRegix = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(
    password.value
  );

  if (emptyEmailRegix) {
    swal("Warning!", "Your Email is Empty!", "error");
  } else if (!emailRegix) {
    swal("Warning!", "Your Email Address is invalid!", "error");
  } else if (emptyPasswordRegix) {
    swal("Warning!", "Your password is Empty!", "error");
  } else if (!passwordRegix) {
    swal(
      "Warning!",
      "Your password must be contain 8 character the Numbers and Strings!",
      "error"
    );
  } else if (
    !emptyEmailRegix &&
    emailRegix &&
    !emptyPasswordRegix &&
    passwordRegix
  ) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal(
          "Warning!",
          "User Not Found please you are go and registered your account!",
          "error"
        );
      });
  }
});

// signup
let signUpSubmit = document.getElementById("signUpSubmit");
let name = document.getElementById("name");
let fatherName = document.getElementById("fatherName");
let date = document.getElementById("date");
let email1 = document.getElementById("email1");
let password1 = document.getElementById("password1");
let fileUplaod = document.getElementById("file");
let loader1 = document.getElementById("loader1");

signUpSubmit.addEventListener("click", async () => {
  event.preventDefault();

  const nameRegix = /^\s*$/.test(name.value);
  const nameRegix2 = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(name.value);
  const fatherNameRegix = /^\s*$/.test(fatherName.value);
  const fatherNameRegix2 = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(
    fatherName.value
  );
  const dateRegix = /^\s*$/.test(date.value);
  const emailRegix = /^\s*$/.test(email1.value);
  const emailRegix2 =
    /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email1.value);
  const passwordRegix = /^\s*$/.test(password1.value);
  const passwordRegix2 = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(
    password1.value
  );

  if (nameRegix) {
    swal("Warning!", "Your Name is Empty!", "error");
  } else if (!nameRegix2) {
    swal(
      "Warning!",
      "Your Name must be contain 4 or more asciii character!",
      "error"
    );
  } else if (fatherNameRegix) {
    swal("Warning!", "Your Father Name is Empty!", "error");
  } else if (!fatherNameRegix2) {
    swal(
      "Warning!",
      "Your Father Name must be contain 4 or more asciii character!",
      "error"
    );
  } else if (dateRegix) {
    swal("Warning!", "Your Date is Empty!", "error");
  } else if (emailRegix) {
    swal("Warning!", "Your Email Address is Empty!", "error");
  } else if (!emailRegix2) {
    swal("Warning!", "Your Email Address is invalid!", "error");
  } else if (passwordRegix) {
    swal("Warning!", "Your Password is Empty!", "error");
  } else if (!passwordRegix2) {
    swal(
      "Warning!",
      "Your password must be contain 8 character the Numbers and Strings!",
      "error"
    );
  } else if (
    !nameRegix &&
    nameRegix2 &&
    !fatherNameRegix &&
    fatherNameRegix2 &&
    !dateRegix &&
    !emailRegix &&
    emailRegix2 &&
    !passwordRegix &&
    passwordRegix2
  ) {
    createUserWithEmailAndPassword(auth, email1.value, password1.value)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(db, "user", user.uid), {
          FullName: name.value,
          FatherName: fatherName.value,
          DateOfBirth: date.value,
          EmailAddress: email1.value,
          Password: password1.value,
        });
      })
      .then(async () => {
        const uploadFiles = (file) => {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const storageRef = ref(
              storage,
              `users/${auth.currentUser.uid}.png`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          });
        };
        let file = fileUplaod.files[0];
        let url = await uploadFiles(file);

        const washingtonRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(washingtonRef, {
          Profile: url,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal("Warning!", "You have already Registered!", "error");
      });

    signup.style.display = "none";
    loader1.style.display = "block";

    setTimeout(() => {
      loader1.style.display = "none";
      login.style.display = "block";
    }, 3000);
  }
});

window.onload = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
      console.log("not login");
    }
  });
};
