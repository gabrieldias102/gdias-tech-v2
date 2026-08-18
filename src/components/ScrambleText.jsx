import { useEffect, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%&*+-/<>{}[]";

function useScrambleWords(words, frameMs, pauseMs) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return undefined;

    const textRef = { current: words[0] };
    let wordIndex = 0;
    let frame = 0;
    let queue = [];
    let tickTimeout;
    let pauseTimeout;

    const buildQueue = (nextWord) => {
      const from = textRef.current;
      const length = Math.max(from.length, nextWord.length);
      const q = [];
      for (let i = 0; i < length; i++) {
        q.push({
          from: from[i] || "",
          to: nextWord[i] || "",
          start: Math.floor(Math.random() * 6),
          end: Math.floor(Math.random() * 8) + 10 + i * 1.5,
        });
      }
      return q;
    };

    const tick = () => {
      let output = "";
      let done = 0;
      for (const item of queue) {
        if (frame >= item.end) {
          done += 1;
          output += item.to;
        } else if (frame >= item.start) {
          output +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else {
          output += item.from;
        }
      }
      textRef.current = output;
      setText(output);

      if (done === queue.length) {
        pauseTimeout = setTimeout(next, pauseMs);
        return;
      }
      frame += 1;
      tickTimeout = setTimeout(tick, frameMs);
    };

    const next = () => {
      wordIndex = (wordIndex + 1) % words.length;
      queue = buildQueue(words[wordIndex]);
      frame = 0;
      tick();
    };

    pauseTimeout = setTimeout(next, pauseMs);

    return () => {
      clearTimeout(tickTimeout);
      clearTimeout(pauseTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

/**
 * Cicla por uma lista de palavras com efeito "scramble" (embaralha
 * caracteres aleatórios e decodifica, da esquerda pra direita, até a
 * palavra certa). Desligado para quem prefere menos animação.
 *
 * Dica: mantenha as palavras com tamanho parecido entre si — cada uma
 * define a largura da linha durante essa fase da animação.
 */
function ScrambleText({
  words,
  className,
  as: Tag = "span",
  frameMs = 35,
  pauseMs = 2400,
}) {
  const text = useScrambleWords(words, frameMs, pauseMs);
  return <Tag className={className}>{text}</Tag>;
}

export default ScrambleText;
