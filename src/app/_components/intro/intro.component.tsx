
export const Intro = () => {
  return (
    <div className="w-full max-w-screen-md divide-y bg-black p-8 flex items-center justify-center border-white border flex-col">

      <h2 className="py-6 text-2xl">Commune Wallet</h2>

      <p className="py-6 text-gray-400/70 text-lg">Enjoy full control over your assets with our non-custodial wallet,
        designed for user <span className="text-green-500">autonomy</span> and <span className="text-green-500">security</span>.
      </p>

      <div className="flex w-full space-x-4 pt-6">
        <button className="border border-white p-4 w-2/4 text-green-500 text-lg">
          I have a Wallet
        </button>
        <button className="border border-white p-4 w-2/4 text-blue-500 text-lg">
          Create Wallet
        </button>
      </div>
    </div>
  )
}