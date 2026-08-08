import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <div>
      <h1>MY APP</h1>

      <header>
        {/* This means that when user is signed out, we shoe him the 2 options, SignIn and SignOut button */}
        <Show when="signed-out">
          <SignInButton mode="modal"/>      {/* This mode is defualtly redirect, but that will take us somewhere else{
            so insted we better Stay here and login} */}
          <SignUpButton mode="modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton/>        {/* This shows the users avatar after signed in. */}
        </Show>
      </header>
    </div>
  );
}

export default App
