function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-gray-400 text-lg">Get started with your account</p>
        </header>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <a
            href="/auth/login"
            className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition-colors duration-200 border border-neutral-700 no-underline"
          >
            Login
          </a>

          <a
            href="/auth/register"
            className="w-full sm:w-auto px-6 py-3 bg-fuchsia-400 hover:bg-fuchsia-300 text-neutral-950 rounded-lg text-center transition-colors duration-200 no-underline"
          >
            Get Started
          </a>

          <a
            href="/app/chat"
            className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition-colors duration-200 border border-neutral-700 no-underline"
          >
            Chat
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
