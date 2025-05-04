import { cn } from "@/lib/utils";

interface HeaderProps {
  onBack: () => void;
  showBack: boolean;
}

export function Header({ onBack, showBack }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-white/80 backdrop-blur-md",
        "border-b border-slate-200",
        "transition-all duration-300",
        "shadow-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Car Part Finder
            </h2>
            {showBack && (
              <button
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Search
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
