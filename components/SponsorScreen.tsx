
import React, { useState } from 'react';

interface SponsorScreenProps {
  onSuccess: (code: string) => void;
}

const SponsorScreen: React.FC<SponsorScreenProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const cleanCode = code.trim().toUpperCase();
    
    if (cleanCode === 'SARUR' || cleanCode === 'ADMIN') {
      // Valid Code Logic
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess(cleanCode);
      }, 1500); // 1.5s delay to show success message
    } else {
      // Invalid Code Logic
      setError(true);
      setSuccess(false);
      // If wrong, show error briefly then proceed to login screen without bonus
      setTimeout(() => {
        setError(false);
        onSuccess(''); 
      }, 1000);
    }
  };

  const handleSkip = () => {
      onSuccess('');
  };

  return (
    <div className={`backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-center animate-fade-in max-w-lg mx-auto border-4 transition-colors duration-500
        ${success ? 'bg-green-100/90 border-green-500' : 'bg-white/90 border-yellow-400'}
    `}>
      <div className="mb-6">
        <span className="text-6xl">{success ? '✅' : '🤝'}</span>
      </div>
      
      <h1 className={`text-3xl font-black mb-2 uppercase tracking-wide transition-colors ${success ? 'text-green-700' : 'text-gray-800'}`}>
        {success ? 'ACCESS GRANTED' : 'Official Sponsor'}
      </h1>
      
      {!success && (
        <p className="text-gray-600 mb-8">
            Do you have a supporter? Enter the code below.<br/>
            <span className="text-sm text-gray-500">(Try: SARUR)</span>
        </p>
      )}

      {success && (
        <p className="text-green-700 font-bold text-lg mb-8 animate-pulse">
            Supporter confirmed! Loading...
        </p>
      )}

      {!success && (
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Sponsor Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full p-4 text-2xl font-mono font-bold text-center border-4 rounded-xl outline-none transition-all uppercase placeholder-gray-300
                ${error 
                  ? 'border-red-500 text-red-500 bg-red-50 animate-shake' 
                  : 'border-gray-300 focus:border-yellow-400 text-gray-800'
                }`}
            />
            {error && (
              <p className="text-red-500 font-bold mt-2 animate-fade-in">
                🚫 CÓDIGO INVÁLIDO
              </p>
            )}
          </div>
      )}

      {!success && (
          <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit}
                className="w-full bg-yellow-500 text-yellow-900 font-black py-4 rounded-xl text-xl hover:bg-yellow-400 transition-transform transform active:scale-95 shadow-lg border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1"
              >
                ACCESS GAME
              </button>

              <button 
                onClick={handleSkip}
                className="w-full bg-transparent text-gray-500 font-bold py-2 rounded-xl text-sm hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                I don't have a code
              </button>
          </div>
      )}
      
      <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest">
        Powered by Champion's Games
      </p>
    </div>
  );
};

export default SponsorScreen;
