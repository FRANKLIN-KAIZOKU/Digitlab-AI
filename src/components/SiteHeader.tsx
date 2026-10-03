import { Link, NavLink } from "react-router-dom";

const SiteHeader = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Playground", path: "/playground" },
    { label: "Model Lab", path: "/model-lab" },
    { label: "Analytics", path: "/analytics" },
  ];

  return (
    <header className="px-8 pt-7 md:px-12 lg:px-16">
      <div className="flex items-center justify-between border-b border-[#854F6C]/40 pb-5">
        {/* LOGO */}
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FBE4D8] transition-opacity hover:opacity-70"
        >
          DIGITLAB AI
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                text-[12px]
                uppercase
                tracking-[0.22em]
                transition-colors
                duration-200
                ${
                  isActive
                    ? "text-[#FBE4D8]"
                    : "text-[#DFB6B2]/70 hover:text-[#FBE4D8]"
                }
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;