'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CopyEmailButtonProps = { email: string };

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [feedback, setFeedback] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(email);
      setFeedback('> email copiado_');
    } catch {
      const selection = window.getSelection();
      const emailNode = document.getElementById('contact-email');
      const range = document.createRange();
      if (emailNode && selection) {
        range.selectNodeContents(emailNode);
        selection.removeAllRanges();
        selection.addRange(range);
        setFeedback('> endereço selecionado; copie manualmente_');
      } else {
        setFeedback('> cópia indisponível_');
      }
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setFeedback(''), 2500);
  }

  return (
    <div className="copy-email-wrap">
      <button
        type="button"
        className="copy-email-button"
        onClick={handleCopy}
        aria-label={`Copiar o e-mail ${email} para a área de transferência`}
      >
        <span id="contact-email">{email}</span>
        {feedback.startsWith('> email') ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
      <output className="copy-email-feedback" aria-live="polite">
        {feedback}
      </output>
    </div>
  );
}
