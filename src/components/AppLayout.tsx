import Navbar from "./Navbar";

type AppLayoutProps = {
  children: React.ReactElement;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container mx-auto md:px-6 lg:px-16">
      <Navbar />
      {children}
    </div>
  );
}
