import { useEffect, useState } from "react";
import { pages } from "../Utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({toggle, setNote}: {toggle: boolean, setNote: (e: string) => void}) {
  const [toggleTable, setToggleTable] = useState<{[key: number]: boolean}>();
  const [indexToggle, setIndexToggle] = useState<number[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const length = pages.length;
    
    for (let i = 0; i < length; i++) {
      setToggleTable({...toggleTable, [i]: false});
    }
  }, [])

  const toggleTopic = (index: number) => {
    if (indexToggle.includes(index)) {
      setIndexToggle(indexToggle.filter((i) => i !== index));
    } else {
      setIndexToggle([...indexToggle, index]);
    }
  }

  return (
    <div className="relative flex divide-x divide-bar">
      <div className="inset-x-0 bottom-0 p-2 dark:bg-secondary-color bg-sepia min-h-screen w-16 z-50 flex flex-col">
        {/* {
          socials.map((social) => (
            <a href={social.link}>
              <img 
                width={50} 
                height={50} 
                src={getTheme() === "dark" ? social.white_icon : social.black_icon} 
                alt={social.name}
              />
            </a>
          ))
        } */}
      </div>
      <div className={`p-4 dark:bg-secondary-color bg-sepia dark:text-dark-text min-h-screen w-[250px] z-50 ${toggle ? "" : "hidden"}`}>
        {
          pages.map((page, index) => (
            <div key={index} className="text-lg">
              <div 
                onClick={() => toggleTopic(index)}
                className="flex mb-2 gap-2 py-1 hover:dark:bg-tertiary-color px-2 cursor-pointer rounded-md">
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
                        setSelected(subpage)
                        setNote(subpage)
                      }} 
                      className={`mb-2 px-6 hover:dark:bg-tertiary-color cursor-pointer rounded-md ${selected == subpage ? "dark:bg-tertiary-color" : ""}`}>{subpage}</p>
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

