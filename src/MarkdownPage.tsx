import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MarkdownPage() {
    const { noteId = 'my_notes' } = useParams();
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (noteId) {
            fetch(`docs/${noteId}.md`)
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
    }, [noteId]);


    return (
        <div>
            <h1 className='text-6xl font-bold my-12'>{noteId == "my_notes" ? "About": noteId}</h1>
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
                p: ({...props}) => <p className="my-2 text-lg" {...props} />,
                a: ({...props}) => <a className="text-blue-500 hover:underline" {...props} />,
                blockquote: ({...props}) => <blockquote className="border-l-4 bg-dark-sepia dark:bg-secondary-color p-2 border-gray-300 pl-4 my-2" {...props} />,
                pre: ({...props}) => (
                    <pre className="dark:bg-secondary-color bg-[#e6d0b3] p-4 overflow-x-scroll rounded-lg my-4" {...props} />
                ),
                code: ({...props}) => 
                    <code className="dark:bg-secondary-color bg-[#f5e2ca] px-2 rounded my-2 overflow-x-auto" {...props} />,
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
    )
}
