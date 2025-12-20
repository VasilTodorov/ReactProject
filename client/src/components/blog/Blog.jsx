import { useState, useEffect } from "react";
import Article from "./Article";
import request from "../../utils/request";
import WindowSpinner from "../spineers/WindowSpinner";

export default function Blog() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController(); // optional, for cleanup
        const fetchSkills = async () => {
            try {
                const data = await request("data/skills","Get",null, null, true,  controller.signal );
                
                setSkills(data);
            } catch (err) {
                if (err.name === "AbortError") return; // fetch was cancelled
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();

        return () => controller.abort(); // cleanup on unmount
    }, []);

    if (loading) return (<p>Loading skills...</p>);

    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Skills & Articles
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
                Learn how to grow your skills with our expert advice.
            </p>
            </div>
            {skills.length==0 
                        ? <WindowSpinner/>
                        : <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {skills.map((skill) => (
                <Article
                key={skill._id}        
                date={skill.date}
                datetime={skill.datetime}
                category={skill.category}
                title={skill.title}
                description={skill.description}
                author={skill.author?.name}
                email={skill.author?.email}
                //urlProfile={skill.author?.urlProfile}
                />
            ))}
            </div>}
            
        </div>
        </div>
    );
}
