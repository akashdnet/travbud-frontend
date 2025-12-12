"use server";

import { envList } from "@/lib/config";
import { cookies } from "next/headers";

// ============ User Actions ============

export async function registerUser(formData: FormData) {
    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/register`, {
            method: "POST",
            body: formData,
        });

        return await res.json();
    } catch (error) {
        console.error("Register user error:", error);
        throw error;
    }
}

export async function getMyProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get my profile error:", error);
        throw error;
    }
}

export async function updateMyProfile(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/update/me`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
            },
            body: formData,
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Update my profile error:", error);
        throw error;
    }
}

export async function deleteMyProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/me`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Delete my profile error:", error);
        throw error;
    }
}

// Admin actions
export async function getAllUsers(params?: { page?: number; limit?: number; search?: string }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    try {
        const res = await fetch(
            `${envList.NEXT_PUBLIC_API_URL}/users/all-users?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                },
                cache: "no-store",
            }
        );

        return await res.json();
    } catch (error) {
        console.error("Get all users error:", error);
        throw error;
    }
}

export async function getUserById(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    // if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Get user by id error:", error);
        throw error;
    }
}

export async function updateUserById(id: string, formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/update/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
            },
            body: formData,
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Update user by id error:", error);
        throw error;
    }
}

export async function deleteUserById(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${envList.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
            },
            cache: "no-store",
        });

        return await res.json();
    } catch (error) {
        console.error("Delete user by id error:", error);
        throw error;
    }
}
