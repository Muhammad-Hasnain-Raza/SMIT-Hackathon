import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, setDoc, doc, updateDoc, query, where, getDocs } from '../firebase/firebaseConfig.js';

document.getElementById('admissionPortalBtn').onclick = function() {
    document.getElementById('admissionPortal').style.display = 'block';
    document.getElementById('studentPortal').style.display = 'none';
};

document.getElementById('studentPortalBtn').onclick = function() {
    document.getElementById('studentPortal').style.display = 'block';
    document.getElementById('admissionPortal').style.display = 'none';
};

document.getElementById('addStudentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cnic = document.getElementById('cnic').value;
    const userType = document.getElementById('userType').value;

    try {
        // Check if email already exists
        const userQuery = query(collection(db, 'students'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            throw new Error("Email is already in use.");
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        await setDoc(doc(db, 'students', userId), {
            firstName,
            lastName,
            email,
            cnic,
            userType
        });
        document.getElementById('studentMessage').innerText = `Student ${firstName} added successfully!`;
        this.reset();
    } catch (error) {
        document.getElementById('studentMessage').innerText = error.message;
    }
});


document.getElementById('uploadMarksForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const course = document.getElementById('course').value;
    const studentId = document.getElementById('studentId').value;
    const marks = document.getElementById('marks').value;
    const totalMarks = document.getElementById('totalMarks').value;
    const grade = document.getElementById('grade').value;

    try {
        await addDoc(collection(db, 'marks'), {
            course,
            studentId,
            marks,
            totalMarks,
            grade
        });
        document.getElementById('marksMessage').innerText = `Marks for Student ID ${studentId} uploaded successfully!`;
        this.reset();
    } catch (error) {
        document.getElementById('marksMessage').innerText = error.message;
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById('loginMessage').innerText = '';
        document.getElementById('editProfileSection').style.display = 'block';
    } catch (error) {
        document.getElementById('loginMessage').innerText = error.message;
    }
});

document.getElementById('editProfileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const user = auth.currentUser;
    const cnic = document.getElementById('editCnic').value;
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;

    if (user) {
        try {
            await updateDoc(doc(db, 'students', user.uid), {
                cnic,
                firstName,
                lastName
            });
            document.getElementById('editProfileForm').reset();
            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert('User not logged in!');
    }
});


document.getElementById('resultForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const cnic = document.getElementById('resultCnic').value;

    try {
        const q = query(collection(db, 'marks'), where('studentId', '==', cnic));
        const querySnapshot = await getDocs(q);
        let results = '';
        querySnapshot.forEach((doc) => {
            results += `Course: ${doc.data().course}, Marks: ${doc.data().marks}, Grade: ${doc.data().grade}<br>`;
        });
        document.getElementById('resultMessage').innerHTML = results ? results : 'No results found.';
    } catch (error) {
        document.getElementById('resultMessage').innerText = error.message;
    }
});
