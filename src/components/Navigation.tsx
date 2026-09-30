import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const pathname = useLocation().pathname;

  const navItems = [
    { href: "/playground", label: "PLAYGROUND" },
    { href: "/model-lab", label: "MODEL LAB" },
    { href: "/analytics", label: "ANALYTICS" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-8 py-4 bg-[rgba(25,0,25,0.8)] backdrop-blur-sm border-b border-[rgba(82,43,91,0.3)]">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8">
          <svg
            className="w-full h-full text-warmCream"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20V20H4V4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8H16V16H8V8Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4V20"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-wider text-warmCream">
          DIGITLAB AI
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium uppercase tracking-wider">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
              transition-colors duration-300
              ${pathname === item.href
                ? "text-warmCream border-b-2 border-warmCream"
                : "text-dustyRose hover:text-warmCream hover:border-b-2 hover:border-transparent"
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-widest">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-emerald/20"></div>
          <span className="ml-1 text-dustyRose">MODEL STATUS</span>
        </div>
        <span className="text-xs font-mono text-dustyRose">OFFLINE</span>
      </div>
    </nav>
  );
};

export default Navigation;