export default function ScanLineShortcuts() {
    return (
        <>
            <button className="rounded-md bg-indigo-600 px-2 py-0.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Scan 1-64
            </button>
            <button className="rounded-md bg-indigo-600 px-2 py-0.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Scan 1-255
            </button>
            <button className="rounded-md bg-indigo-600 px-2 py-0.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Scan 1-10, 20-30
            </button>
        </>
    );
}
