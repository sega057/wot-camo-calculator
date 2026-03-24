interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <span className="mt-help">
      ?<span className="tip">{text}</span>
    </span>
  );
}
