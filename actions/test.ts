"use server";

export async function uploadAction(formData: FormData) {
    // -------------------------------
    // Directly forward FormData to backend API
    // -------------------------------
    // const res = await fetch("http://localhost:8000/api/v1/test/upload-image", {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/upload-image`, {
        method: "POST",
        body: formData,
    });

    // -------------------------------
    // Parse backend response
    // -------------------------------
    const data = await res.json();

    return data;
}
