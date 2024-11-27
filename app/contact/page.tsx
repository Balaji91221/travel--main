import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4 py-8">
        {/* Contact Us Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            We’d Love to Hear From You
          </h1>
          <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
            Whether you have a question, feedback, or just want to say hello, feel free to reach out. We’re here to assist you and ensure you have an unforgettable experience with OurTravelSite.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <Card>
            <CardContent>
              <form>
                {/* Name Field */}
                <div className="mb-6">
                  <Label htmlFor="name" className="block text-lg font-medium text-gray-800">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <Label htmlFor="email" className="block text-lg font-medium text-gray-800">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Phone Field */}
                <div className="mb-6">
                  <Label htmlFor="phone" className="block text-lg font-medium text-gray-800">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-lg font-medium text-gray-800">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here"
                    required
                    rows={6}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button className="bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 transition-all duration-300">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Additional Info Section */}
        <section className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <Card>
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Contact Details</h2>
              <p className="text-lg text-gray-700 mb-4">
                You can also reach us via these contact methods:
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 w-1/3">Name:</span>
                  <span className="text-gray-700">John Doe</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 w-1/3">Email:</span>
                  <span className="text-gray-700">contact@ourtravelsite.com</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 w-1/3">Phone:</span>
                  <span className="text-gray-700">(123) 456-7890</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Contact;
