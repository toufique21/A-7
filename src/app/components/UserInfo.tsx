"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/Sign-In");
    router.refresh();
  };

  return (
    <div className="shrink-0">
      {user ? (
        <div className="dropdown dropdown-end">

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden max-w-32 truncate text-sm font-semibold sm:block lg:max-w-48 lg:text-base">
              {user.name}
            </span>

            <button
              type="button"
              tabIndex={0}
              aria-label="Open user menu"
              className="avatar btn btn-circle btn-ghost h-10 min-h-10 w-10 p-0 sm:h-11 sm:min-h-11 sm:w-11"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full bg-green-700 sm:h-11 sm:w-11">
                {user.image ? (
                  <Image
                    alt={user.name || "User profile"}
                    src={user.image}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold uppercase text-white">
                    {user.name?.trim()?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </button>
          </div>


          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-100 bg-base-100 p-4 shadow-lg sm:w-72"
          >
            <li className="pointer-events-none mb-3 border-b border-gray-200 pb-3">
              <span className="block whitespace-normal text-sm font-bold text-base-content">
                {user.name}
              </span>
              <span className="block break-all text-xs text-gray-500">
                {user.email}
              </span>
            </li>

            <li>
              <Link
                href="/Profile"
                className="flex items-center gap-2 rounded-lg py-3 text-sm"
              >
                <FaUser />
                আমার প্রোফাইল
              </Link>
            </li>

            <li className="mt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="justify-center rounded-xl bg-green-700 py-3 text-sm font-bold text-white hover:bg-green-800"
              >
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/Sign-In"
            className="whitespace-nowrap rounded-lg px-2 py-2 text-xs font-bold text-base-content transition-colors hover:text-green-700 sm:px-3 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/Sign-Up"
            className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-green-800 sm:px-4 sm:py-3 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;