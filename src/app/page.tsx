import Header from "./Components/Header"

export default function Home() {
  return (
    <>
    <Header color="#3A393E" showLoginButton={true} showSignupButton={true} loginColor="#3A393E" singupColor="#C1FD35" />
    <h1>Digital Money House</h1>
    </>
  );
}
