
export default function Page({params}: {params: {topic: string}}) {
  return (
    <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <h1 className="text-4xl font-bold">What people think about <span className="underline decoration-orange-300 text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text whitespace-nowrap">{params.topic}</span></h1>
    </div>
  )
}
