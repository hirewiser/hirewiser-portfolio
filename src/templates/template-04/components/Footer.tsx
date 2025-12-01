const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Design & Developed by{" "}
          <a
            href="https://www.hirewiser.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.hirewiser.in
          </a>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
