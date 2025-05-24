"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Navigation content component to avoid duplication
  const NavigationContent = () => (
    <nav className="space-y-6" style={{ maxHeight: "calc(100vh - 120px)" }}>
      <div>
        <div className="mt-3 space-y-3 text-gray-500 dark:text-white pl-5">
          <Link 
            key={"fashion-show"}
            href={"/projects/fashion-show"} 
            className="block py-1"
            onClick={closeMobileMenu}
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
                    onClick={closeMobileMenu}
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
                    onClick={closeMobileMenu}
                  >
                    {caseStudy.title}
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="mt-3 space-y-3 text-gray-500 dark:text-white pl-5">
          <Link 
            key={"clo3d"}
            href={"/projects/clo3d"} 
            className="block py-1"
            onClick={closeMobileMenu}
          >
            Clo3D
          </Link>
        </div>
      </div>

      <div className="pt-6 space-y-3 text-gray-500 dark:text-white">
        <Link 
          href="/about" 
          className="block py-1"
          onClick={closeMobileMenu}
        >
          About / Contact
        </Link>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg sm:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600 dark:text-white" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 backdrop-blur-xs z-40 sm:hidden" onClick={closeMobileMenu}/>
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed left-0 top-0 w-64 h-screen p-6 bg-white dark:bg-gray-900 border-r z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-start mb-12">
          <Link href="/" className="text-3xl font-bold tracking-tight" onClick={closeMobileMenu}>
            TIYASHA
            <br />
            COREA
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-1 text-gray-500 dark:text-white"
            aria-label="Close mobile menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
          <NavigationContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="w-full md:fixed md:left-0 md:top-0 md:w-64 md:h-screen p-6 border-r hidden sm:block overflow-y-auto">
        <div className="mb-12">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            TIYASHA
            <br />
            COREA
          </Link>
        </div>

        <NavigationContent />
      </aside>
    </>
  )
}