'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CopyEmailButtonProps = { email: string };
type CopyStatus = 'idle' | 'copied' | 'selected' | 'failed';

const messages: Record<CopyStatus, string> = {
  idle: '',
  copied: '> e-mail copiado!',
  selected: '> endereço selecionado. Copie manualmente.',
  failed: '> cópia indisponível.',
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');
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
      setStatus('copied');
    } catch {
      const selection = window.getSelection();
      const emailNode = document.getElementById('contact-email');
      const range = document.createRange();
      if (emailNode && selection) {
        range.selectNodeContents(emailNode);
        selection.removeAllRanges();
        selection.addRange(range);
        setStatus('selected');
      } else {
        setStatus('failed');
      }
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus('idle'), 2500);
  }

  return (
    <div className="copy-email">
      <button
        type="button"
        className="pixel-btn rpg-cursor copy-email-btn"
        data-variant="ghost"
        onClick={handleCopy}
        aria-label={`Copiar o e-mail ${email} para a área de transferência`}
      >
        {status === 'copied' ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        <span id="contact-email" className="copy-email-address">
          {email}
        </span>
      </button>
      <output
        className="copy-email-log"
        aria-live="polite"
        data-status={status}
      >
        {messages[status]}
      </output>
    </div>
  );
}
