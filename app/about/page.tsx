import React from 'react';

const About = () => {
  return (
    <main className="bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 min-h-screen">
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to OurTravelSite</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Traveling is about creating memories, meeting new people, and immersing yourself in diverse cultures. 
          At <span className="font-semibold text-teal-600">OurTravelSite</span>, we are here to help you explore the world in the most seamless way possible.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Your Perfect Journey, Tailored to You</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Whether you’re a solo adventurer or a group of friends, we offer curated options that suit every type of traveler. 
          Our platform makes it easy for you to enjoy every step of your journey.
        </p>

        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Explore the World, Your Way</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          What sets us apart is our personalized approach to travel planning. We offer recommendations based on your unique interests, 
          from breathtaking destinations to hidden gems, ensuring your journey is unforgettable.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">Why Choose Us?</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-teal-600">✔️</span>
            <span className="ml-4 text-lg text-gray-700">Personalized Travel Plans tailored to your preferences.</span>
          </li>
          <li className="flex items-center">
            <span className="text-teal-600">✔️</span>
            <span className="ml-4 text-lg text-gray-700">A wide range of destinations from iconic landmarks to hidden gems.</span>
          </li>
          <li className="flex items-center">
            <span className="text-teal-600">✔️</span>
            <span className="ml-4 text-lg text-gray-700">Seamless travel experience from booking to itinerary planning.</span>
          </li>
          <li className="flex items-center">
            <span className="text-teal-600">✔️</span>
            <span className="ml-4 text-lg text-gray-700">Trusted recommendations ensuring a smooth and enriching journey.</span>
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to Start Your Next Adventure?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Let <span className="font-semibold text-teal-600">OurTravelSite</span> guide you in discovering the world in a way that reflects your adventurous spirit.
        </p>
        <button className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300">
          Start Exploring
        </button>
      </section>
    </div>
  </main>
  );
};

export default About;
