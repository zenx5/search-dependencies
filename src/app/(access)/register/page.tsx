import Link from "next/link";
import ButtonGithub from "@/components/ButtonGithub";
import KavavSvg from "@/components/KavavSvg";
import { getError } from "@/tools/actions";
import { getUser } from "@/tools/actions/user";
import { REGISTER, ROUTER_PATH } from "@/tools/constants";

export default async function RegisterPage() {
  const error = getError()
  const user = getUser()

  return (

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <KavavSvg />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Registrarse
          </h2>
          <small className="italic text-center text-red-600 w-full block">{ error }</small>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" action={ROUTER_PATH.API.USER} method="POST">
            <input type="hidden" name="action" value={REGISTER}/>
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
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Correo electronico
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={ user ? user.email : "" }
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmar Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
              <div>
                <ButtonGithub label="Registrate con login"></ButtonGithub>
              </div>

              <div>
                <Link
                  href="/login"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Hacer login</Link>
              </div>
          </form>

        </div>
      </div>
    )
}
