// Description: Documentation page of the help section.

export default function Documentation() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-100 font-bold">Documentation</h1>
      </div>
      
      <div className="flex flex-col mb-10 bg-gray-800 shadow-sm rounded-xl px-5 py-4">
        <p className="text-md text-gray-100">
          <a 
            href="/doc/final-report.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline"
          >
            Click here to view the final IEEE report. 
          </a>
        </p>
      </div>  
    </div>
  )
}
