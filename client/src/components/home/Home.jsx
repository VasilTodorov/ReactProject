
import { Link } from "react-router";
export default function Home() {
    return (
        <>                    

<div className="relative bg-gray-900">
  <div className="absolute inset-x-0 bottom-0">
    <svg viewBox="0 0 224 12" fill="currentColor" className="-mb-1 w-full text-white" preserveAspectRatio="none">
      <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
    </svg>
  </div>
  <div className="mx-auto px-4 py-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-8">
    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl sm:text-center md:max-w-2xl">
      <h2 className="mb-6 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">Skills Shared. Knowledge Gained.</h2>
      <p className="mb-8 text-center text-base text-indigo-200 md:text-lg">Turn your knowledge into opportunity.Learn new skills from others.Learn new skills from others.Teach what you love and grow together.</p>
      <Link 
        to="/blog"
        className="mx-auto rounded-lg border-2 border-white px-4 py-2 text-sm leading-[24px] font-medium text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-800 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5" href="/add"
        >Access Skills<svg className="ml-2 inline h-6 w-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"></path></svg
      ></Link>
      <p className="mb-10 max-w-md text-xs tracking-wide text-indigo-100 sm:mx-auto sm:text-sm md:mb-8"></p>
    </div>
  </div>
</div>
        </>
    );
}