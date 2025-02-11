const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const displayNameField = document.getElementById('displayName');
const photoField = document.getElementById('photo');
const labels = document.getElementsByTagName('label');
const signUp = document.getElementById('signUp');
const failureModal = document.querySelector('.failure');


const auth = firebase.auth();

auth.useDeviceLanguage();

const signUpFunction = () => {
    
    const email = mailField.value;
    const password = passwordField.value;
    var name= document.getElementById('userName').value;
    var contact= document.getElementById('userContact').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        var user =auth.currentUser;
        var uid;
        if(user!=null){
            uid=user.uid;
        }
        var ref= firebase.database().ref('All users');
        var userData={
            Name: name,
            Contact: contact,
            Email: email,
            Donation:0,
        }
        ref.child(uid).set(userData);
        console.log('Signed Up Successfully !');
        sendVerificationEmail();
    })
    .catch(error => {
        console.error(error);
        failureModal.style.display = 'flex';
        setTimeout(()=>{
            failureModal.style.display = 'none';
        }, 1000);
    })
}

const sendVerificationEmail = () => {
    auth.currentUser.sendEmailVerification()
    .then(() => {
        console.log('Verification Email Sent Successfully !');
        window.location.assign('../../index.html');
    })
    .catch(error => {
        console.error(error);
    })
}

signUp.addEventListener('click', signUpFunction);
