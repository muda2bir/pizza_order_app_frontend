import Navbar from "./Navbar";

type AppLayoutProps = {
  children: React.ReactElement;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}
