import { AIChatButton } from "@/components/ai-chat-button";
import AIVoiceButton from "@/components/ai-voice-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-700 font-bold">WS</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">
              Willow Springs
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-gray-700">
            <a href="#" className="hover:text-green-600">
              About
            </a>
            <a href="#" className="hover:text-green-600">
              Services
            </a>
            <a href="#" className="hover:text-green-600">
              Locations
            </a>
            <a href="#" className="hover:text-green-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Sharing special moments
                <span className="text-green-600">
                  {" "}
                  yesterday, today and always
                </span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Discover personalized senior living services designed to enhance
                quality of life with dignity and compassion.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Find a Residence
              </button>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-seniors-bcZNlFB3Zerf1rRepuYacfo5u65u2V.jpg"
                alt="Happy seniors together in a modern living room, smiling and enjoying community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/care-services-DqoiKSwxb6I1TlbzhVlkW5NjkSUAQP.jpg"
                  alt="Compassionate caregiver with seniors, representing personalized care services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Personalized Care
                </h3>
                <p className="text-gray-600">
                  Compassionate support and medical care tailored to your needs
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dining-together-BMjc1R88mgTrexQFQAwGrJSIDNZEsO.jpg"
                  alt="Seniors dining together, enjoying gourmet meals and community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Culinary Excellence
                </h3>
                <p className="text-gray-600">
                  Gourmet dining experiences tailored to dietary preferences
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/outdoor-activities-Mhdxc0R1fidxnh3lZgoJTVM8O0tYch.jpg"
                  alt="Seniors walking together outdoors, enjoying wellness activities in nature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Social Activities
                </h3>
                <p className="text-gray-600">
                  Engaging wellness programs and recreational activities for all
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Find Your Suite
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl">
                Choose from our selection of spacious suites designed for
                comfort and independence. Each residence features modern
                amenities and personalized services tailored to your needs.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Explore Suites
              </button>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suite-interior-LPqohkC3l2tWxDXXV8sixDmc145HYf.jpg"
                alt="Luxurious, modern suite bedroom with panoramic views and contemporary furniture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our communities and schedule a
            tour.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition">
            Schedule a Tour
          </button>
        </div>
      </section>

      {/* Chat Widget */}
      {/* <AIChatButton /> */}
      {/* <ChatWidget /> */}

      <AIVoiceButton />
    </main>
  );
}
