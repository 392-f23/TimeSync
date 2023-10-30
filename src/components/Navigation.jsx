import { signInWithGoogle, signOut, useAuthState } from "..";


const AuthButton = ({ className }) => {
  const [user] = useAuthState();
  console.log("AuthButton render", user);
  return user ? <SignOutButton className={className} /> : <SignInButton className={className} />;
};

const SignInButton = ({ className }) => (
  <button className={`ms-auto btn btn-dark ${className}`} onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = ({ className }) => (
  <button className={`ms-auto btn btn-dark ${className}`} onClick={signOut}>
    Sign out
  </button>
);



const activation = ({ isActive }) => (isActive ? "active" : "inactive");

const Navigation = () => (
  <nav className="d-flex">
    <AuthButton className="buttonstyle" />
  </nav>
);

export default Navigation;
