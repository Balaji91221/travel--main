'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin, Calendar, DollarSign, Home, Plane, Bus } from 'lucide-react';

interface Recommendation {
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
  accommodation: {
    type: string;
    price_range: string;
    suggested_options: string[];
  }[];
  travel_logistics: {
    recommended_transport: string;
    travel_duration: string;
    visa_requirements: string;
    local_transportation: string;
  };
  best_time_to_visit: {
    recommended_months: string[];
    weather: string;
    peak_season: string;
    off_peak_season: string;
  };
}

export default function Planning() {
  const [budget, setBudget] = useState<number[]>([50000]);
  const [startingLocation, setStartingLocation] = useState<string>("");
  const [groupSize, setGroupSize] = useState<string>("");
  const [preference, setPreference] = useState<string>("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await fetch("https://ml-9sr3.onrender.com/recommend_travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: `₹${budget[0]}`,
          starting_location: startingLocation,
          group_size: parseInt(groupSize, 10),
          preference_type: preference,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();
      console.log("Raw API response:", data);

      if (typeof data.recommendation !== 'string') {
        throw new Error("Invalid response format");
      }

      // Remove backticks and any JSON formatting
      const cleanedRecommendation = data.recommendation.replace(/```json\n|\n```|```/g, "").trim();
      console.log("Cleaned recommendation:", cleanedRecommendation);

      let parsedRecommendation: Recommendation;
      try {
        parsedRecommendation = JSON.parse(cleanedRecommendation);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error("Failed to parse recommendation data");
      }

      console.log("Parsed recommendation:", parsedRecommendation);

      if (!parsedRecommendation.recommended_destinations) {
        throw new Error("Invalid recommendation format: recommended_destinations not found");
      }

      setRecommendation(parsedRecommendation);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-8">
      
      <div className="container mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Indian Adventure</h1>
          <p className="text-xl text-gray-700">Discover a destination tailored to your preferences and budget</p>
        </section>

        <Card className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-600">Start Planning Your Trip</CardTitle>
            <CardDescription className="text-gray-500">
              Fill in your preferences to get a personalized recommendation
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
                      {["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Chandigarh", "Coimbatore", "Visakhapatnam"].map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
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
                      {["Mountains", "Beaches", "Temples", "Wildlife"].map((pref) => (
                        <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendation...
                  </>
                ) : (
                  "Get Recommendation"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && <div className="text-red-500 text-center mb-8" role="alert">{error}</div>}

        {recommendation && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Recommended Destination</h2>
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-teal-600 text-white">
                <CardTitle className="text-2xl font-bold">{recommendation.recommended_destinations.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">{recommendation.recommended_destinations.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-teal-600 mr-2 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-700">Highlights</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                          {recommendation.recommended_destinations.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 text-teal-600 mr-2 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-700">Estimated Costs</h3>
                        <ul className="text-gray-600">
                          <li>Flights: ₹{recommendation.estimated_costs.flights}</li>
                          <li>Accommodation: ₹{recommendation.estimated_costs.accommodation}</li>
                          <li>Daily Expenses: ₹{recommendation.estimated_costs.daily_expenses}</li>
                          <li className="font-bold">Total: ₹{recommendation.estimated_costs.total_cost}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Home className="w-5 h-5 text-teal-600 mr-2 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-700">Accommodation Options</h3>
                        {recommendation.accommodation.map((acc, accIdx) => (
                          <div key={accIdx} className="mb-2">
                            <h4 className="text-md font-semibold text-teal-600">{acc.type}</h4>
                            <p className="text-gray-600">Price Range: {acc.price_range}</p>
                            <p className="text-gray-600">Options: {acc.suggested_options.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-teal-600 mr-2 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-700">Best Time to Visit</h3>
                        <p className="text-gray-600">
                          {recommendation.best_time_to_visit.recommended_months.join(", ")}
                        </p>
                        <p className="text-gray-600">Weather: {recommendation.best_time_to_visit.weather}</p>
                        <p className="text-gray-600">Peak Season: {recommendation.best_time_to_visit.peak_season}</p>
                        <p className="text-gray-600">Off-Peak Season: {recommendation.best_time_to_visit.off_peak_season}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Travel Logistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Plane className="w-5 h-5 text-teal-600 mr-2" />
                      <p className="text-gray-600">{recommendation.travel_logistics.recommended_transport}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-teal-600 mr-2" />
                      <p className="text-gray-600">{recommendation.travel_logistics.travel_duration}</p>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                      <p className="text-gray-600">{recommendation.travel_logistics.visa_requirements}</p>
                    </div>
                    <div className="flex items-center">
                      <Bus className="w-5 h-5 text-teal-600 mr-2" />
                      <p className="text-gray-600">{recommendation.travel_logistics.local_transportation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}