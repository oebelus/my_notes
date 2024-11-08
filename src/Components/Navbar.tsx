import { faBurger, faFolder, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavbarProps {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: boolean;
    note: string
}

export default function Navbar({ setToggle, toggle, note }: NavbarProps) {
    return (
        <nav className="dark:bg-tertiary-color bg-white flex justify-between p-3 h-16 shadow-lg dark:text-dark-text text-gray-900">
            <div className="flex gap-14">
                <button 
                    onClick={() => setToggle(!toggle)} 
                    className="text-4xl"
                >
                    <FontAwesomeIcon icon={faBurger} className="" />
                </button>
                <div className={`flex gap-10 mt-1 text-2xl transition-all duration-300 ease-in-out ${toggle ? "" : "hidden"}`}>
                    <button>
                        <FontAwesomeIcon icon={faFolder} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    </div>
                <div className={`mt-2 text-2xl text-pretty font-mono dark:bg-primary-color bg-sepia rounded-xl p-2 pr-8 h-36 ${note == "" ? "w-[200px]" : "w-fit"} pl-4 text-left transition-all duration-300 ease-in-out ${toggle ? "translate-x-20" : ""}`}>{note != "" ? note : "my_notes"}</div>
            </div>
            {/* <div className="mt-2">
                <input type="text" />
                <button className="dark:bg-primary-color p-1 rounded-full">
                    <FontAwesomeIcon className="text-xl" icon={faSearch} />
                </button>
            </div> */}
        </nav>
    )
}
