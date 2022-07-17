import './App.css';
import weddingLogo from './assets/weddingLogo.svg';
import HTMLFlipBook from "react-pageflip";

function App() {
  const token = 'asd';
  const invitate = {
    name: 'mock',
    table: 4
  }

  return (
    <div className='w-full h-[98vh] grid justify-items-center content-center'>
      <HTMLFlipBook width={400} height={660}>
        <div className="bg-purple-800">
          <div className='h-full grid justify-items-center content-center'>
            <img className="h-60 w-70 object-cover text-white" src={weddingLogo} alt="Wedding logo" />
          </div>
        </div>
        <div className="py-7 px-4 bg-purple-800">
          {token ? (
          <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <div className="">
              <div className="shrink-0 grid justify-items-center">
                <p className="mt-2 text-medium text-slate-400">Nos casamos!</p>
                <img className="h-60 w-70 object-cover" src={weddingLogo} alt="Wedding logo" />
              </div>
              <div className="p-6">
                <div className="capitalize tracking-wide text-sm text-purple-500 font-semibold">Saludos {invitate.name}</div>
                <p className="block mt-1 text-center text-md leading-tight font-medium text-slate-400 hover:underline">"El amor nunca se da por vencido, jamas pierde la fe, siempre teiene esperanzas y se mantiene firme en toda circunstancia".</p>
                <p className="mt-2 mb-2 text-justify text-slate-600 font-bold">Queremos compartir contigo en nuestro matrimonio por eso te invitamos este 29 de julio no te olvides de venir.</p>
                <div className="grid bg-slate-100 rounded-md text-center grid-cols-3 divide-x">
                  <div className='text-gray-400'>Fecha</div>
                  <div className='text-gray-400'>Hora</div>
                  <div className='text-gray-400'>Lugar</div>
                  <div className='p-2 mt-2 text-gray-400 font-bold'>29/JUL</div>
                  <div className='p-2 mt-2 text-gray-400 font-bold'>2:30pm</div>
                  <div className='p-2'>
                    <button className='rounded-full bg-purple-600 hover:bg-purple-400 p-2 text-slate-200'>Presioname</button>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='mt-2 text-slate-300'>Tu mesa es la #{invitate.table}</p>
                </div>
              </div>
            </div>
          </div>
          ) :
          (<>
            <div className='bg-white grid justify-items-center content-center py-4 h-full w-50'>
              <img className="h-60 w-70 object-cover" src={weddingLogo} alt="Wedding logo" />
            </div>
          </>)}
        </div>
      </HTMLFlipBook>
    </div>
    
  );
}

export default App;
