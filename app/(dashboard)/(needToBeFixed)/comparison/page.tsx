import BaselineComparison from './baseline-comparison'

export default function Comparison() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">Analytics</h1>
      </div>
      <BaselineComparison />
    </div>
  )
}