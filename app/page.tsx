"use client";
import React from 'react'
import Image from 'next/image'
import { Plane, MapPin, Calendar, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Home from './home.jpg'
//import video from './planning/video.mp4'; // Remove this line if not needed.

import Taj from './taj.jpg'
import Kerala from './kerala.jpg'
import Jaipur from './jaipur.jpg'
import Link from 'next/link'


export default function ExploreEaseHome() {


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 ">

       <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={Home}
          alt="Home background"
          className="absolute z-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center text-white p-8 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-lg max-w-3xl mx-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover the Magic of India</h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">Plan your perfect Indian adventure with ExploreEase</p>
          <Link href="/planning">
      <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-semibold">
        Start Planning
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Why Choose ExploreEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Plane, title: "Personalized Itineraries", description: "Tailored travel plans based on your preferences and budget" },
              { icon: MapPin, title: "Discover Hidden Gems", description: "Explore off-the-beaten-path destinations across India" },
              { icon: Calendar, title: "Flexible Planning", description: "Easily adjust your plans as you go, with real-time updates" },
              { icon: Sparkles, title: "AI-Powered Recommendations", description: "Get smart suggestions for attractions, hotels, and restaurants" },
            ].map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <CardTitle className="text-indigo-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-indigo-700">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            { name: "Taj Mahal, Agra", image: Taj },

              { name: "Jaipur, Rajasthan", image: Jaipur },
              { name: "Kerala Backwaters", image: Kerala },
            ].map((destination, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-indigo-900">{destination.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full text-indigo-700 border-indigo-300 hover:bg-indigo-50">Explore</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-800 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-indigo-100">Plan your dream Indian vacation with ExploreEase today!</p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-semibold">
            Begin Your Adventure <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sarah L.", quote: "ExploreEase made planning my trip to India a breeze. The personalized recommendations were spot on!" },
              { name: "Michael T.", quote: "I discovered amazing places I never knew existed. This app is a game-changer for travel in India." },
              { name: "Priya K.", quote: "As an Indian expat, I used ExploreEase to rediscover my home country. It was an incredible experience!" },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-indigo-900">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="italic text-indigo-700">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}