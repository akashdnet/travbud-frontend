"use client";

import { uploadAction } from "@/actions/test";
import { useState } from "react";

export default function SimpleForm() {
    const [result, setResult] = useState<any>(null);

    return (
        <form
            action={async (formData) => {
                const res = await uploadAction(formData);
                setResult(res);
            }}
            className="space-y-4 p-4 border rounded-md max-w-md"
        >
            {/* Title */}
            <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    className="border p-2 w-full rounded"
                    required
                />
            </div>

            {/* Photo */}
            <div>
                <label className="block font-medium mb-1">Photo</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="border p-2 w-full rounded"
                    required
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Submit
            </button>

            {/* Result */}
            {result && (
                <pre className="bg-gray-100 p-2 rounded text-sm">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
}
