import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Theme from './Components/Theme';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function App() {
  const [toggle, setToggle] = useState(false);
  const [note, setNote] = useState("my_notes");
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (note) {
      fetch(`/docs/${note}.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch markdown');
          }
          return response.text();
        })
        .then(text => {
          setMarkdown(text);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setMarkdown('');
        });
    }
  }, [note]);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar setToggle={setToggle} toggle={toggle} note={note} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar toggle={toggle} setNote={setNote} />
        <div className="p-12 flex-1 overflow-auto dark:bg-primary-color bg-sepia z-[99] dark:text-dark-text">
          <Theme />
          <h1 className='text-6xl font-bold my-12'>{note == "my_notes" ? "About": note}</h1>
          <Markdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({...props}) => <h1 className="text-5xl font-bold my-4" {...props} />,
              h2: ({...props}) => <h2 className="text-4xl font-bold my-3" {...props} />,
              h3: ({...props}) => <h3 className="text-3xl font-bold my-3" {...props} />,
              h4: ({...props}) => <h4 className="text-2xl font-bold my-3" {...props} />,
              h5: ({...props}) => <h5 className="text-xl font-bold my-1" {...props} />,
              h6: ({...props}) => <h6 className="text-lg font-bold my-1" {...props} />,
              ul: ({...props}) => <ul className="list-disc pl-6 my-2 space-y-1" {...props} />,
              li: ({...props}) => <li className="my-0.5" {...props} />,
              p: ({...props}) => <p className="my-2" {...props} />,
              a: ({...props}) => <a className="text-blue-500 hover:underline" {...props} />,
              blockquote: ({...props}) => <blockquote className="border-l-4 bg-dark-bar dark:bg-secondary-color border-gray-300 pl-4 my-2" {...props} />,
              pre: ({...props}) => (
                <pre className="dark:bg-secondary-color bg-dark-bar p-4 overflow-x-scroll rounded-lg my-4" {...props} />
              ),
              code: ({...props}) => 
                <code className="block dark:bg-secondary-color bg-dark-bar rounded p-2 my-2 overflow-x-auto" {...props} />,
              img: ({...props}) => (
                <img 
                  {...props} 
                  className="max-w-[550px] h-auto my-2 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )
            }}>
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;