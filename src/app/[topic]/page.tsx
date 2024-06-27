export default function Page({params}: {params: {topic: string}}) {
  return (
    <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
      <h1 className="text-4xl font-bold">
        What people think about{" "}
        <span className="whitespace-nowrap bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text text-transparent underline decoration-orange-300">
          {params.topic}
        </span>
      </h1>
    </div>
  );
}
