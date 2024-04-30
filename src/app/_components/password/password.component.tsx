"use client";

import React, { useState } from "react";
import { z } from "zod";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ErrorState {
  confirmPassword?: string;
}

export const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<ErrorState>({});

  const handleCreate = () => {
    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (result.success) {
      console.log("Success", result.data);
    } else {
      const formattedErrors: ErrorState = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof ErrorState] = err.message;
        }
      });
      setError(formattedErrors);
    }
  };

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center divide-y divide-gray-400/40 border border-white bg-black bg-opacity-50 p-8">
      <p className={`ml-2 pb-4 text-2xl`}>Create a password</p>
      <p className="py-6 text-lg text-gray-400/70">
        Enjoy full control over your assets with our non-custodial wallet,
        designed for user <span className="text-green-500">autonomy</span> and{" "}
        <span className="text-green-500">security</span>.
      </p>
      <div className="flex w-full flex-col items-center justify-center py-6">
        <div className="flex w-full gap-3 pb-1">
          <input
            type="password"
            placeholder="Write your password"
            className="w-full border border-white/50 bg-black bg-opacity-50 px-4 py-2 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-white/50 bg-black bg-opacity-50 px-4 py-2 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error.confirmPassword && (
          <p className="text-sm text-red-500">{error.confirmPassword}</p>
        )}
      </div>

      <div className="flex w-full space-x-4 pt-6">
        <button className="w-2/4 border border-white p-4 text-lg text-red-500 transition hover:bg-white/5">
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="w-2/4 border border-white p-4 text-lg text-green-500 transition hover:bg-white/5"
        >
          Create
        </button>
      </div>
    </div>
  );
};
