export default function LogInModal({
    onCloseHandler
}) {
    
    const backdropClickHandler = (e) => {
        if (e.target === e.currentTarget) {
        onCloseHandler();
        }
    };

    return (
        <div
          onClick={backdropClickHandler}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="relative bg-white rounded-lg p-6 w-96 shadow-lg">
            {/* Close button inside modal */}
            <button
              onClick={onCloseHandler}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
    );
}