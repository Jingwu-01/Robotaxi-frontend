export default function Contact() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">
            Contact Us
          </h1>
      </div>

      <div className="flex flex-col mb-10 bg-gray-800 shadow-sm rounded-xl px-5 py-4">
        <div> 
        <p className="text-lg font-semibold text-gray-100 mb-2">Developers:</p>
        <p className="text-md font-semibold text-gray-100 mb-2">
          Andrew Negrut: agn5@rice.edu
        </p>
        <p className="text-md font-semibold text-gray-100 mb-2">
          Tarushi Mittal: trm4@rice.edu
        </p>
        <p className="text-md font-semibold text-gray-100 mb-2">
          Jingwu Wang: jw133@rice.edu
        </p>
        </div> 

        <div className="mt-5"> 
        <p className="text-lg font-semibold text-gray-100 mb-2">Advisor:</p>
        <p className="text-md font-semibold text-gray-100 mb-2">
          Kaiyu Hang: kaiyu.hang@rice.edu
        </p>
        </div>

      </div>
    </div>
  );
}