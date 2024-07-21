import React, { FormEvent, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Authentication() {
  //   const [error, setError] = useState("");
  const { authType } = useParams();
  const forLogin: boolean = authType === "login";
  const navigate = useNavigate();
  const { handleRegister, handleLogin } = useContext(AuthContext);

  async function submitFormHandler(event: FormEvent) {
    event.preventDefault();
    try {
      const data = new FormData(event.target as HTMLFormElement);
      const user = {
        name: data.get("name") || "",
        username: data.get("username") || "",
        password: data.get("password") || "",
      };
      if (forLogin && handleLogin) {
        const response = await handleLogin(user.username as string, user.password as string);
        console.log(response);
      } else if (!forLogin && handleRegister) {
        const response = await handleRegister(user.name as string, user.username as string, user.password as string);
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!["login", "register"].includes(authType ?? "")) {
      navigate("/auth/login");
    }
  }, [authType, navigate]);

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitFormHandler} className="space-y-6">
            {!forLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    autoFocus
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {forLogin ? "Login" : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {forLogin ? "Not a member" : "Already a member"}?{" "}
            <Link
              to={forLogin ? "/auth/register" : "/auth/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {forLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
