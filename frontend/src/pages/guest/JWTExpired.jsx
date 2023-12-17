import NavBar from "../../components/Navbar";

export default function JWTExpired() {
  return (
    <>
      <NavBar />
      <h1 className="text-3xl">
        Sorry, your JWT is expired, You need to login
      </h1>
      <img
        className="m-auto my-4 max-h-[700px]"
        src="/public/jwt-expired.jpg"
        alt="jwt-expired-img"
      />
    </>
  );
}
