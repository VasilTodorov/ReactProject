export default function About() {
    return (
        
<section className="relative bg-gray-900 text-white py-16 px-8 overflow-hidden">
  {/* <!-- SVG Pattern Background --> */}
  <div className="absolute inset-0 -z-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320">
      <defs>
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" className="text-gray-700" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.2"/>
    </svg>
  </div>

  {/* Container Content */}
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center md:space-x-12">
    {/* Image */}
    <div className="w-full md:w-1/2 mb-8 md:mb-0">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80" alt="Our Team" className="rounded-lg shadow-lg object-cover w-full h-full" />
    </div>

    {/* Text Content */}
    <div className="w-full md:w-1/2">
      <h2 className="text-4xl font-bold mb-4 border-b-4 border-blue-500 inline-block">About Us</h2>
      <p className="mb-4 text-gray-300 leading-relaxed">
        We are committed to delivering innovative solutions with a focus on quality and customer satisfaction. Our team of experts works tirelessly to bring your ideas to life and help your business grow.
      </p>
      <p className="mb-4 text-gray-300 leading-relaxed">
        Join us on our journey to make a difference in the industry through creativity, dedication, and excellence.
      </p>
      <a href="#contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
        Contact Us
      </a>
    </div>
  </div>
</section>
    );
}