import { faBurger, faFolder, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

interface NavbarProps {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: boolean;
}

export default function Navbar({ setToggle, toggle }: NavbarProps) {
    
    const { noteId = 'my_notes' } = useParams();

    return (
        <nav className="dark:bg-tertiary-color bg-light-bar flex justify-between p-3 h-16 shadow-lg dark:text-dark-text text-brown">
            <div className="flex gap-14">
                <button 
                    onClick={() => setToggle(!toggle)} 
                    className="text-4xl"
                >
                    <FontAwesomeIcon icon={faBurger} />
                </button>
                <div className={`flex gap-10 mt-1 text-2xl transition-all duration-300 ease-in-out ${toggle ? "" : "hidden"}`}>
                    <button>
                        <FontAwesomeIcon icon={faFolder} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    </div>
                <div className={`mt-2 text-2xl text-pretty font-mono dark:bg-primary-color bg-sepia rounded-xl p-2 pr-8 h-36 ${noteId == "" ? "w-[200px]" : "w-fit"} pl-4 text-left transition-all duration-300 ease-in-out md:${toggle ? "translate-x-20" : ""}`}>{noteId != "" ? noteId : "my_notes"}</div>
            </div>
        </nav>
    )
}
