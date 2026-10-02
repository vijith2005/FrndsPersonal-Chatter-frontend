import { useRef, useState, useEffect } from 'react';

export default function OtpInput({ length = 6, onComplete, disabled }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const refs = useRef([]);

  useEffect(() => {
    if (!disabled) refs.current[0]?.focus();
  }, [disabled]);

  const handleChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);

    if (val && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    if (next.every((v) => v) && next.join('').length === length) {
      onComplete(next.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    const next = Array(length).fill('');
    pasted.split('').forEach((ch, i) => (next[i] = ch));
    setValues(next);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
    if (pasted.length === length) onComplete(pasted);
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-14 w-12 rounded-2xl border-2 text-center text-xl font-bold shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50"
          style={{
            background: 'var(--input-bg)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
          }}
        />
      ))}
    </div>
  );
}
