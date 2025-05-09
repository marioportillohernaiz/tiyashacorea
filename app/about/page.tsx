import Image from "next/image"
import Link from "next/link"
import { Linkedin, Instagram, Mail } from "lucide-react"

export default function AboutContact() {
  return (
    <div className="relative">
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/about.png"
          alt="Background image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row">
        <div className="md:ml-20 md:my-20 w-full md:w-1/2 bg-white dark:bg-black bg-white p-8 md:p-12 overflow-y-auto">
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">ABOUT ME</h1>

            <p className="text-lg font-bold">
              Hi, I&apos;m Tiyasha Corea.
            </p>

            <p className="text-lg">
              I&apos;m a Fashion and Technology student at Loughborough University, exploring how emerging technologies can shape the future of clothing.
            </p>

            <p className="text-lg">
              My work bridges design and innovation - from using CAD software and virtual sampling to integrating digital tools into the garment development process. I&apos;ve gained industry experience with Brandix, where I worked on tech packs, 3D CLO sampling systems, and digital workflows that streamline design and production.
            </p>

            <p className="text-lg">
              With roots in Sri Lanka, I bring a global and culturally informed perspective to my projects, often merging South Asian craft with modern materials and technology-driven solutions. I&apos;m especially interested in how we can use new tools to make fashion more efficient, inclusive and sustainable.
            </p>

            <p className="text-lg">
              This portfolio showcases how I design, experiment and build for the future of fashion - one piece at a time.
            </p>

            <div className="flex flex-col items-center space-y-8 pt-4">
              <Link href="/" className="bg-black dark:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                Portfolio
              </Link>

              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/tiyasha-corea-a7b011296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/tiyashadesigns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="mailto:tiyashacorea@gmail.com"
                  className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
