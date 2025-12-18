export default function SmallSpinner() {
    return (
        <div
  aria-label="Loading..."
  role="status"
  className="flex items-center space-x-2"
>
  <div className="flex items-center gap-3 text-4xl font-medium text-gray-500">
  <svg
    className="h-[1em] w-[1em] animate-spin stroke-current"
    viewBox="0 0 256 256"
  >
    <line x1="128" y1="32" x2="128" y2="64" strokeWidth="24" strokeLinecap="round" />
    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeWidth="24" strokeLinecap="round" />
    <line x1="224" y1="128" x2="192" y2="128" strokeWidth="24" strokeLinecap="round" />
    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeWidth="24" strokeLinecap="round" />
    <line x1="128" y1="224" x2="128" y2="192" strokeWidth="24" strokeLinecap="round" />
    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeWidth="24" strokeLinecap="round" />
    <line x1="32" y1="128" x2="64" y2="128" strokeWidth="24" strokeLinecap="round" />
    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeWidth="24" strokeLinecap="round" />
  </svg>

  <span>Loading...</span>
</div>
</div>

    );
}