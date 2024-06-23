import "./App.css";
import PingDevice from "./tools/PingDevice.tsx";
import RestartDevice from "./tools/RestartDevice.tsx";
import ReadAddress from "./tools/ReadAddress.tsx";
import ScanLine from "./tools/ScanLine.tsx";
import { BugAntIcon } from "@heroicons/react/24/outline";

export default function App() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 lg:w-4/5 mx-auto dark:bg-gray-800 dark:text-gray-50">
            <header className="sm:mx-auto sm:w-full sm:max-w-sm">
                <BugAntIcon className="text-indigo-600 h-12 w-12 mx-auto" />
                <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                    KNX Diagnostics
                </h2>
            </header>
            <section className="flex-none md:flex gap-3">
                <div className="w-full md:w-1/3">
                    <PingDevice />
                </div>
                <div className="w-full md:w-1/3">
                    <RestartDevice />
                </div>
                <div className="w-full md:w-1/3">
                    <ReadAddress />
                </div>
            </section>
            <section className="w-100">
                <ScanLine />
            </section>
            <footer className="text-center mt-3">
                <div>
                    Developed by{" "}
                    <a
                        href={import.meta.env.VITE_MY_WEBSITE_URL}
                        target="_blank"
                        className="text-indigo-600 dark:text-indigo-400 font-bold"
                    >
                        {import.meta.env.VITE_MY_WEBSITE_NAME}
                    </a>
                    . Source code:{" "}
                    <a
                        href={import.meta.env.VITE_GITHUB_URL}
                        target="_blank"
                        className="text-indigo-600 dark:text-indigo-400 font-bold"
                    >
                        <img src="./github.svg" alt="" className="w-5 h-5 inline align-sub dark:hidden" />
                        <img src="./github-dark.svg" alt="" className="w-5 h-5 align-sub hidden dark:inline" /> GitHub
                    </a>
                </div>
                <div>
                    <a
                        href={import.meta.env.VITE_GITHUB_ISSUES_URL}
                        target="_blank"
                        className="text-indigo-600 dark:text-indigo-400 font-bold"
                    >
                        <BugAntIcon className="h-4 w-4 inline" /> If you find any issues, please report it here.
                    </a>
                </div>
            </footer>
        </div>
    );
}
