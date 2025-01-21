import React, { useState } from "react";
import { Copy as CopyIcon, Check } from "lucide-react";
import "../styles/Copy.css";
import truncateStr from "../utils/truncateStr";

export function Copy({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={`copy-container ${className}`}>
      <span className="copy-text">{truncateStr(text, 15)}</span>
      <button className="copy-button" onClick={handleCopy} title="Copy to clipboard">
        {copied ? (
          <Check size={16} className="copy-icon success" />
        ) : (
          <CopyIcon size={16} className="copy-icon" />
        )}
      </button>
    </div>
  );
}
