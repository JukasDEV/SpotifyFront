import { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export default function Loading() {
    // Lista de frases para mostrar abaixo do loading
    const phrases = [
        'Analisando Entrevista',
        'Por favor, aguarde um momento',
        'Evite recarregar a página',
        'Quase lá',
    ];

    // Estado para controlar a frase atual e a opacidade para animação
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        let currentPhraseIndex = 0;

        const intervalId = setInterval(() => {
            // Animação de fade out
            setOpacity(0);

            setTimeout(() => {
                // Muda para a próxima frase
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setCurrentPhrase(phrases[currentPhraseIndex]);

                // Animação de fade in
                setOpacity(1);
            }, 500); // Temporizador para o fade out antes de mudar a frase
        }, 3000); // Muda a frase a cada 3 segundos

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <Player
                autoplay
                loop
                src="https://assets5.lottiefiles.com/temp/lf20_LJK4oD.json"
                style={{ height: '300px', width: '300px' }}
            >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <h2 className='font-bold text-[28px]' style={{ opacity, transition: 'opacity 0.5s ease-in-out' }}>
                {currentPhrase}
            </h2>
        </div>
    );
}
