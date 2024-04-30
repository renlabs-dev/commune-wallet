
export const Wallet = () => {
  return (
    <div className="w-full max-w-screen-md bg-black p-8 flex items-center justify-center border-white border flex-col divide-y divide-gray-400/40">
      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-gray-400/70 text-lg py-2">MAIN NET</p>
        <div className="flex w-full mt-4">
          <div
            className="bg-black p-4 w-full text-center border border-white text-gray-400/70 text-lg">
            <p>
              5FUdy5g4s...u4x8nny6uv3u
            </p>
          </div >
          <button className="px-12 ml-4 border border-white text-gray-400/70 text-lg">
            Copy
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-4 space-x-4 py-4">
        <button className="p-10 w-1/4 border border-white text-pink-500 text-lg">
          Send
        </button>

        <button className="p-10 w-1/4 border border-white text-blue-500 text-lg">
          Receive
        </button>

        <button className="p-10 w-1/4 border border-white text-orange-500 text-lg">
          Stake
        </button>

        <button className="p-10 w-1/4 border border-white text-purple-500 text-lg">
          Unstake
        </button>
      </div>

      <div className="flex flex-col w-full space-y-4 pt-4 text-lg">
        <div className="flex justify-between border border-white w-full p-4 text-gray-400/70">
          <p>
            COMAI
          </p>
          <p>0.00</p>
        </div>

        <div className="flex justify-between border border-white w-full p-4 text-gray-400/70">
          <p>
            STAKED
          </p>
          <p>0.00</p>
        </div>
      </div>
    </div>
  )
}