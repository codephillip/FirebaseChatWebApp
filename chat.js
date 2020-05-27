{
	// links
	/*
	https://github.com/firebase/snippets-web/blob/cee9068490fbfb03c123fbda87bc08a73a122520/firestore/test.firestore.js#L306-L310
	https://firebaseopensource.com/projects/firebase/friendlyeats-web/
	*/
	// import 'firebase/firestore';

	const firebase = require("firebase");
	// Required for side-effects
	require("firebase/firestore");
	  // Your web app's Firebase configuration
	  var firebaseConfig = {
	    apiKey: "AIzaSyB5iDUqe5BP2PwQup8ZcV-GXBpmdypCo-Q",
	    authDomain: "safepal-85032.firebaseapp.com",
	    databaseURL: "https://safepal-85032.firebaseio.com",
	    projectId: "safepal-85032",
	    storageBucket: "safepal-85032.appspot.com",
	    messagingSenderId: "991858471604",
	    appId: "1:991858471604:web:992a2906ba8b200b711de1",
	    measurementId: "G-Y3BFE0LYGZ"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	  firebase.analytics();

	  // var db = firebase.firestore()

	firebase.firestore().collection("sample").add({
	    first: "Ada",
	    last: "Lovelace",
	    born: 1815
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}{}
