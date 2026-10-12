"use client"

import { authClient } from '@/lib/auth-client';
import React from 'react';

const UpdateProfile = () => {

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


    return (
        <div className='container mx-auto '>
            <form onSubmit={handleUpdateProfile}>
                <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-8">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">ব্যক্তিগত তথ্য</h2>
                        <p className="mt-1 text-sm text-gray-500">আপনার প্রোফাইলের তথ্য আপডেট করুন।</p>
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
    );
};

export default UpdateProfile;