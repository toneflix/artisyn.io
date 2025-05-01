function BrowseByCategory() {
  return (
    <section className='flex flex-col items-center px-10 py-16 min-h-svh bg-[#F7F8FC]'>
      <div className='text-center max-w-3xl leading-tight'>
        <h1 className='mt-1 text-[#535252] font-medium text-xl'>Browse By category</h1>
        <p className='mt-1 text-[#262626] font-bold text-[56px]'>Let’s Get You Started - What Do You Need</p>
        <p className='mt-6 text-[#5F5E5E] md:max-w-[70%] mx-auto'>
          Select a category to discover top-rated artisans for your next project—fast, easy, and reliable service from trusted hands, no matter the task.
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-3 md:gap-16 max-w-4xl mt-12'>
      </div>
    </section>
  )
}

export default BrowseByCategory