"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/Sign-In");
    };

    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const NewUser = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
        };

        await authClient.updateUser({
            ...NewUser
        });
    };

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-green-700" />
            </div>
        );
    }

    if (!user) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto w-full max-w-3xl">


                <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        আমার প্রোফাইল
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>


                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">


                        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-full bg-green-700 text-white ring-4 ring-green-50 sm:self-auto">
                            {user.image ? (
                                <Image
                                    alt={user.name || "User profile"}
                                    src={user.image}
                                    width={80}
                                    height={80}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold uppercase">
                                    {user.name?.trim().charAt(0) || "U"}
                                </span>
                            )}
                        </div>


                        <div className="min-w-0 flex-1 text-center sm:text-left">
                            <h3 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                                {user.name}
                            </h3>
                            <p className="mt-1 break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                            <p className="mt-2 text-xs font-medium text-green-700">
                                BazarDor সদস্য
                            </p>
                        </div>


                        <div className="w-full sm:w-auto">
                            <button
                                onClick={handleSignOut}
                                className="w-full rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:w-auto"
                            >
                                সাইন আউট
                            </button>
                        </div>
                    </div>
                </section>


                <form onSubmit={handleUpdateProfile}>
                    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-8">
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                ব্যক্তিগত তথ্য
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                আপনার প্রোফাইলের তথ্য আপডেট করুন।
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={user.name || ""}
                                className="input h-12 w-full rounded-xl border-gray-300 bg-white focus:border-green-600 focus:outline-none"
                                placeholder="আপনার নাম লিখুন"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 sm:w-auto"
                            >
                                আপডেট
                            </button>
                        </div>
                    </section>
                </form>

            </div>
        </main>
    );
};

export default ProfilePage;