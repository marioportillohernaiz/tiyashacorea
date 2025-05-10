"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
  description: string;
}

interface ProjectData {
  projects: Project[];
}

export function WorkComponent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data: ProjectData) => {
        setProjects(data.projects);
        setVisibleProjects(data.projects.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loading && visibleProjects.length < projects.length) {
          loadMoreProjects()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current)
      }
    }
  }, [visibleProjects, loading, projects.length])

  const loadMoreProjects = () => {
    setLoading(true)
    setTimeout(() => {
      const nextProjects = projects.slice(visibleProjects.length, visibleProjects.length + 4)
      setVisibleProjects([...visibleProjects, ...nextProjects])
      setLoading(false)
    }, 500)
  }

  if (error) {
    return <div className="text-center text-red-500 my-10">{error}</div>
  }

  if (loading && visibleProjects.length === 0) {
    return <div className="text-center my-10 animate-pulse">Loading projects...</div>
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleProjects.map((project) => (
          <Link 
            href={`/projects/${project.id}`} 
            key={project.id}
            className="relative group cursor-pointer block"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={project.coverImage || "/placeholder.png"}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white dark:bg-black w-[90%] h-[90%] flex flex-rows-2 items-center justify-left p-4">
                {/* <div className="text-gray-400 mb-4">{project.date}</div> */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    {project.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loadMoreRef} className="h-10 mt-8 flex justify-center">
        {loading && visibleProjects.length > 0 && <div className="animate-pulse">Loading more...</div>}
      </div>
    </div>
  )
}