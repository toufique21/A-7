import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <p className="text-7xl font-bold text-red-600 mb-4">404</p>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Page Not Found
                </h1>

                <p className="text-gray-500 mb-8">
                    Sorry, the page you are looking for doesn&apos;t exist
                    or may have been moved.
                </p>

                <Link
                    href="/"
                    className="inline-block rounded-lg bg-red-600 px-6 py-3
                    font-medium text-white transition hover:bg-red-700"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

