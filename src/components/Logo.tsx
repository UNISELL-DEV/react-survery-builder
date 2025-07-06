export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 18"
      fill="currentColor"
      {...props}
    >
      <text x="0" y="14" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="normal">
        SURVEY DEMO
      </text>
    </svg>
  );
}