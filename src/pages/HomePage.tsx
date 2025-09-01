export function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-gray-400 text-lg">Get started with your account</p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <a
            href="/login"
            className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition-colors duration-200 no-underline"
          >
            Login
          </a>

          <a
            href="/register"
            className="w-full sm:w-auto px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-neutral-100 rounded-lg text-center transition-colors duration-200 no-underline"
          >
            Get Started
          </a>

          <a
            href="/chat"
            className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition-colors duration-200 no-underline"
          >
            Chat
          </a>
        </div>
      </div>
    </div>
  );
}