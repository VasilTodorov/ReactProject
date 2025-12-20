import LogInModal from "./LogInModal";
import { useState } from "react";
import SignUpModal from "./SignUpModal";
import { useContext } from "react";
import CloseContext from "../../contexts/close/CloseContext";
import { useAuth } from "../../contexts/auth/AuthContext";
import EditModal from "./EditModal";

export default function AuthFlowModal() {
    const { isAuthenticated } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const onCloseHandler = useContext(CloseContext);

    const backdropClickHandler = (e) => {
        if (e.target === e.currentTarget) {
        onCloseHandler();
        }
    };

    const toggleClickHandler = () => {
        setIsSignUp(!isSignUp)
    }
    return (
        <div
          onClick={backdropClickHandler}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="relative bg-white rounded-lg p-6 w-96 shadow-lg">
            {/* Close button */}
            <button
              onClick={onCloseHandler}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>                                                                                                                        
            
            {/* Toggle button inside modal */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={toggleClickHandler}
                    className="px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-full hover:bg-purple-200 transition-colors duration-200"
                        >
                        {isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
                </button>
            </div>

                {/* Log In Form */}
                {!isSignUp && 
                    <LogInModal/>
                }

                {/* Sign Up Form */}
                {isSignUp && (
                    <SignUpModal/>
                )}
          </div>
        </div>
    );
}