import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="w-screen h-screen bg-landing-page-img bg-no-repeat bg-cover text-white">
      {/* Navbar */}
      <nav className="px-5 py-6 flex justify-between items-center">
        {/* Nav Header */}
        <div className="">
          <h2 className="text-3xl font-medium">Video Call</h2>
        </div>
        {/* Nav List */}
        <div className="flex gap-6 cursor-pointer">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>
      {/* Landing Main Container */}
      <div className="flex justify-between px-12 h-[80vh] items-center">
        <div className="">
          <h1 className="text-5xl font-semibold">
            <span className="text-amber-500">Connect</span> with your loved ones
          </h1>
          <p className="text-3xl">Cover a distance by Video Call</p>
          <div role="button" className="bg-orange-400 w-fit p-4 rounded-2xl mt-6">
            <Link to={"/home"} className="text-3xl">
              Get Started
            </Link>
          </div>
        </div>
        <div>
          <img src="/img/mobile.png" alt="mobile" className="h-[70vh] w-auto" />
        </div>
      </div>
    </div>
  );
}
