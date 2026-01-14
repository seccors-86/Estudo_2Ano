
import React from 'react';

interface ExitModalProps {
  onSaveAndExit: () => void;
  onExitWithoutSaving: () => void;
  onCancel: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ onSaveAndExit, onExitWithoutSaving, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md m-4 animate-zoom-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Deseja sair do jogo?</h2>
        <p className="text-gray-600 mb-8">Seu progresso é salvo automaticamente, mas você pode forçar o salvamento agora.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onSaveAndExit}
            className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
          >
            Salvar e Sair
          </button>
          <button
            onClick={onExitWithoutSaving}
            className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
          >
            Sair Sem Salvar
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-transform transform hover:scale-105"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
