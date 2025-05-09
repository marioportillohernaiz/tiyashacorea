"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Project {
  id: string;
  title: string;
  type: string;
  date: string;
  coverImage: string;
  images: string[];
  description: string;
}

interface ProjectData {
  projects: Project[];
}

export function Sidebar() {
  const [projectsExpanded, setWorkExpanded] = useState(false)
  const [caseStudyExpanded, setCaseStudyExpanded] = useState(false)
  const [projectItems, setProjectItems] = useState<Project[]>([])
  const [caseStudyItems, setCaseStudyItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then((data: ProjectData) => {
        // Separate projects based on type
        const projects = data.projects.filter(item => item.type === "project");
        const caseStudies = data.projects.filter(item => item.type === "case-study");
        
        setProjectItems(projects);
        setCaseStudyItems(caseStudies);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects for sidebar:', err);
        setLoading(false);
      });
  }, []);

  const toggleWork = () => {
    setWorkExpanded(!projectsExpanded)
  }

  const toggleCaseStudy = () => {
    setCaseStudyExpanded(!caseStudyExpanded)
  }

  return (
    <aside className="w-full md:fixed md:left-0 md:top-0 md:w-64 md:h-screen p-6 border-r hidden sm:block overflow-y-auto">
      <div className="mb-12">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          TIYASHA
          <br />
          COREA
        </Link>
      </div>

      <nav className="space-y-6" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <div>
          <div className="mt-3 space-y-3 text-gray-500 dark:text-white pl-5">
            <Link 
              key={"fashion-show"}
              href={"/projects/fashion-show"} 
              className="block py-1"
            >
              FASHION SHOW
            </Link>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <button
            onClick={toggleWork}
            className="flex items-center w-full text-left uppercase font-medium text-gray-500 dark:text-white py-1 focus:outline-none"
          >
            {projectsExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
            PROJECTS
          </button>

          {projectsExpanded && (
            <div className="mt-3 space-y-3 text-gray-500 dark:text-white pl-5">
              {loading ? (
                <div className="text-sm">Loading...</div>
              ) : (
                <>
                  {projectItems.map(project => (
                    <Link 
                      key={project.id} 
                      href={`/projects/${project.id}`} 
                      className="block py-1"
                    >
                      {project.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Case Studies Section */}
        <div>
          <button
            onClick={toggleCaseStudy}
            className="flex items-center w-full text-left uppercase font-medium text-gray-500 dark:text-white py-1 focus:outline-none"
          >
            {caseStudyExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
            CASE STUDIES
          </button>

          {caseStudyExpanded && (
            <div className="mt-3 space-y-3 text-gray-500 dark:text-white pl-5">
              {loading ? (
                <div className="text-sm">Loading...</div>
              ) : (
                <>
                  {caseStudyItems.map(caseStudy => (
                    <Link 
                      key={caseStudy.id} 
                      href={`/projects/${caseStudy.id}`} 
                      className="block py-1"
                    >
                      {caseStudy.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* <div>
          <div className="mt-3 space-y-3 text-gray-500 pl-5">
            <Link 
              key={"clo3d"}
              href={"/projects/clo3d"} 
              className="block py-1"
            >
              Clo3D
            </Link>
          </div>
        </div> */}

        <div className="pt-6 space-y-3 text-gray-500 dark:text-white">
          <Link href="/about" className="block py-1">
            About / Contact
          </Link>
        </div>
      </nav>
    </aside>
  )
}