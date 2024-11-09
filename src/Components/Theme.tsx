import { useEffect, useState } from "react"
import { getTheme, theme } from "../Utils/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Theme() {
    const [theme, setTheme] = useState<theme>(getTheme());

    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme])

    return (
        <button 
            onClick={handleThemeSwitch} 
            className={`text-2xl absolute mt-2 bottom-5 right-5`}
        >
            {theme === "dark" ? (
                <FontAwesomeIcon className="rounded-full p-1 dark:text-gray-300 transition-all hover:text-yellow-300" icon={faSun} />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="transition-all hover:text-gray-500" />
            )}
        </button>
    )
}
