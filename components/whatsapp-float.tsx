"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    const phoneNumber = "1234567890" // Reemplaza con tu número de WhatsApp
    const message = "Hola! Me gustaría obtener más información sobre SMARTCELL ACADEMY."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
