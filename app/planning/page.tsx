'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import Video from './main.mp4';

export default function Planning() {
  const [budget, setBudget] = useState([50000]);
  const [startingLocation, setStartingLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [preference, setPreference] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  interface Recommendation {
    destinations: Destination[];
  }

  interface Destination {
    recommended_destinations: {
      name: string;
      description: string;
      highlights: string[];
    };
    estimated_costs: {
      flights: number;
      accommodation: number;
      daily_expenses: number;
      total_cost: number;
      currency: string;
    };
    accommodation: Accommodation[];
  }

  interface Accommodation {
    type: string;
    price_range: string;
    suggested_options: string[];
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://d5fb-34-133-131-54.ngrok-free.app/recommend_travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: `₹${budget}`,
          starting_location: startingLocation,
          group_size: parseInt(groupSize, 10),
          preference_type: preference,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();
      console.log(data);
      // Clean up the `recommendation` string
      const cleanedRecommendation = data.recommendation
        .replace(/```/g, "") // Remove backticks
        .trim(); // Trim any extra whitespace

      // Parse the cleaned string as JSON
      const parsedRecommendation: Recommendation = JSON.parse(cleanedRecommendation);

      // Set the cleaned recommendation
      setRecommendation(parsedRecommendation);
      console.log("Parsed Recommendation:", parsedRecommendation);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 relative">
      {/* Background video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Indian Adventure</h1>
          <p className="text-xl text-gray-700">Discover destinations tailored to your preferences and budget</p>
        </section>

        <Card className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-teal-600">Start Planning Your Trip</CardTitle>
            <CardDescription className="text-gray-500">
              Fill in your preferences to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="starting-location">Starting Location</Label>
                  <Select onValueChange={setStartingLocation}>
                    <SelectTrigger id="starting-location">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="Surat">Surat</SelectItem>
                      <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                      <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                      <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-size">Group Size</Label>
                  <Input
                    id="group-size"
                    type="number"
                    min="1"
                    placeholder="Number of travelers"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Slider
                    id="budget"
                    min={10000}
                    max={500000}
                    step={10000}
                    value={budget}
                    onValueChange={setBudget}
                  />
                  <div className="text-right text-sm text-gray-500">₹{budget}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferences">Travel Preferences</Label>
                  <Select onValueChange={setPreference}>
                    <SelectTrigger id="preferences">
                      <SelectValue placeholder="Select preferences" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mountains">Mountains</SelectItem>
                      <SelectItem value="Beaches">Beaches</SelectItem>
                      <SelectItem value="Temples">Temples</SelectItem>
                      <SelectItem value="Wildlife">Wildlife</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  {loading ? "Loading..." : "Get Recommendations"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && <div className="text-red-500 mt-4">{error}</div>}
        {recommendation && recommendation.destinations && (
  <div className="mt-12 space-y-12">
    <section>
      <h2 className="text-3xl font-bold text-white mb-6">Recommended Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendation.destinations.map((dest, index) => (
          <Card key={index} className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-teal-600">
                {dest.recommended_destinations.name}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {dest.recommended_destinations.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Highlights */}
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Highlights</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {dest.recommended_destinations.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              {/* Estimated Costs */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6">Estimated Costs</h3>
              <p className="text-gray-600 mt-2">
                <strong>Flights:</strong> ₹{dest.estimated_costs.flights}<br />
                <strong>Accommodation:</strong> ₹{dest.estimated_costs.accommodation}<br />
                <strong>Daily Expenses:</strong> ₹{dest.estimated_costs.daily_expenses}<br />
                <strong>Total:</strong> ₹{dest.estimated_costs.total_cost} {dest.estimated_costs.currency}
              </p>

              {/* Accommodation Options */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6">Accommodation Options</h3>
              {dest.accommodation.map((acc, accIdx) => (
                <div key={accIdx} className="mt-4">
                  <h4 className="text-md font-semibold text-teal-600">{acc.type}</h4>
                  <p className="text-gray-600 mt-2">Price Range: {acc.price_range}</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    {acc.suggested_options.map((option, optIdx) => (
                      <li key={optIdx}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </div>
)}
      </div>
    </main>
  );
}
