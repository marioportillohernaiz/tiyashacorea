"use client"

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Sidebar } from '@/app/main/sidebar'

interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  images: string[];
  description: string;
}

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then(data => {
        const foundProject = data.projects.find((p: Project) => p.id === params.id)
        if (foundProject) {
          setProject(foundProject)
        } else {
          setError('Project not found')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching project:', err)
        setError('Failed to load project')
        setLoading(false)
      })
  }, [params.id])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, [project]);

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading project...</div>
  }

  if (error || !project) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500 mb-4">{error || 'Project not found'}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to projects
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <div className="max-full mx-auto">
          <div className="text-center mb-16 mt-8">
            <div className="text-gray-400 mb-4">{project.date}</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                {project.title}
            </h1>
            {project.subtitle && <p className="text-xl md:text-2xl tracking-tight">
                {project.subtitle}
            </p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: project.images.length }).map((_, i) => (
              <div key={i} className="bg-gray-100">
                <img
                  src={project.images[i]}
                  alt={`Project image ${i + 1}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {project.id === "fashion-show" &&
            <div className="grid grid-cols-1 gap-4">
              <div className="mx-auto">
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="max-h-[800px] w-auto"
                >
                  <source src="/fashionwalk.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="bg-gray-100">
                <img
                  src="/fashion3.png"
                  className="object-cover"
                />
              </div>
            </div>
          }

          <div className="mt-16 text-center">
            <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-6 py-3"
            >
                Back to Top
            </button>
          </div>

          {/* <div className="mt-16 border-t pt-8">
            <h2 className="text-xl font-bold uppercase mb-4">ABOUT</h2>
            <p className="text-gray-700">{project.description}</p>
          </div> */}
        </div>
      </main>
    </div>
  )
}