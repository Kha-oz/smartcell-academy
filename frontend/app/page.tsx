"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Courses from "@/components/sections/courses"
import Repairs from "@/components/sections/repairs"
import Store from "@/components/sections/store"
import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"
import WhatsAppFloat from "@/components/common/whatsapp-float"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")

  const renderSection = () => {
    switch (activeSection) {
      case "inicio":
        return <Hero setActiveSection={setActiveSection} />
      case "nosotros":
        return <About />
      case "cursos":
        return <Courses />
      case "reparaciones":
        return <Repairs />
      case "tienda":
        return <Store />
      case "testimonios":
        return <Testimonials />
      case "contacto":
        return <Contact />
      default:
        return <Hero setActiveSection={setActiveSection} />
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="pt-16">{renderSection()}</div>
      <Footer setActiveSection={setActiveSection} />
      <WhatsAppFloat />
    </main>
  )
}
