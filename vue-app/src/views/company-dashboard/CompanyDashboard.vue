<template>
  <div>
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-2/6 mb-4">
        <p className="text-2xl font-bold">Company Dashboard</p>
        <p className="mb-4 text-xs">Event Organizer</p>
        <div className="bg-blue-900 p-8 rounded-lg border-2 ">
          <h1 className="font-bold text-4xl text-white mb-4">Sign In</h1>
          <div className="mb-4">
            <div className="mb-4">
              <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                <input
                  type="text"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Username"
                />
              </div>
            </div>
            <div>
              <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                <input
                  type="password"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div
            className="flex items-center w-full justify-center"
          >
            <div className="bg-white hover:bg-blue-400 hover:text-white border-2 border-neutral-600 rounded-lg py-4 px-12 cursor-pointer w-fit">
              <p className="font-bold">Sign In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>