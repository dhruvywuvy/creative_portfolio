"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Playfair_Display, Cormorant_Garamond } from "next/font/google"
import { FaLinkedin, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6"

const playfair = Playfair_Display({ subsets: ["latin"] })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300"] })

const experiences = [
  {
    logo: "/logos/advocare_logo.jpg",
    title: "Co-founder",
    company: "MediChecker",
    period: "Sep 24 - Present",
    description: "Developing a platform to ensure no one overpays for medical bills again.",
    link: "https://www.medicalbillchecker.com/",
  },
  {
    logo: "/logos/guardian_logo.jpeg",
    title: "Engineering",
    company: "Guardian",
    period: "Jan 25 - Present",
    description: "Redefining how we learn.",
    link: "https://www.guardian.inc",
  },
  {
    logo: "/logos/design_prodigy_logo.jpg",
    title: "Software",
    company: "Design Prodigy",
    period: "May 24 - Aug 24",
    description: "Developed B2B market intelligence software for in-house + Fortune 500 companies.",
    link: "https://www.dp.sg/",
  },
  {
    logo: "/logos/rsaf_logo.png",
    title: "Logistics",
    company: "Republic of Singapore Air Force",
    period: "Mar 22 - Apr 24",
    description: "Built systems + trained new personnel. Second in-charge for signals logistics.",
    link: "https://www.mindef.gov.sg/rsaf",
  },
  {
    logo: "/logos/ethereal_logo.webp",
    title: "Co-founder",
    company: "Ethereal Performance",
    period: "Dec 21 - Apr 22",
    description: "Business Development + Marketing for a fitness trainer business. Onboarded 15+ clients.",
    link: "https://www.instagram.com/etherealperformsg/",
  },
  {
    logo: "/logos/irmbrdarkskies_logo.jpg",
    title: "Founder",
    company: "irmbrdarkskies",
    period: "Jan 20 - Sep 22",
    description:
      "Founded label to support innovative artists + uplift people. Featured on Soundcloud's Top 50 Indie Charts, Australia's Acid Stag Radio etc.",
    link: "https://open.spotify.com/artist/4Wrhw1yvoYoTnswsk4JJCS?si=y1yNsvvQRkGUkteHT7q_2w",
  },
  {
    logo: "/logos/unsplash_logo.jpeg",
    title: "Photographer",
    company: "Unsplash",
    period: "Jan 17 - Dec 21",
    description: "24 mil views, 100k downloads. Photos used by Picsart, Buzzfeed, Notion, Tencent, Yahoo News, etc.",
    link: "https://unsplash.com/@dhruvywuvy",
  },
]

// const starPositions = [
//   { x: 50, y: 20 }, // 1 (Polaris)
//   { x: 48, y: 35 }, // 2
//   { x: 45, y: 50 }, // 3
//   { x: 49, y: 28 }, // 4
//   { x: 47, y: 42 }, // 5
//   { x: 52, y: 45 }, // 6
//   { x: 42, y: 45 }, // 7
// ]

const starPositions = [
  { x: 50, y: 30 },     // Polaris
  { x: 43, y: 42 },      // Second star
  { x: 39, y: 58 },      // Third star
  { x: 42, y: 74 },      // Fourth star
  { x: 52, y: 90 },      // Fifth star
  { x: 48, y: 104 },     // Sixth star
  { x: 38, y: 88 }       // Seventh star
];



export default function ConstellationPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Background stars
    const stars: { x: number; y: number; size: number; speed: number }[] = []
    for (let i = 0; i < 239; i++) {
      // Reduced number of stars
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.3, // Reduced from 2 to 0.3 for much slower movement
      })
    }

    const animate = () => {
      // Clear canvas with black background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create bottom gradient
      const gradientHeight = canvas.height * 0.4 // Controls how far up the gradient goes
      const bottomGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - gradientHeight)
      bottomGradient.addColorStop(0, "rgba(0, 191, 255, 0.15)")
      bottomGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = bottomGradient

      // Apply gradient
      ctx.fillRect(0, canvas.height - gradientHeight, canvas.width, gradientHeight)

      // Draw moving background stars
      stars.forEach((star) => {
        ctx.fillStyle = Math.random() > 0.5 ? "#FFFFFF" : "#333333"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw custom cursor (shooting star)
      ctx.save()
      ctx.translate(mousePos.x, mousePos.y)
      ctx.rotate(Math.PI / 4)

      // Shooting star tail
      const cursorGradient = ctx.createLinearGradient(0, 0, -20, -20)
      cursorGradient.addColorStop(0, "rgba(248, 248, 248, 0.8)")
      cursorGradient.addColorStop(1, "rgba(16, 156, 226, 0)")
      ctx.strokeStyle = cursorGradient

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-20, -20)
      ctx.stroke()

      // Star point
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(0, 0, 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [mousePos])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Add this new div for social icons */}
      <div className="absolute top-8 right-8 flex gap-6 z-20">
        <a
          href="https://www.linkedin.com/in/dhruv-deshmukh-2a7aa2228/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://www.instagram.com/dhruvywuvy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://x.com/dhruvywuvy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <FaXTwitter size={24} />
        </a>
        <a
          href="https://github.com/dhruvywuvy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <FaGithub size={24} />
        </a>
      </div>

      <div className="relative z-10 w-full h-full">
        {/* Title Section */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
          <h2 className={`${cormorant.className} text-white`}>--Dhruv Deshmukh--</h2>
          <p className={`${cormorant.className} text-xl text-white max-w-md mx-auto leading-relaxed`}>
           The North Star (ध्रुव), a celestial beacon of unwavering constancy. Like my namesake, I aim to be
            a guiding light in all that I do.
          </p>
        </div>

        {/* Constellation Guide */}
        <div
          className={`${cormorant.className} absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-neutral-600`}
        >
          Hover over the stars of Ursa Minor to explore my journey
        </div>

        {/* Constellation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Container for lines */}
          <div className="absolute w-[160px] h-[360px] left-2 top-0">
            <svg 
              className="absolute inset-0 z-0 pointer-events-none transform scale-50" 
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {starPositions.map((_, index) => {
                if (index === starPositions.length - 1) return null;
                return (
                  <>
                    {/* Electric blue halo effect */}
                    <line
                      key={`halo-${index}`}
                      x1={`${starPositions[index].x}%`}
                      y1={`${starPositions[index].y}%`}
                      x2={`${starPositions[index + 1].x}%`}
                      y2={`${starPositions[index + 1].y}%`}
                      stroke="rgb(255, 255, 255)"
                      strokeWidth="3"
                      filter="blur(4px)"
                    />
                    {/* Thin grey line */}
                    <line
                      key={`line-${index}`}
                      x1={`${starPositions[index].x}%`}
                      y1={`${starPositions[index].y}%`}
                      x2={`${starPositions[index + 1].x}%`}
                      y2={`${starPositions[index + 1].y}%`}
                      stroke="rgba(180, 180, 180, 0.8)"
                      strokeWidth="0.5"
                    />
                  </>
                );
              })}
              {/* Connection from last star to fourth star */}
              <>
                <line
                  key="halo-last-to-fourth"
                  x1={`${starPositions[6].x}%`}
                  y1={`${starPositions[6].y}%`}
                  x2={`${starPositions[3].x}%`}
                  y2={`${starPositions[3].y}%`}
                  stroke="rgb(255, 255, 255)"
                  strokeWidth="3"
                  filter="blur(4px)"
                />
                <line
                  key="line-last-to-fourth"
                  x1={`${starPositions[6].x}%`}
                  y1={`${starPositions[6].y}%`}
                  x2={`${starPositions[3].x}%`}
                  y2={`${starPositions[3].y}%`}
                  stroke="rgba(180, 180, 180, 0.8)"
                  strokeWidth="0.5"
                />
              </>
            </svg>
          </div>

          {/* Container for stars */}
          <div className="relative w-[800px] h-[400px]">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${starPositions[index].x}%`,
                  top: `${starPositions[index].y}%`,
                }}
              >
                <motion.div
                  className="relative"
                  onHoverStart={() => setHoveredStar(index)}
                  onHoverEnd={() => setHoveredStar(null)}
                >
                  <div className="w-4 h-4 relative">
                    <div className="absolute inset-0 star-shape bg-white animate-pulse-fast">
                      <div className="absolute inset-0 star-shape bg-white animate-gleam" />
                    </div>
                  </div>
                  {hoveredStar === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="transform scale-75">
                        <Card className="w-[600px] border-2 border-dotted border-white rounded-2xl">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={exp.logo || "/placeholder.svg"}
                                  alt={exp.company}
                                  className="w-12 h-12 rounded-xl border border-white  object-cover"
                                />
                                <div className="flex items-baseline gap-2">
                                  <h3 className=" text-m text-neutral-200 font-['Courier_New']">{exp.title}</h3>
                                  <span className="text-neutral-200 text-sm font-['Courier_New']">@</span>
                                  <span className="text-neutral-200 text-sm font-['Courier_New']">{exp.company}</span>
                                </div>
                              </div>
                              <span className="text-neutral-200 font-['Courier_New']">{exp.period}</span>
                            </div>
                            <p className="text-neutral-400 leading-relaxed font-['Courier_New']">{exp.description}</p>
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white font-medium hover:underline mt-4 inline-block font-['Courier_New']"
                            >
                              Learn More →
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

