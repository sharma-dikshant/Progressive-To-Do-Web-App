# Progressive-To-Do-Web-App

take away from creating user-authentication component 
    i'm using onAuthStateChanged function directly to check the status of the current user. But it cause unnecessary renders whenever the App component re-render. But it should only check the status of user once the component mount.