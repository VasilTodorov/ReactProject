import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
//import LogInModal from "../login/LoginModal.jsx";
import AuthFlowModal from "../authFlow/AuthFlowModal.jsx";
import CloseContext from "../../contexts/close/CloseContext.js";
import { useAuth } from "../../contexts/auth/AuthContext.jsx";
import UserMenu from "../dropdown/UserMenu.jsx";
import SmallSpinner from "../spineers/SmallSpinner.jsx";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, logoutHandler, loading } = useAuth()

  const onCloseHandler = () => {
    setIsModalOpen(false);
  }

  const onOpenHandler = () => {
    setIsModalOpen(true);
  }

  return (
    <header className="w-full">
      <nav className="border-gray-200 bg-gray-900 py-2.5">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Skill Swap
            </span>
          </Link>

          {/* Right buttons */}
          <div className="flex items-center lg:order-2">
            
            {loading 
                ?   <SmallSpinner/>
                : !isAuthenticated                  
                ?   <button
                    onClick={onOpenHandler}
                    className="rounded-lg border-2 border-white px-4 py-2 text-sm font-medium text-white
                                hover:bg-white hover:text-gray-900
                                focus:outline-none focus:ring-4 focus:ring-gray-300
                                sm:mr-2 lg:px-5 lg:py-2.5"
                    >
                    Log in / Sign up
                    </button>                  
                    : <UserMenu />
                    
            }
            

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 inline-flex items-center rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white lg:hidden"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Navigation links */}
          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <Link
                  className="block border-b border-gray-700 py-2 pr-4 pl-3 text-gray-400 hover:bg-gray-700 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-purple-700"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block border-b border-gray-700 py-2 pr-4 pl-3 text-gray-400 hover:bg-gray-700 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white"
                  to="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="block border-b border-gray-700 py-2 pr-4 pl-3 text-gray-400 hover:bg-gray-700 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <CloseContext.Provider value={ onCloseHandler }>
          {isModalOpen && (<AuthFlowModal />)}
      </CloseContext.Provider>
    </header>
  );
}
