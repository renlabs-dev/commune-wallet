export const Wallet = () => {
  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center divide-y divide-gray-400/40 border border-white bg-black bg-opacity-50 p-8">
      <div className="flex w-full flex-col items-center justify-center">
        <p className="py-2 text-lg text-gray-400/70">MAIN NET</p>
        <div className="mt-4 flex w-full">
          <div className="w-full border border-white bg-black p-4 text-center text-lg text-gray-400/70">
            <p>5FUdy5g4s...u4x8nny6uv3u</p>
          </div>
          <button className="ml-4 border border-white px-12 text-lg text-gray-400/70">
            Copy
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-between space-x-4 py-4">
        <button className="w-1/4 border border-white p-10 text-lg text-pink-500">
          Send
        </button>

        <button className="w-1/4 border border-white p-10 text-lg text-blue-500">
          Receive
        </button>

        <button className="w-1/4 border border-white p-10 text-lg text-orange-500">
          Stake
        </button>

        <button className="w-1/4 border border-white p-10 text-lg text-purple-500">
          Unstake
        </button>
      </div>

      <div className="flex w-full flex-col space-y-4 pt-4 text-lg">
        <div className="flex w-full justify-between border border-white p-4 text-gray-400/70">
          <p>COMAI</p>
          <p>0.00</p>
        </div>

        <div className="flex w-full justify-between border border-white p-4 text-gray-400/70">
          <p>STAKED</p>
          <p>0.00</p>
        </div>
      </div>
    </div>
  );
};
