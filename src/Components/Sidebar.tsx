import { useEffect, useState } from "react";
import { pages, socials } from "../Utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getTheme } from "../Utils/Theme";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({toggle}: {toggle: boolean}) {
  const [indexToggle, setIndexToggle] = useState<number[]>([]);
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const [, setToggleTable] = useState<{[key: number]: boolean}>(() => {
    const initial: {[key: number]: boolean} = {};
    for (let i = 0; i < pages.length; i++) {
      initial[i] = false;
    }
    return initial;
  });

  useEffect(() => {
    const initial: { [key: number]: boolean } = {};
    pages.forEach((_, index) => {
      initial[index] = false;
    });
    setToggleTable(initial);
  }, []);

  useEffect(() => {
    const initial: { [key: number]: boolean } = {};
    pages.forEach((_, index) => {
      initial[index] = false;
    });
    setToggleTable(initial);
  }, []);

  const toggleTopic = (index: number) => {
    if (indexToggle.includes(index)) {
      setIndexToggle(indexToggle.filter((i) => i !== index));
    } else {
      setIndexToggle([...indexToggle, index]);
    }
  }

  const handlePageSelection = (subpage: string) => {
    setSelected(subpage);
    const path = subpage === 'my_notes' ? '/' : `/my_notes/${subpage}`;
    navigate(path);
  }

  return (
    <div className="flex relative divide-x dark:divide-bar divide-light-bar">
      <div className="md:flex hidden inset-x-0 bottom-0 p-2 dark:bg-secondary-color bg-dark-sepia min-h-screen w-16 z-50 flex-col">
        <div className="absolute bottom-5">
        {
            socials.map((social) => (
              <a href={social.link}>
                <img 
                  width={50} 
                  height={50} 
                  src={getTheme() === "light" ? social.black_icon : social.white_icon} 
                  alt={social.name}
                />
              </a>
            ))
          }
        </div>
      </div>
      <div className={`overflow-y-scroll absolute md:relative p-4 dark:bg-secondary-color bg-dark-sepia dark:text-dark-text h-[100dvh] w-[250px] z-[999] ${toggle ? "" : "hidden"}`}>
        {
          pages.map((page, index) => (
            <div key={index} className="text-lg">
              <div 
                onClick={() => toggleTopic(index)}
                className="flex mb-2 gap-2 py-1 hover:dark:bg-tertiary-color hover:bg-light-bar transition-all duration-300 px-2 cursor-pointer rounded-md">
                {
                  indexToggle.includes(index) 
                  ?
                  <div><FontAwesomeIcon icon={faAngleDown} /></div>
                  :
                  <div><FontAwesomeIcon icon={faAngleRight} /></div>
                }
                <p>
                  {page.name}
                </p>
              </div>
              <div className={`${indexToggle.includes(index) ? "" : "hidden"}`}>
                {
                  page.subpages.map((subpage) => (
                    <p
                      onClick={() => {
                        handlePageSelection(subpage);
                        setSelected(subpage);
                       }} 
                      className={`mb-2 px-6 hover:dark:bg-tertiary-color hover:bg-light-bar transition-all duration-300 cursor-pointer rounded-md ${selected.split("/").length >= 2 && selected.split("/")[2] != undefined && selected.split("/")[2].split('%20').join(" ") == subpage ? "dark:bg-tertiary-color bg-light-bar" : ""}`}>{subpage}</p>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

