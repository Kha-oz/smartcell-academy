"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Courses from "@/components/courses"
import Repairs from "@/components/repairs"
import Store from "@/components/store"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

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
