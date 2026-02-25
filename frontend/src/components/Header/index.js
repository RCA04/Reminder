import React from 'react';


function Header({user}) {  
  
  return (
    <>
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">
          Seu lembrete de vocabulário
        </h1>
        <p className="text-sm md:text-base text-zinc-400 mt-2">
          Acompanhe as palavras que você está aprendendo.
        </p>
      </div>
      <div className="flex items-center gap-4 md:gap-6 md:ml-auto shrink-0">
        <div className="flex flex-col items-end">
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-zinc-500">Logado como</span>
            <span className="text-sm font-medium text-zinc-100">{user}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
