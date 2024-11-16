import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Theme from './Components/Theme';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import MarkdownPage from './MarkdownPage';


function App() {
  const [toggle, setToggle] = useState(false);
  const { noteId } = useParams();
  console.log(noteId);
  
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  return (
    <BrowserRouter basename="/my_notes">
      <div className="h-screen flex flex-col">
        <Navbar setToggle={setToggle} toggle={toggle} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar toggle={toggle}/>
          <div className="p-12 flex-1 overflow-auto dark:bg-primary-color bg-sepia z-[99] dark:text-dark-text">
            
            <Routes>
              <Route path='/' element={<MarkdownPage/>} />
              <Route path='/:noteId' element={<MarkdownPage/>} />
            </Routes>
            
            <Theme />
            
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;