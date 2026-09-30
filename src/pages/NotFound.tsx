import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-plum flex items-center justify-center px-8">
      <div className="max-w-2xl text-center animate-fadeInUp">
        <h1 className="text-8xl font-bold tracking-tight text-warmCream md:text-9xl">
          404
        </h1>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-mauve to-transparent"></div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-warmCream md:text-4xl">
          PAGE NOT FOUND
        </h2>
        <p className="mt-4 text-lg font-light text-dustyRose">
          The page you're looking for doesn't exist in this laboratory.
        </p>
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 rounded-sm bg-warmCream px-8 py-4 text-sm font-bold uppercase tracking-wider text-plum transition-all duration-300 hover:bg-dustyRose hover:text-plum"
          >
            <span>Return to Laboratory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;