import Link from "next/link";

const links = [
  { href: "/privacy-and-terms", text: "Privacy" },
  { href: "/privacy-and-terms", text: "Terms" },
  {
    href: "https://github.com/therockstorm/startup-intel",
    text: "GitHub",
  },
  {
    href: "https://twitter.com/startupinteldev",
    text: "Twitter",
  },
];

export function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer>
      <div className="mx-auto max-w-7xl pt-10 pb-8 text-sm md:flex md:items-center md:justify-between">
        <ul className="flex justify-center space-x-4 md:order-2">
          {links.map((link) => (
            <li key={link.text}>
              <Link
                className="text-gray-500 hover:text-gray-600"
                href={link.href}
                rel="noreferrer"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-gray-500">
            &copy; {date} startupintel.dev
          </p>
        </div>
      </div>
    </footer>
  );
}
