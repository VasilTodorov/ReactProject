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
        SkillSwap is a community-driven platform where users can share their skills and learn from others. Our goal is to connect people who want to teach, practice, and grow together, making learning more accessible and collaborative.
      </p>
      <p className="mb-4 text-gray-300 leading-relaxed">
        Whether you want to offer your expertise in music, programming, design, or languages, or discover new skills from others, SkillSwap provides an easy and secure way to connect, learn, and share knowledge.
      </p>
      <p className="mb-4 text-gray-300 leading-relaxed">
        This application demonstrates modern web technologies including React.js, client-side routing, authentication, and CRUD operations, with a focus on usability and responsive design.
      </p>
      
    </div>
  </div>
</section>
    );
}