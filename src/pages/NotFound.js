import weddingLogoW from '../assets/weddingLogoW.svg';

function NotFound() {
  return (
    <main className='h-[100vh] grid grid-rows-2 items-center justify-items-center text-white bg-purple-500' style={{ padding: "1rem" }}>
      <img className="h-60 w-70 object-cover text-white" src={weddingLogoW} alt="Wedding logo" />
      <p className="self-start">There's nothing here!</p>
    </main>
  )
}

export default NotFound;