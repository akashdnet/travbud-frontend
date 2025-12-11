import { Suspense } from "react";
import TripManagementPage from "./TripManagementPage";

export default function Page() {
    return <div className="w-full max-w-5xl mx-auto p-3 md:p-4">
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        }>
            <TripManagementPage />
        </Suspense>
    </div>;
}
